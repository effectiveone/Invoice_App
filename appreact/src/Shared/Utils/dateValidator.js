import { format, isValid, parseISO } from "date-fns";

export const convertDate = (dateToFormat) => {
  const date = parseISO(dateToFormat);
  if (isValid(date)) {
    return format(date, "yyyy-MM-dd");
  } else {
    return dateToFormat;
  }
};
