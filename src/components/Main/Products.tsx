import React from 'react'
import Top from './Products/Top'
import Items from './Products/Items'
import { GetProduct } from '@/types/types'

type Props = {
  products: GetProduct
}

export default function Products({ products }: Props) {
  return (
    <div className="products">
      <Top />
      <Items products={products} />
    </div>
  )
}
