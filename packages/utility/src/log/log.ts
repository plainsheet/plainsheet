/* 
    eslint-disable no-console -- Allow intentional logging 
    while preventing authors leaving unintended logs.
 */
type ConsoleLog = typeof console.log;
type ConsoleError = typeof console.error;

export function log(...params: Parameters<ConsoleLog>): ReturnType<ConsoleLog> {
  console.log(params);
}

export function logError(
  ...params: Parameters<ConsoleError>
): ReturnType<ConsoleError> {
  console.error(params);
}
