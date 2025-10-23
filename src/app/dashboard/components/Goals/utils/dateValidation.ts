export const validateDateLimit = (inputDate: string): boolean => {
  const selected = new Date(inputDate);
  const now = new Date();

  const tenYearsLater = new Date();
  tenYearsLater.setFullYear(now.getFullYear() + 10);

  return selected >= now && selected <= tenYearsLater;
};
