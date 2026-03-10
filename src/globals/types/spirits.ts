import {Cities, Danger} from "./enums"

export type status = "active" | "captured";
export type dangerLevel = "none" | "low" | "medium" | "high" | "critical";

export interface mapData {
  location: typeof Cities[keyof typeof Cities],
  danger: keyof typeof Danger
}

export interface spirit extends mapData {
  id: number,
  name: string,
  status: status
}

