import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import sampleData from "@/sampleData.json";
import { Table } from "@/Table/index";
import type { Instrument } from "@/Table/types";
import userEvent from "@testing-library/user-event";

const data = sampleData as Instrument[];

describe("Table", () => {
  it("renders column headers correctly", () => {
    render(<Table data={data} />);
    const headers = screen.getAllByRole("columnheader");
    const headerTexts = headers.map((h) => h.textContent);
    expect(headerTexts).toContain("Ticker");
    expect(headerTexts).toContain("Asset Class");
    expect(headerTexts).toContain("Price");
  });

  it("renders sort buttons", () => {
    render(<Table data={data} />);
    expect(screen.getAllByRole("button")).toHaveLength(3);
  });

  it("shows the empty state when no data is provided", () => {
    render(<Table data={[]} />);
    expect(screen.getByText("No instruments to display.")).toBeTruthy();
  });

  it("disables sort buttons when data is empty", () => {
    render(<Table data={[]} />);
    const buttons = screen.getAllByRole("button") as HTMLButtonElement[];
    expect(buttons.every((btn) => btn.disabled)).toBe(true);
  });

  it("sorts by ticker column appropriatly when sort button is clicked", async () => {
    const user = userEvent.setup();
    const { rerender } = render(<Table data={data} />);
    const rows = screen.getAllByRole("row");

    expect(rows[1].textContent).toContain("ALPHA");
    expect(rows[rows.length - 1].textContent).toContain("ZETA");

    const tickerSortButton = screen.getByRole("button", { name: /ticker/i });

    await user.click(tickerSortButton);

    rerender(<Table data={data} />);
    const rowsSorted = screen.getAllByRole("row");

    expect(rowsSorted[1].textContent).toContain("ZETA");
    expect(rowsSorted[rowsSorted.length - 1].textContent).toContain("ALPHA");

    await user.click(tickerSortButton);

    rerender(<Table data={data} />);
    const rowsReSorted = screen.getAllByRole("row");

    expect(rowsReSorted[1].textContent).toContain("ALPHA");
    expect(rowsReSorted[rowsReSorted.length - 1].textContent).toContain("ZETA");
  });

  it("sorts by price descending when the price button is clicked", async () => {
    const sampleData = [
      {
        ticker: "ALPHA",
        price: 3150.67,
        assetClass: "Credit",
      },
      {
        ticker: "BETA",
        price: 3791.37,
        assetClass: "Equities",
      },
      {
        ticker: "GAMMA",
        price: -2299.1,
        assetClass: "Equities",
      },
    ] as Instrument[];

    const user = userEvent.setup();
    render(<Table data={sampleData} />);

    const priceSortButton = screen.getByRole("button", { name: /price/i });
    await user.click(priceSortButton);

    const rows = screen.getAllByRole("row");
    expect(rows[1].textContent).toContain("BETA");
    expect(rows[rows.length - 1].textContent).toContain("GAMMA");
  });
});
