export const months = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
] as const

export const monthIndex = (pubdate: string) =>
  new Date(pubdate).getMonth() === 0
    ? new Date(pubdate).getMonth()
    : new Date(pubdate).getMonth()
