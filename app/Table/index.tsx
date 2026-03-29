"use client";

import clsx from "clsx";
import { Activity, useMemo, useState } from "react";
import { AssetCell, PriceCell, TickerCell } from "./Cells";
import { SortButton } from "./SortButton";
import type {
  Assets,
  Direction,
  Instrument,
  SortKey,
  SortState,
} from "./types";
import { ASC, DESC, sortData } from "./utils";

type RowProps = {
  instrument: Instrument;
};

const Row = ({ instrument: { ticker, price, assetClass } }: RowProps) => {
  const ROW_CLASS = {
    Macro: "bg-white border-b-neutral-400",
    Equities: "bg-blue-950 border-b-blue-900",
    Credit: "bg-green-950 border-b-green-900",
  };

  return (
    <tr
      className={clsx(
        ROW_CLASS[assetClass],
        "border-b opacity-90 hover:opacity-100",
      )}>
      <TickerCell ticker={ticker} assetClass={assetClass} />
      <AssetCell assetClass={assetClass} />
      <PriceCell price={price} />
    </tr>
  );
};

type SortingHeaderProps = {
  sortState: SortState;
  onSort: (currentKey: SortKey) => void;
  disabled: boolean;
};

const sortKeyObj: Record<SortKey, string> = {
  ticker: "Ticker",
  assetClass: "Asset Class",
  price: "Price",
};

const SortingHeader = ({ sortState, onSort, disabled }: SortingHeaderProps) => {
  return Object.entries(sortKeyObj).map(([k, label]) => (
    <SortButton
      key={k}
      sortKey={k as SortKey}
      label={label}
      sortState={sortState}
      onSort={onSort}
      disabled={disabled}
    />
  ));
};

type TableProps = {
  data: Instrument[];
};

export const Table = ({ data = [] }: TableProps) => {
  const DEFAULT_SORT_ORDER: Record<SortKey, Direction> = {
    assetClass: ASC,
    price: DESC,
    ticker: ASC,
  };

  const TABLE_HEADER_STYLES =
    "px-4 py-2.5 text-left text-[11px] font-medium tracking-widest text-neutral-400 uppercase";

  const [sortState, setSortState] = useState<SortState>({
    key: "ticker",
    direction: DEFAULT_SORT_ORDER["ticker"],
  });

  const handleSort = (currentKey: SortKey) => {
    setSortState((prev) => {
      const direction =
        prev.key === currentKey
          ? prev.direction === ASC
            ? DESC
            : ASC
          : DEFAULT_SORT_ORDER[currentKey];

      return { key: currentKey, direction };
    });
  };

  const sortedData = useMemo(
    () => sortData(data, sortState),
    [data, sortState],
  );

  return (
    <div className="flex h-full flex-col">
      <div className="mb-3 flex justify-end gap-4">
        <SortingHeader
          sortState={sortState}
          onSort={handleSort}
          disabled={!sortedData.length}
        />
      </div>

      <div className="flex-1 overflow-auto rounded-lg border border-neutral-700">
        <table className="w-full table-fixed text-sm">
          <thead className="sticky top-0 z-10">
            <tr className="border-b border-neutral-700 bg-neutral-800">
              {Object.values(sortKeyObj).map((header) => {
                return (
                  <th
                    className={clsx(
                      TABLE_HEADER_STYLES,
                      header == "Price" && "text-right",
                    )}
                    key={header}>
                    {header}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            <Activity mode={sortedData.length === 0 ? "visible" : "hidden"}>
              <tr>
                <td
                  colSpan={3}
                  className="px-4 py-8 text-center text-base text-neutral-400">
                  No instruments to display.
                </td>
              </tr>
            </Activity>

            {sortedData.map((instrument) => (
              <Row key={instrument.ticker} instrument={instrument} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
