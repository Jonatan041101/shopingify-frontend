import { UserNonPassword } from '@/types/model'
import { StateCreator } from 'zustand'

export interface UserSlice {
  user: UserNonPassword | null
  changeUser: (user: UserNonPassword | null) => void
}
export const userSlice: StateCreator<UserSlice> = (set) => ({
  user: null,
  changeUser: (user) => set((state) => ({ ...state, user })),
})
