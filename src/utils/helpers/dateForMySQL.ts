export const dateForMySQL = (value: Date | string): Date => {
  let year;
  let month;
  let day;

  if (typeof value === "string") {
    const split = value.split("-");
    year = Number(split[0]);
    month = Number(split[1]);
    day = Number(split[2]);
  } else {
    year = value.getFullYear();
    month = value.getMonth();
    day = value.getDate();
  }

  return new Date(year, month, day);
};
