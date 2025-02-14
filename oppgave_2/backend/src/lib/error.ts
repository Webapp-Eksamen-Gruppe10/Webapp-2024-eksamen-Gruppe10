import { z } from "zod";
import type { StatusCode } from "hono/utils/http-status";
import type { Context } from "hono";

const Errors = z.enum([
  "BAD_REQUEST",
  "FORBIDDEN",
  "INTERNAL_SERVER_ERROR",
  "NOT_FOUND",
  "NOT_UNIQUE",
  "RATE_LIMITED",
  "UNAUTHORIZED",
  "METHOD_NOT_ALLOWED",
]);

export type ErrorCode = z.infer<typeof Errors>;

function codeToStatus(code: ErrorCode): StatusCode {
  switch (code) {
    case "BAD_REQUEST":
      return 400;
    case "FORBIDDEN":
    case "UNAUTHORIZED":
      return 403;
    case "NOT_FOUND":
      return 404;
    case "METHOD_NOT_ALLOWED":
      return 405;
    case "NOT_UNIQUE":
      return 409;
    case "RATE_LIMITED":
      return 429;
    case "INTERNAL_SERVER_ERROR":
      return 500;
  }
}

export function errorResponse(c: Context, code: ErrorCode, message: string) {
  return c.json(
    {
      error: {
        code,
        message,
      },
    },
    { status: codeToStatus(code) }
  );
}
