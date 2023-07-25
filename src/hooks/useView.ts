import { useState } from 'react'

export default function useView() {
  const [view, setView] = useState<boolean>(false)
  const changeView = () => {
    setView(!view)
  }
  const manualView = (view: boolean) => {
    setView(view)
  }
  const handleLoading = (loading: boolean) => setView(() => loading)
  return {
    view,
    changeView,
    manualView,
    handleLoading,
  }
}
