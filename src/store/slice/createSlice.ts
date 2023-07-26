import { CategoryWithNameOnly } from '@/types/parse'
import { StateCreator } from 'zustand'

export interface CreateProduct {
  viewCreate: boolean
  textCreated: string
  category: CategoryWithNameOnly[]
  addCategorys: (category: CategoryWithNameOnly[]) => void
  changeViewCreate: (viewCreate: boolean, text: string) => void
}

export const createSlice: StateCreator<CreateProduct> = (set) => ({
  viewCreate: false,
  category: [],
  textCreated: '',
  addCategorys: (category: CategoryWithNameOnly[]) => {
    set((state) => ({ ...state, category }))
  },
  changeViewCreate: (viewCreate, text) => {
    set((state) => ({ ...state, viewCreate, textCreated: text }))
  },
})
