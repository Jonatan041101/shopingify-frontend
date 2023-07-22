import { DolarModel } from '@/types/model'
import { StateCreator } from 'zustand'

export interface DolarSlice {
  dolar: DolarModel | null
  addDolar: (dolar: DolarModel) => void
}

export const sliceDolar: StateCreator<DolarSlice> = (set) => ({
  dolar: null,
  addDolar: (dolar) => {
    set((state) => ({ ...state, dolar }))
  },
})
