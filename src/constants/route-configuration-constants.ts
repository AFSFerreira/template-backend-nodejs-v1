import type { RouteShorthandOptions } from "fastify";
import { MB_IN_BYTES } from "./size-constants";

export const BLOGS_PAYLOAD_LIMIT_SIZE = {
  bodyLimit: 10 * MB_IN_BYTES
} satisfies RouteShorthandOptions
