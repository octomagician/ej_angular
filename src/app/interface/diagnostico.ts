import { BaseItem } from "./base-item";

export interface Diagnostico extends BaseItem {
    dx: string;
    estatus: string;
}