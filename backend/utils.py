from typing import Dict, List
from time import time
from gs_client import repo
from settings import settings

class StatsCache:
    def __init__(self, ttl: int):
        self.ttl = ttl
        self._cache = None
        self._ts = 0.0

    def get(self) -> Dict[str,int]:
        now = time()
        if self._cache is not None and now - self._ts <= self.ttl:
            return self._cache
        data = self._compute()
        self._cache = data
        self._ts = now
        return data

    def invalidate(self):
        self._cache = None
        self._ts = 0.0

    def _compute(self) -> Dict[str,int]:
        counts = {str(i): 0 for i in range(1, 16)}
        try:
            rows = repo.get_all_records()
            for row in rows:
                text = (row.get("event") or row.get("Event") or "").strip()
                head = (text.split(" ")[0]).strip()
                if head.isdigit():
                    n = int(head)
                    if 1 <= n <= 15:
                        counts[str(n)] += 1
            return counts
        except Exception:
            values: List[List[str]] = repo.get_all_values()
            start_idx = 1 if values and values[0] and any("event" in c.lower() for c in values[0]) else 0
            for r in values[start_idx:]:
                if not r: continue
                event_text = r[1] if len(r) > 1 else ""
                head = (event_text.split(" ")[0]).strip()
                if head.isdigit() and 1 <= int(head) <= 15:
                    counts[head] += 1
            return counts

stats_cache = StatsCache(ttl=settings.stats_ttl)
