export const hasMessage = (value: unknown): value is { message: string } => {
  if (typeof value !== "object") {
    return false;
  }

  if (value === null) {
    return false;
  }

  return "message" in value && typeof value.message === "string";
};
