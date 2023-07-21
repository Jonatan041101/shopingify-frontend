import {
  ResponseCategoryWithProduct,
  ResponseCreateProduct,
} from '@/types/response'
import { HistoryCreate, HistoryGet, HistoryPending } from '@/types/types'
import { errorFunction } from './handlerError/error'
import { CreateProductModel } from '@/types/sendBackend'

export const getProductsWithCategory = async () => {
  if (!process.env.NEXT_PUBLIC_API_PRODUCTS)
    throw new Error(
      'No has ingresado la variable de entorno para los productos'
    )
  try {
    const products = await fetch(process.env.NEXT_PUBLIC_API_PRODUCTS, {
      cache: 'no-cache',
    })

    const parseProducts = await products.json()

    if (!parseProducts.products)
      throw new Error('No es la respuesta esperada {products:[]}')
    return parseProducts as ResponseCategoryWithProduct
  } catch (error) {
    errorFunction(error)
  }
}
export const createProduct = async (product: CreateProductModel) => {
  console.log({ product })

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
  console.log({ res })

  const productCreated = (await res.json()) as ResponseCreateProduct
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
