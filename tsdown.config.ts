import { defineConfig } from "tsdown"
import type { UserConfig as TsdownConfig } from "tsdown"

const defaultConfig = {
  outDir: "dist",
  target: 'esnext',
  format: ["esm"],
  minify: true,
  sourcemap: true,
  shims: true,
  noExternal: ['bancos-brasileiros'],
} satisfies TsdownConfig

export default defineConfig([
  {
    ...defaultConfig,
    entry: ["src/server.ts"],
    clean: true,
    banner: {
      js: "import 'reflect-metadata';",
    },
  },
  {
    ...defaultConfig,
    entry: ["prisma/seed.ts"],
    clean: false,
  }
])
