import {
  ResponseCompleteHistory,
  ResponseHistoryPending,
  ResponseHistoryShoppingModelAll,
} from '@/types/response'
import { errorFunction } from '../handlerError/error'
import { HistoryCreate, ProductCategoryStat } from '@/types/types'

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
export const completeList = async (complete: boolean, historyId: string) => {
  const STATUS = complete ? 'Completado' : 'Cancelado'
  if (!process.env.NEXT_PUBLIC_API_HISTORY)
    throw new Error('No has ingresado la variable de entorno para las historys')
  try {
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
    if (!res.ok) {
      errorFunction(history)
    }
    return history as ResponseCompleteHistory
  } catch (error) {
    console.log({ error })
    errorFunction(error)
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
    errorFunction(error)
  }
}
