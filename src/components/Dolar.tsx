'use client'
import useAlert from '@/hooks/useAlert'
import { useBearStore } from '@/store/store'
import { getDolarValue } from '@/utils/api/dolar'
import React, { useEffect } from 'react'

export default function Dolar() {
  const { addDolar } = useBearStore((state) => state)
  const { createAlert } = useAlert()
  useEffect(() => {
    const getDolar = async () => {
      const dolar = await getDolarValue()
      if (dolar) {
        addDolar(dolar?.dolar)
      } else {
        createAlert('Error del dolar', true)
      }
    }
    getDolar()
  }, [])
  return <div></div>
}
