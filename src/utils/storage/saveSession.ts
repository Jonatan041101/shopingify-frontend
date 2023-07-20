import { Login } from '@/types/api-types'
import { Storage } from './enums'

export const saveSession = (user: Login) => {
  window.localStorage.setItem(Storage.USER, JSON.stringify(user))
}

export const deleteSession = () => {
  window.localStorage.removeItem(Storage.USER)
}
