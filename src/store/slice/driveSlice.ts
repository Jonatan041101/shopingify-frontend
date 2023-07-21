import { ProductShoppingListWithCategoryClient } from '@/types/parse'
import { ListBuy } from '@/types/types'
import { StateCreator } from 'zustand'
export interface Drive {
  viewDrive: boolean
  listForView: boolean
  historyListPending: ProductShoppingListWithCategoryClient[] | null
  historyId: string
  addProductHistory: (
    historyListPending: ProductShoppingListWithCategoryClient[]
  ) => void
  endHistoryPending: () => void
  existHistoryListPending: (
    history: ProductShoppingListWithCategoryClient[],
    historyId: string
  ) => void
  changeViewDrive: (viewDrive: boolean) => void
  changeListForView: (listForView: boolean) => void
}

export const driveSlice: StateCreator<Drive> = (set) => ({
  viewDrive: false,
  listForView: false,
  historyId: '',
  historyListPending: null,
  addProductHistory: (historyListPending) => {
    set((state) => ({ ...state, historyListPending }))
  },
  existHistoryListPending: (historyListPending, historyId) => {
    set((state) => ({ ...state, historyListPending, historyId }))
  },
  endHistoryPending: () => {
    set((state) => ({
      ...state,
      historyListPending: null,
      historyId: '',
      viewDrive: false,
      listForView: false,
    }))
  },
  changeListForView: (listForView) => {
    set((state) => ({ ...state, listForView }))
  },
  changeViewDrive: (viewDrive) => {
    set((state) => ({ ...state, viewDrive }))
  },
})
