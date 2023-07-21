export interface User {
  id: string
  user: string
  password: string
  readonly admin: number
}
export type UserNonPassword = Omit<User, 'password'>
export interface Stock {
  id: string
  count: number
}
