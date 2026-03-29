import "@testing-library/jest-dom/vitest";

import { cleanup } from "@testing-library/react";
import { afterEach, vitest } from "vitest";

afterEach(() => {
  cleanup();
  vitest.clearAllMocks();
  vitest.resetAllMocks();
});
