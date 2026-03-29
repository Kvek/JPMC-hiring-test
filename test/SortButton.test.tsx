import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SortButton } from "@/Table/SortButton";
import type { SortState } from "@/Table/types";
import userEvent from "@testing-library/user-event";

const defaultSortState: SortState = { key: "ticker", direction: "asc" };

const onSort = vi.fn();

describe("SortButton", () => {
  it("renders the label", () => {
    render(
      <SortButton
        label="Ticker"
        sortKey="ticker"
        sortState={defaultSortState}
        onSort={onSort}
      />,
    );
    expect(screen.getByText("Ticker")).toBeInTheDocument();
  });

  it("calls onSort with the correct key when clicked", async () => {
    const user = userEvent.setup();

    render(
      <SortButton
        label="Price"
        sortKey="price"
        sortState={defaultSortState}
        onSort={onSort}
      />,
    );
    const button = screen.getByRole("button");
    await user.click(button);

    expect(onSort).toHaveBeenCalledOnce();
    expect(onSort).toHaveBeenCalledWith("price");
  });

  it("disables user interaction when button is disabled", async () => {
    const user = userEvent.setup();

    render(
      <SortButton
        label="Ticker"
        sortKey="ticker"
        sortState={defaultSortState}
        onSort={onSort}
        disabled
      />,
    );
    const button = screen.getByRole("button");
    expect(button).toHaveProperty("disabled", true);
    await user.click(button);
    expect(onSort).not.toHaveBeenCalled();
  });

  it("shows the sort direction arrow when the key is active", () => {
    render(
      <SortButton
        label="Ticker"
        sortKey="ticker"
        sortState={{ key: "ticker", direction: "desc" }}
        onSort={onSort}
      />,
    );
    expect(screen.getByText("↓")).toBeInTheDocument();
  });

  it("shows the default direction arrow when the key is not active", () => {
    render(
      <SortButton
        label="Price"
        sortKey="price"
        sortState={{ key: "ticker", direction: "asc" }}
        onSort={onSort}
      />,
    );

    expect(screen.getByText("↓")).toBeInTheDocument();
  });
});
