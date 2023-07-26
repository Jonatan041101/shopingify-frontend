import { Message } from '@/types/response'
import { errorFunction } from './handlerError/error'

export const deleteProductModel = async (id: string) => {
  if (!process.env.NEXT_PUBLIC_API_PRODUCTS)
    throw new Error(
      'No has ingresado la variable de entorno para los productos'
    )

  try {
    const res = await fetch(process.env.NEXT_PUBLIC_API_PRODUCTS, {
      method: 'DELETE',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
      }),
    })

    const message = await res.json()
    if (!res.ok) {
      errorFunction(message)
    }
    return message as Message
  } catch (error) {
    errorFunction(error)
  }
}
