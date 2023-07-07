export const parseDate = (date: Date) => {
  const DATE = new Date(date)
  const newDate = DATE.toLocaleString('es-AR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  return newDate
}
