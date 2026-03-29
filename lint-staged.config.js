/** @type {import('lint-staged').Config} */
export default {
  // Run OXLint on staged JS/TS files
  "*.{js,jsx,ts,tsx,mjs,cjs}": ["oxlint --fix"],

  // Type-check staged TS files (via tsc)
  "*.{ts,tsx}": () => "tsc --noEmit",

  // Run tests only if test files are staged
  "*.{test,spec}.{ts,tsx,js,jsx}": (files) => {
    const testFiles = files.filter((f) =>
      /\.(test|spec)\.(ts|tsx|js|jsx)$/.test(f),
    );
    if (testFiles.length === 0) return [];
    return [`pnpm vitest run --reporter=verbose ${testFiles.join(" ")}`];
  },
};
