export const replace = (value: string): string => {
  return value.replace(/[^a-zA-Z0-9\s]/g, "");
};
