import React from 'react'
import { CategoryWithNameOnly } from '@/types/parse'
interface Props {
  category: CategoryWithNameOnly
  children: React.ReactNode
}
export default function CategoryItems({ category, children }: Props) {
  return (
    <div className="items__container">
      <h2 className="items__h2">{category.category}</h2>
      <section className="items__section">{children}</section>
    </div>
  )
}
