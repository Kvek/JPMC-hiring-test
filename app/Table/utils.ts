import type { Instrument, SortKey, SortState } from "./types";

const ASSET_ORDER = {
  Equities: 0,
  Macro: 1,
  Credit: 2,
};

export const ASC = "asc";
export const DESC = "desc";

const instrumentSortOreder = (): Record<
  SortKey,
  (a: Instrument, b: Instrument) => number
> => ({
  assetClass: (a, b) => ASSET_ORDER[a.assetClass] - ASSET_ORDER[b.assetClass],
  price: (a, b) => a.price - b.price,
  ticker: (a, b) => a.ticker.localeCompare(b.ticker),
});

export const sortData = (
  data: Instrument[],
  { key, direction }: SortState,
): Instrument[] => {
  // we dont want to mutate the data, so use toSorted instead of sort
  return data.toSorted((a, b) => {
    const result = instrumentSortOreder()[key](a, b);
    return direction === ASC ? result : -result;
  });
};
