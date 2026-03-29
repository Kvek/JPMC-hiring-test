import clsx from "clsx";
import type { Assets } from "./types";

const BADGE_CLASS: Record<Assets, string> = {
  Macro: "bg-neutral-800 text-neutral-300",
  Equities: "bg-blue-900 text-blue-200",
  Credit: "bg-green-900 text-green-200",
};

export const PriceCell = ({ price }: { price: number }) => {
  const isPositive = price >= 0;
  const formattedStr =
    (isPositive ? "+" : "") +
    price.toLocaleString("en-GB", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <td
      className={clsx(
        "p-3 text-right text-sm font-bold",
        isPositive ? "text-blue-400" : "text-red-400",
      )}>
      {formattedStr}
    </td>
  );
};

export const AssetCell = ({ assetClass }: { assetClass: Assets }) => (
  <td className="px-3">
    <span
      className={clsx(
        "rounded-full px-2.5 py-1 text-xs",
        BADGE_CLASS[assetClass],
      )}>
      {assetClass}
    </span>
  </td>
);

export const TickerCell = ({
  ticker,
  assetClass,
}: {
  ticker: string;
  assetClass: Assets;
}) => (
  <td
    className={clsx(
      "px-3 text-sm font-bold",
      assetClass === "Macro" && "text-black",
    )}>
    {ticker}
  </td>
);
