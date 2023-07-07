import { StateCreator } from 'zustand'

export interface AlertNotify {
  textAlert: string | null
  isError: boolean
  changeTextAlert: (textAlert: string | null, isError: boolean) => void
}
export const sliceAlert: StateCreator<AlertNotify> = (set) => ({
  textAlert: null,
  isError: false,
  changeTextAlert: (textAlert, isError) => {
    set((state) => ({ ...state, textAlert, isError }))
  },
})
