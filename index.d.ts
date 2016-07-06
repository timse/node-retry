
export interface IOptions {
  /**
   * The exponential factor to use. Default is 2.
   */
  factor?: number;
  /**
   * The number of milliseconds before starting the first retry. Default is 1000.
   */
  minTimeout?: number;
  /**
   * The maximum number of milliseconds between two retries. Default is Infinity.
   */
  maxTimeout?: number;
  /**
   * Randomizes the timeouts by multiplying with a factor between 1 to 2. Default is false.
   */
  randomize?: boolean;
}

export interface ITimeoutsOptions extends IOptions {
  /**
   * The maximum amount of times to retry the operation. Default is 10.
   */
  retries?: number;
}

export interface IRetryOperationOptions {
  /**
   * Whether to retry forever, defaults to false.
   */
  forever?: boolean;
  /**
   * Wether to unref the setTimeout's, defaults to false. Node only feature
   */
  unref?: boolean;
}

export type IOperationOptions = ITimeoutsOptions & IRetryOperationOptions;

export interface IAttempCallback {
  (attempts: number): void;
}

declare class RetryOperation {
  constructor(timeouts: number[], options?: IRetryOperationOptions);
  errors(): Error[];
  mainError(): Error;
  attempt(fn: IAttempCallback, timeoutOpts?: ITimeoutsOptions): void;
  /**
   * Deprecated
   */
  try(fn: IAttempCallback, timeoutOpts: ITimeoutsOptions): void;
  /**
   * Deprecated
   */
  start(fn: IAttempCallback, timeoutOpts: ITimeoutsOptions): void;
  retry(error: Error): boolean;
  attempts(): number;
}

export interface IRetryOperationConstructor {
  new (timeouts: number[], options?: IRetryOperationOptions): RetryOperation;
}

export function operation(opts?: IOperationOptions): RetryOperation;
export function timeouts(opts?: ITimeoutsOptions): number[];
export function createTimeout(attempt: number, opts: IOptions): number;
export function wrap<T>(obj: T, opts?: IOperationOptions, methodNames?: string[]): void;

