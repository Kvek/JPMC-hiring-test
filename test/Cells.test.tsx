import { AssetCell, PriceCell, TickerCell } from "@/Table/Cells";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import sampleData from "@/sampleData.json";
import type { Instrument } from "@/Table/types";

const instruments = sampleData as Instrument[];

const getInstrument = (key: string) =>
  instruments.find((i) => i.ticker === key)!; //Sice we know the values exist we use the "!" op.

const alpha = getInstrument("ALPHA")!;
const gamma = getInstrument("GAMMA")!;
const eta = getInstrument("ETA")!;

const Component = ({ children }: { children: React.ReactNode }) => (
  <table>
    <tbody>
      <tr>{children}</tr>
    </tbody>
  </table>
);

describe("PriceCell", () => {
  it("renders  positive price with a + prefix", () => {
    render(
      <Component>
        <PriceCell price={alpha.price} />
      </Component>,
    );
    const price = screen.getByText("+3,150.67");
    expect(price).toBeInTheDocument();
  });

  it("render negative price with a - prefix", () => {
    render(
      <Component>
        <PriceCell price={gamma.price} />
      </Component>,
    );
    const price = screen.getByText("-2,299.10");
    expect(price).toBeInTheDocument();
  });

  it("applies blue colour for positive price", () => {
    const { container } = render(
      <Component>
        <PriceCell price={alpha.price} />
      </Component>,
    );
    expect(container.querySelector("td")?.className).toContain("text-blue-400");
  });

  it("applies red colour class for negative price", () => {
    const { container } = render(
      <Component>
        <PriceCell price={gamma.price} />
      </Component>,
    );
    expect(container.querySelector("td")?.className).toContain("text-red-400");
  });
});

describe("AssetCell", () => {
  it.each(["Equities", "Macro", "Credit"] as const)(
    "renders the correct badge for each instrument - %s",
    (assetClass) => {
      render(
        <Component>
          <AssetCell assetClass={assetClass} />
        </Component>,
      );

      const badge = screen.getByText(assetClass);
      expect(badge).toBeInTheDocument();
    },
  );
});

describe("TickerCell", () => {
  it("renders the ETA ticker (Macro)", () => {
    render(
      <Component>
        <TickerCell ticker={eta.ticker} assetClass={eta.assetClass} />
      </Component>,
    );
    const etaTicker = screen.getByText("ETA");
    expect(etaTicker).toBeInTheDocument();
  });

  it("applies black text class for Macro row", () => {
    const { container } = render(
      <Component>
        <TickerCell ticker={eta.ticker} assetClass={eta.assetClass} />
      </Component>,
    );
    expect(container.querySelector("td")?.className).toContain("text-black");
  });

  it("does not apply black text class for non-Macro row", () => {
    const { container } = render(
      <Component>
        <TickerCell ticker={gamma.ticker} assetClass={gamma.assetClass} />
      </Component>,
    );
    expect(container.querySelector("td")?.className).not.toContain(
      "text-black",
    );
  });
});
