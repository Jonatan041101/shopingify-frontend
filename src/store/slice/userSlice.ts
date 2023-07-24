import { UserNonPassword } from '@/types/model'
import { StateCreator } from 'zustand'

export interface UserSlice {
  user: UserNonPassword | null
  loaderUser: boolean
  changeLoaderUser: (endLoading: boolean) => void
  changeUser: (user: UserNonPassword | null) => void
}
export const userSlice: StateCreator<UserSlice> = (set) => ({
  user: null,
  loaderUser: true,
  changeLoaderUser: (loader) => {
    set((state) => ({ ...state, loaderUser: loader }))
  },
  changeUser: (user) => set((state) => ({ ...state, user })),
})
