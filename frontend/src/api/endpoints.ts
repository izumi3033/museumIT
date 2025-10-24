import { apiGet, apiPost } from "./client";

export const health = () => apiGet<{ok:boolean;online:boolean;time:string}>("/health");
export const resetLatest = () => apiPost<{status:string}>("/reset_latest");
export const getEvents = () => apiGet<any>("/events");
export const postConfirm = (body: any) => apiPost<any>("/confirm", body);
export const getStats = () => apiGet<any>("/stats");
