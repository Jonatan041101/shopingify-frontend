'use client'
import { useBearStore } from '@/store/store'
import React from 'react'
import ProductList from './ProductList'
import Icons from '@/atoms/icons'
import ViewNoProducts from './ViewNoProducts'
export default function ItemsList() {
  const { list, historyListPending } = useBearStore((state) => state)

  return (
    <div className="itemslist">
      {historyListPending
        ? historyListPending.map((products) => (
            <div key={products.id} className="itemslist__div">
              <h2 className="itemslist__h2">{products.category}</h2>
              <section className="itemslist__section">
                {products.product.map((product) => (
                  <ProductList
                    listItems={historyListPending}
                    key={product.id}
                    product={product}
                  />
                ))}
              </section>
            </div>
          ))
        : list.map((products) => (
            <div key={products.id} className="itemslist__div">
              <h2 className="itemslist__h2">{products.category}</h2>
              <section className="itemslist__section">
                {products.product.map((product) => (
                  <ProductList
                    listItems={list}
                    key={product.id}
                    product={product}
                  />
                ))}
              </section>
            </div>
          ))}
      {list.length === 0 && !historyListPending && <ViewNoProducts />}
      {historyListPending && historyListPending.length === 0 && (
        <ViewNoProducts />
      )}
    </div>
  )
}
