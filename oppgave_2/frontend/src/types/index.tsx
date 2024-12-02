import { z } from "zod"

export type AddEventResult = 
  | { success: true; data: any }
  | { success: false; error: { code: number; message: string } };

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
