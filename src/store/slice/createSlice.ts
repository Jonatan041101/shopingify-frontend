import { CategoryName } from '@/types/types'
import { StateCreator } from 'zustand'

export interface CreateProduct {
  viewCreate: boolean
  category: CategoryName[]
  addCategorys: (category: CategoryName[]) => void
  changeViewCreate: (viewCreate: boolean) => void
}

export const createSlice: StateCreator<CreateProduct> = (set) => ({
  viewCreate: false,
  category: [],
  addCategorys: (category: CategoryName[]) => {
    set((state) => ({ ...state, category }))
  },
  changeViewCreate: (viewCreate) => {
    set((state) => ({ ...state, viewCreate }))
  },
})
