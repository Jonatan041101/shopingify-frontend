import { Login } from '@/types/api-types'
const NO_ENVIRONMENT_VARIABLE = 'No has ingresado la variable de entorno'
export const loginQuery = async (user: Login) => {
  console.log({ user })

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
    console.log({ res })

    const userLogin = await res.json()
    console.log({ userLogin })

    return userLogin
  } catch (error) {
    const ERROR = error as Error
    throw new Error(ERROR.message)
  }
}
