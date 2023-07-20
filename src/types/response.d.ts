import { User } from './model'

export interface ResponseLogin {
  user: User
}
export interface ResponseError {
  message: string
}
