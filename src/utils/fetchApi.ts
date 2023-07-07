import {
  GetProduct,
  HistoryCreate,
  HistoryGet,
  HistoryPending,
  NewItem,
  Product,
} from '@/types/types'
interface CreateProduct {
  product: Product
}
export const getProductsWithCategory = async () => {
  if (!process.env.NEXT_PUBLIC_API_PRODUCTS)
    throw new Error(
      'No has ingresado la variable de entorno para los productos'
    )
  const products = await fetch(process.env.NEXT_PUBLIC_API_PRODUCTS, {
    cache: 'no-cache',
  })
  const parseProducts = await products.json()
  if (!parseProducts.products)
    throw new Error('No es la respuesta esperada {products:[]}')
  return parseProducts as GetProduct
}
export const createProduct = async (product: NewItem) => {
  if (!process.env.NEXT_PUBLIC_API_PRODUCTS)
    throw new Error(
      'No has ingresado la variable de entorno para los productos'
    )
  const res = await fetch(process.env.NEXT_PUBLIC_API_PRODUCTS, {
    cache: 'no-cache',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  })
  const productCreated = (await res.json()) as CreateProduct
  return productCreated
}
export const createHistory = async (history: HistoryCreate) => {
  if (!process.env.NEXT_PUBLIC_API_HISTORY)
    throw new Error('No has ingresado la variable de entorno para las historys')

  const res = await fetch(process.env.NEXT_PUBLIC_API_HISTORY, {
    cache: 'no-cache',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(history),
  })
  const historyCreated = (await res.json()) as HistoryPending
  return historyCreated
}
export const getHistorys = async () => {
  if (!process.env.NEXT_PUBLIC_API_HISTORY)
    throw new Error('No has ingresado la variable de entorno para las historys')
  const res = await fetch(process.env.NEXT_PUBLIC_API_HISTORY, {
    cache: 'no-cache',
  })
  const historys = (await res.json()) as HistoryGet
  return historys
}
export const getHistoryPending = async () => {
  try {
    if (!process.env.NEXT_PUBLIC_API_HISTORY)
      throw new Error(
        'No has ingresado la variable de entorno para las historys'
      )
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_HISTORY}/pending`, {
      cache: 'no-cache',
    })

    const historyPending = await res.json()
    if (historyPending.message) throw new Error(historyPending.message)
    return historyPending as HistoryPending
  } catch (error) {
    const ERROR = error as Error
    return ERROR.message
  }
}
