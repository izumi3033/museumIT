import { apiGet, apiPost } from "./client";
import type { EventsRes, ConfirmReq, ConfirmRes, Stats } from "../types";

export const health = () => apiGet<{ok:boolean;online:boolean;time:string}>("/health");
export const resetLatest = () => apiPost<{status:string}>("/reset_latest");
export const getEvents = () => apiGet<EventsRes>("/events");
export const postConfirm = (body: ConfirmReq) => apiPost<ConfirmRes>("/confirm", body);
export const getStats = () => apiGet<Stats>("/stats");
