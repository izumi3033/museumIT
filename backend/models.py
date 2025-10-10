# backend/models.py
from typing import Optional, Dict
from pydantic import BaseModel, Field, RootModel

class ConfirmBody(BaseModel):
    button: Optional[int] = Field(default=None, ge=1, le=15)

# 使うなら：/stats の返却を型で表したい場合に便利
class StatsResponse(RootModel[Dict[str, int]]):
    pass
