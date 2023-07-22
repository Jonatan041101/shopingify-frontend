import { CategoryWithNameOnly } from '@/types/parse'
import { StateCreator } from 'zustand'

export interface CreateProduct {
  viewCreate: boolean
  category: CategoryWithNameOnly[]
  addCategorys: (category: CategoryWithNameOnly[]) => void
  changeViewCreate: (viewCreate: boolean) => void
}

export const createSlice: StateCreator<CreateProduct> = (set) => ({
  viewCreate: false,
  category: [],
  addCategorys: (category: CategoryWithNameOnly[]) => {
    set((state) => ({ ...state, category }))
  },
  changeViewCreate: (viewCreate) => {
    set((state) => ({ ...state, viewCreate }))
  },
})
