export const errorFunction = (error: unknown) => {
  const ERROR = error as Error
  throw new Error(ERROR.message)
}
