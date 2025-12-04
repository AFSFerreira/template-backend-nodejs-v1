import { defineConfig } from "tsup"
import type { Options as TsupOptions } from "tsup"

const defaultConfig = {
  outDir: "dist",
  format: ["esm"],
  minify: true,
  sourcemap: true,
} satisfies TsupOptions

export default defineConfig([
  {
    ...defaultConfig,
    entry: ["src/server.ts"],
    clean: true,
  },
  {
    ...defaultConfig,
    entry: ["prisma/seed.ts"],
    clean: false,
  }
])
