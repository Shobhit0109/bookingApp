export const createError = (status: number, message: string) => {
  const error = new Error(message);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (error as any).status = status;
  return error;
};
