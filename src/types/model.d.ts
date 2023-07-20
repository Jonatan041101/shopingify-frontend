export interface User {
  id: string
  user: string
  password: string
  readonly admin: number
}
export type UserNonPassword = Omit<User, 'password'>
