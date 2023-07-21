import {
  ResponseCategoryWithProduct,
  ResponseCreateProduct,
  ResponseHistoryPending,
  ResponseHistoryShoppingModelAll,
} from '@/types/response'
import { HistoryCreate } from '@/types/types'
import { errorFunction } from './handlerError/error'
import { CreateProductModel } from '@/types/sendBackend'

export const getProductsWithCategory = async () => {
  try {
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
    return parseProducts as ResponseCategoryWithProduct
  } catch (error) {
    errorFunction(error)
  }
}
export const createProduct = async (product: CreateProductModel) => {
  console.log({ product })

  try {
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

    const productCreated = await res.json()
    if (!res.ok) {
      errorFunction(productCreated)
    }
    return productCreated as ResponseCreateProduct
  } catch (error) {
    console.log({ error })
    errorFunction(error)
  }
}
export const createHistory = async (history: HistoryCreate) => {
  try {
    if (!process.env.NEXT_PUBLIC_API_HISTORY)
      throw new Error(
        'No has ingresado la variable de entorno para las historys'
      )

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_HISTORY}`, {
      cache: 'no-cache',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(history),
    })
    const historyCreated = await res.json()
    if (!res.ok) {
      errorFunction(historyCreated)
    }
    return historyCreated as ResponseHistoryPending
  } catch (error) {
    errorFunction(error)
  }
}
export const getHistorys = async () => {
  try {
    if (!process.env.NEXT_PUBLIC_API_HISTORY)
      throw new Error(
        'No has ingresado la variable de entorno para las historys'
      )
    const res = await fetch(process.env.NEXT_PUBLIC_API_HISTORY, {
      cache: 'no-cache',
    })
    const historys = await res.json()
    if (!res.ok) {
      errorFunction(historys)
    }
    return historys as ResponseHistoryShoppingModelAll
  } catch (error) {
    errorFunction(error)
  }
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
    if (!res.ok) {
      errorFunction(historyPending)
    }
    return historyPending as ResponseHistoryPending
  } catch (error) {
    errorFunction(error)
  }
}
