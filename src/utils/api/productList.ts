import {
  Message,
  ResponseHistoryUpdateCountProductShoppinList,
  ResponseProductListHistory,
} from '@/types/response'
import { errorFunction } from '../handlerError/error'

export const deleteProductListHistory = async (productId: string) => {
  if (!process.env.NEXT_PUBLIC_API_PRODUCTLIST)
    throw new Error('No has ingresado la variable de entorno para las historys')
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_PRODUCTLIST}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-cache',
      body: JSON.stringify({
        id: productId,
      }),
    })
    const message = (await res.json()) as Message
    return message
  } catch (error) {
    errorFunction(error)
  }
}
export const updateCountProductListHistory = async (
  productId: string,
  count: number
) => {
  if (!process.env.NEXT_PUBLIC_API_PRODUCTLIST)
    throw new Error('No has ingresado la variable de entorno para las historys')
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_PRODUCTLIST}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-cache',
      body: JSON.stringify({
        id: productId,
        count,
      }),
    })
    const message = await res.json()
    if (!res.ok) {
      errorFunction(message)
    }
    return message as ResponseHistoryUpdateCountProductShoppinList
  } catch (error) {
    errorFunction(error)
  }
}
export const addProductListHistory = async (
  historyId: string,
  productId: string
) => {
  try {
    if (!process.env.NEXT_PUBLIC_API_HISTORY)
      throw new Error(
        'No has ingresado la variable de entorno para las historys'
      )
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_HISTORY}/product`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-cache',
      body: JSON.stringify({
        productId,
        historyId,
      }),
    })
    const message = (await res.json()) as ResponseProductListHistory

    return message
  } catch (error) {
    errorFunction(error)
  }
}
