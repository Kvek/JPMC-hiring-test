import { describe, expect, it } from "vitest";
import sampleData from "@/sampleData.json";
import type { Instrument } from "@/Table/types";
import { ASC, DESC, sortData } from "@/Table/utils";

const instruments = sampleData as Instrument[];

describe("sortData", () => {
  describe("ticker", () => {
    it("sorts ascending alphabetically", () => {
      const result = sortData(instruments, { key: "ticker", direction: ASC });
      const tickers = result.map((i) => i.ticker);
      expect(tickers[0]).toBe("ALPHA");
      expect(tickers[tickers.length - 1]).toBe("ZETA");
    });

    it("sorts descending alphabetically", () => {
      const result = sortData(instruments, { key: "ticker", direction: DESC });
      const tickers = result.map((i) => i.ticker);
      expect(tickers[0]).toBe("ZETA");
      expect(tickers[tickers.length - 1]).toBe("ALPHA");
    });

    it("produces the reverse order for ASC vs DESC", () => {
      const asc = sortData(instruments, { key: "ticker", direction: ASC }).map(
        (i) => i.ticker,
      );
      const desc = sortData(instruments, {
        key: "ticker",
        direction: DESC,
      }).map((i) => i.ticker);
      expect(asc).toEqual([...desc].reverse());
    });
  });

  describe("price", () => {
    it("sorts ascending lowest to highest", () => {
      const result = sortData(instruments, { key: "price", direction: ASC });
      expect(result[0].ticker).toBe("GAMMA");
      expect(result[result.length - 1].ticker).toBe("BETA");
    });

    it("sorts descending highest to lowest", () => {
      const result = sortData(instruments, { key: "price", direction: DESC });
      expect(result[0].ticker).toBe("BETA");
      expect(result[result.length - 1].ticker).toBe("GAMMA");
    });

    it("prices are in non-decreasing order when sorted ASC", () => {
      const result = sortData(instruments, { key: "price", direction: ASC });
      for (let i = 1; i < result.length; i++) {
        expect(result[i].price).toBeGreaterThanOrEqual(result[i - 1].price);
      }
    });
  });

  describe("assetClass", () => {
    it("sorts ascending: all Equities first, then Macro, then Credit", () => {
      const result = sortData(instruments, {
        key: "assetClass",
        direction: ASC,
      });
      const classes = result.map((i) => i.assetClass);
      const firstCredit = classes.indexOf("Credit");
      const firstMacro = classes.indexOf("Macro");
      const lastEquities = classes.lastIndexOf("Equities");
      expect(lastEquities).toBeLessThan(firstMacro);
      expect(firstMacro).toBeLessThan(firstCredit);
    });

    it("sorts descending: all Credit first, then Macro, then Equities", () => {
      const result = sortData(instruments, {
        key: "assetClass",
        direction: DESC,
      });
      const classes = result.map((i) => i.assetClass);
      const firstMacro = classes.indexOf("Macro");
      const firstEquities = classes.indexOf("Equities");
      const lastCredit = classes.lastIndexOf("Credit");
      expect(lastCredit).toBeLessThan(firstMacro);
      expect(firstMacro).toBeLessThan(firstEquities);
    });
  });

  it("does not mutate the original array", () => {
    const copy = [...instruments];
    sortData(instruments, { key: "ticker", direction: ASC });
    expect(instruments).toEqual(copy);
  });

  it("handles an empty array", () => {
    expect(sortData([], { key: "ticker", direction: ASC })).toEqual([]);
  });

  it("handles a single-item array", () => {
    const single = [instruments[0]];
    expect(sortData(single, { key: "price", direction: DESC })).toEqual(single);
  });
});
