'use client'
import React from 'react'
import ListProducts from './List/ListProducts'
import { useBearStore } from '@/store/store'
import DetailProduct from './DetailProduct/DetailProduct'
import CreateProduct from './CreateProduct/CreateProduct'

export default function List() {
  const { product, viewCreate, viewListComponent } = useBearStore(
    (state) => state
  )

  return (
    <div className="list" data-translate={viewListComponent}>
      {product && <DetailProduct product={product} />}
      {viewCreate && <CreateProduct />}
      {!product && !viewCreate && <ListProducts />}
    </div>
  )
}
