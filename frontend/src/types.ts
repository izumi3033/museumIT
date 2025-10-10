export type Stats = Record<string, number>; // "1".."15" -> count
export interface EventsRes { button: number | null }
export interface ConfirmReq { button?: number | null }
export interface ConfirmRes { status: string; button: number; time: string }
