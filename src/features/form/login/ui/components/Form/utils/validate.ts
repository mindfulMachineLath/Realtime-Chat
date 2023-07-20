export const textValidate = (value: string): boolean =>
  !!value.trim().length && value.trim().length >= 3 && !!value;
