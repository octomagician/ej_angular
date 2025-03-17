import { BaseItem } from "./base-item";

export interface Cama extends BaseItem {
  numero_cama: number;
  area_id: number;
  deleted_at?: string;
}