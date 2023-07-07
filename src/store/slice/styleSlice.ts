import { StateCreator } from 'zustand'

export interface Styles {
  viewListComponent: boolean
  changeViewListComponent: (view: boolean) => void
}

export const styleSlice: StateCreator<Styles> = (set) => ({
  viewListComponent: false,
  changeViewListComponent: (viewListComponent) => {
    set((state) => ({ ...state, viewListComponent }))
  },
})
