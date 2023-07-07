import { Message } from './apiHistory'

export const deleteItemToListArticles = async (id: string) => {
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
    const message = (await res.json()) as Message
    return message
  } catch (error) {
    console.log({ error })
  }
}
