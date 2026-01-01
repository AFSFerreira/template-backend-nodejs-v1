export function getArrayMaxDate(dates: Date[]) {
  return new Date(Math.max(...dates.map((date) => date.getTime())))
}
