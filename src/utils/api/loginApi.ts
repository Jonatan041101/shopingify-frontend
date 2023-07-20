import { Login } from '@/types/api-types'
import { ResponseError, ResponseLogin } from '@/types/response'
const NO_ENVIRONMENT_VARIABLE = 'No has ingresado la variable de entorno'
export const loginQuery = async (user: Login) => {
  try {
    if (!process.env.NEXT_PUBLIC_API_M) {
      throw new Error(NO_ENVIRONMENT_VARIABLE)
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_M}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
      cache: 'no-cache',
    })

    const userLogin = await res.json()
    if (!res.ok) {
      const { message } = userLogin as ResponseError
      throw new Error(message)
    }

    return userLogin as ResponseLogin
  } catch (error) {
    const ERROR = error as Error
    throw new Error(ERROR.message)
  }
}
