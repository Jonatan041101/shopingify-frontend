import useAlert from './useAlert'

export default function useError() {
  const { createAlert } = useAlert()
  const handlerMsgErr = (error: unknown) => {
    const ERROR = error as Error
    const message =
      ERROR.message === 'Failed to fetch'
        ? 'Error en la petición intente mas tarde'
        : ERROR.message
    createAlert(message, true)
  }
  return {
    handlerMsgErr,
  }
}
