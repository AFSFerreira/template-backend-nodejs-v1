import { defineConfig } from "tsdown"
import type { UserConfig as TsdownConfig } from "tsdown"

const defaultConfig = {
  outDir: "dist",
  target: 'esnext',
  format: ["esm"],
  nodeProtocol: true,
  minify: true,
  sourcemap: true,
  shims: true,
  treeshake: true,
  deps: {
    onlyAllowBundle: false,
    skipNodeModulesBundle: true,
  }
} as const satisfies TsdownConfig

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
