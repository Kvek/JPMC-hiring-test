import { ASC, DESC } from "./utils";

export type Assets = "Equities" | "Macro" | "Credit";

export interface Instrument {
  ticker: string;
  price: number;
  assetClass: Assets;
}

export type SortKey = "assetClass" | "price" | "ticker";
export type Direction = typeof ASC | typeof DESC;

export interface SortState {
  key: SortKey;
  direction: Direction;
}
