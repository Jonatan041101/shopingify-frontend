import { ProductCategoryStat, ResUpdateList } from '@/types/types'
export interface Message {
  message: string
}
export const completeList = async (complete: boolean, historyId: string) => {
  const STATUS = complete ? 'Completado' : 'Cancelado'
  if (!process.env.NEXT_PUBLIC_API_HISTORY)
    throw new Error('No has ingresado la variable de entorno para las historys')
  const res = await fetch(process.env.NEXT_PUBLIC_API_HISTORY, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-cache',
    body: JSON.stringify({
      status: STATUS,
      historyId,
    }),
  })
  const history = await res.json()
  return history
}
interface ResponseProductListHistory {
  message: string
  id: string
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
    // console.log({ error })
  }
}

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
    console.log({ error })
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
    const message = (await res.json()) as ResUpdateList
    return message
  } catch (error) {
    console.log({ error })
  }
}
export const statHistory = async () => {
  try {
    if (!process.env.NEXT_PUBLIC_API_HISTORY)
      throw new Error(
        'No has ingresado la variable de entorno para las historys'
      )
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_HISTORY}/stats`, {
      cache: 'no-cache',
    })
    const stats = (await res.json()) as ProductCategoryStat
    return stats
  } catch (error) {
    console.log({ error })
  }
}
