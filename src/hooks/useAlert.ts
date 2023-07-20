import { useBearStore } from '@/store/store'

export default function useAlert() {
  const { textAlert, isError, changeTextAlert } = useBearStore((state) => state)
  const createAlert = (alert: string, isError: boolean) => {
    if (!textAlert) {
      changeTextAlert(alert, isError)
      setTimeout(() => {
        changeTextAlert(null, false)
      }, 2000)
    }
  }
  return {
    textAlert,
    isError,
    createAlert,
  }
}
