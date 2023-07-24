import { useBearStore } from '@/store/store'
import React from 'react'

export default function ModalProduct() {
  const { product, close } = useBearStore((state) => ({
    product: state.updatingProduct,
    close: state.optionsUpdateProduct,
  }))
  return <div></div>
}
