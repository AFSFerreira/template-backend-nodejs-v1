import type { Options as TsupOptions } from "tsup"

export default {
  entry: ["src/server.ts"],
  format: ["esm"],
  minify: true,
  sourcemap: true,
  clean: true
} satisfies TsupOptions
