import React from 'react'
import Li from './Li'
import { CategoryWithNameOnly } from '@/types/parse'
interface Props {
  category: CategoryWithNameOnly[]
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
