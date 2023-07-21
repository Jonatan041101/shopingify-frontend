'use client'
import React from 'react'
import Top from './Products/Top'
import Items from './Products/Items'
import { ResponseCategoryWithProduct } from '@/types/response'

type Props = {
  products: ResponseCategoryWithProduct
}

export default function Products({ products }: Props) {
  console.log(products)

  return (
    <div className="products">
      <Top />
      <Items products={products} />
    </div>
  )
}
