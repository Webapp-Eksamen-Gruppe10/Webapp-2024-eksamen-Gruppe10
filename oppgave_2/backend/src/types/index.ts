import type { ErrorCode } from "@/lib/error";

export type Data<T> = {
  success: true;
  data: T;
};

type Err = {
  code: ErrorCode;
  message: string;
};

export type Error = {
  success: false;
  error: Err;
};

export type Result<T> = Data<T> | Error;

export type ResultFn = {
  success: <T>(data: T) => Data<T>;
  failure: (error: unknown, code: ErrorCode) => Error;
};
