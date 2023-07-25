import { StateCreator } from 'zustand'

export interface FunctionsModal {
  viewModal: boolean
  status: boolean
  text: string
  loading: boolean
  handleLoadingChange: (load: boolean) => void
  yesNoFunction: (confirm: boolean) => void
  changeStatus: (
    status: boolean,
    text: string,
    viewModal: boolean,
    yesNoFunction: (confirm: boolean) => void
  ) => void
}

export const sliceModal: StateCreator<FunctionsModal> = (set) => ({
  viewModal: false,
  yesNoFunction: () => {},
  status: false,
  text: '',
  loading: false,
  handleLoadingChange: (load) => {
    set((state) => ({ ...state, loading: load }))
  },
  changeStatus: (status, text, viewModal, yesNoFunction) => {
    set((state) => ({
      ...state,
      status,
      text,
      viewModal,
      yesNoFunction: yesNoFunction,
    }))
  },
})
