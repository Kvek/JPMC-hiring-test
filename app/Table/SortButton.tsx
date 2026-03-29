import clsx from "clsx";
import type { Direction, SortKey, SortState } from "./types";
import { ASC, DESC } from "./utils";

const SORT_ARROW = {
  asc: "↑",
  desc: "↓",
};

const DEFAULT_SORT_ORDER: Record<SortKey, Direction> = {
  assetClass: ASC,
  price: DESC,
  ticker: ASC,
};

type SortButtonProps = {
  label: string;
  sortKey: SortKey;
  sortState: SortState;
  onSort: (key: SortKey) => void;
  disabled?: boolean;
};

export const SortButton = ({
  label,
  sortKey,
  sortState,
  onSort,
  disabled,
}: SortButtonProps) => {
  const isActive = sortState.key === sortKey;

  return (
    <button
      disabled={disabled}
      onClick={() => onSort(sortKey)}
      className={clsx(
        "flex cursor-pointer items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs hover:bg-neutral-800 disabled:cursor-auto disabled:hover:bg-neutral-900",
        isActive && !disabled
          ? "border-neutral-500 bg-neutral-800 text-neutral-100"
          : "border-neutral-700 bg-neutral-900 text-neutral-400",
      )}>
      {label}
      <span className="text-[11px] opacity-60">
        {
          SORT_ARROW[
            isActive ? sortState.direction : DEFAULT_SORT_ORDER[sortKey]
          ]
        }
      </span>
    </button>
  );
};
