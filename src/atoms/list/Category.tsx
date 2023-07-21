import { CategoryName } from '@/types/types'
import React from 'react'
import Li from './Li'
interface Props {
  category: CategoryName[]
  handleChangeCategory: (category: string) => void
}
export default function Category({ category, handleChangeCategory }: Props) {
  return (
    <ul className="create__categorys">
      {category.map(({ category, id }) => (
        <Li
          key={id}
          name={category}
          handleChangeCategory={handleChangeCategory}
        />
      ))}
    </ul>
  )
}
