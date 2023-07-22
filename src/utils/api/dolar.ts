import { ResponseModal } from '@/types/response'
import { errorFunction } from '../handlerError/error'

export const getDolarValue = async () => {
  try {
    if (!process.env.NEXT_PUBLIC_API_DOLAR)
      throw new Error('No has colocado la variable de entorno')
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOLAR}`)
    const dolar = await res.json()
    console.log({ dolar })
    if (!res.ok) throw new Error('Error del servidor')
    return dolar as ResponseModal
  } catch (error) {
    errorFunction(error)
  }
}
