import React, { useState } from 'react'

export default function useView() {
  const [view, setView] = useState<boolean>(false)
  const changeView = () => {
    setView(!view)
  }
  const manualView = (view: boolean) => {
    setView(view)
  }
  return {
    view,
    changeView,
    manualView,
  }
}
