import React, { useState } from 'react'

export default function useBoolean() {
  const [focus, setFocus] = useState<boolean>()
  const handleChangeFocus = () => setFocus(!focus)
  return {
    focus,
    handleChangeFocus,
  }
}
