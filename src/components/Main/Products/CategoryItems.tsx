import { Category } from '@/types/types'
import React from 'react'
import Item from './Item'
interface Props {
  category: Category
}
export default function CategoryItems({ category }: Props) {
  return (
    <div className="items__container">
      <h2 className="items__h2">{category.name}</h2>
      <section className="items__section">
        {category.product.map((prod) => (
          <Item key={prod.id} product={prod} />
        ))}
      </section>
    </div>
  )
}
