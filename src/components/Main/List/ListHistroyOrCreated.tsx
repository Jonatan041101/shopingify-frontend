import React from 'react'
import ProductList from './Product/ProductList'
import { ProductShoppingListWithCategoryClient } from '@/types/parse'

interface Props {
  products: ProductShoppingListWithCategoryClient
  list: ProductShoppingListWithCategoryClient[]
}

export default function ListHistroyOrCreated({ products, list }: Props) {
  return (
    <div key={products.id} className="itemslist__div">
      <h2 className="itemslist__h2">{products.category}</h2>
      <section className="itemslist__section">
        {products.product.map((product) => (
          <ProductList listItems={list} key={product.id} product={product} />
        ))}
      </section>
    </div>
  )
}
