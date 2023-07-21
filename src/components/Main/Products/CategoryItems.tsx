import { Category } from '@/types/types'
import React from 'react'
import Item from './Item'
import { CategoryWithProductClient } from '@/types/parse'
interface Props {
  category: CategoryWithProductClient
}
export default function CategoryItems({ category }: Props) {
  return (
    <div className="items__container">
      <h2 className="items__h2">{category.category}</h2>
      <section className="items__section">
        {category.product.map((prod) => (
          <Item key={prod.id} product={prod} />
        ))}
      </section>
    </div>
  )
}
