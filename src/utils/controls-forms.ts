interface Control {
  loading: boolean
}

export const controlForm = (
  loading: boolean,
  createAlert: (text: string, err: boolean) => void,
  name: string,
  category: string,
  price: string | number,
  count: string | number
) => {
  if (loading) return createAlert('La imagen esta cargando espere...', true)
  if (name.trim().length === 0)
    return createAlert('Debe agregar un nombre al producto', true)
  if (category.trim().length === 0)
    return createAlert('Debe agregar una categoria', true)
  if (typeof price === 'string') {
    if (price.length === 0) {
      return createAlert(`El precio  y el stock deben ser numeros`, true)
    }
  }
  if (typeof count === 'string') {
    if (count.length === 0) {
      return createAlert(`El precio  y el stock deben ser numeros`, true)
    }
  }
  if (isNaN(Number(price)) || isNaN(Number(count))) {
    return createAlert(`El precio  y el stock deben ser numeros`, true)
  }
}
