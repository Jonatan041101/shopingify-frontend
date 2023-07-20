import { CategoryName, InputChange } from '@/types/types'
import React from 'react'
import Category from '../list/Category'
interface Props {
  label: string
  place: string
  name: InputChange
  value: string
  input?: boolean
  view: boolean
  category: CategoryName[]
  handleChangeCategory: (category: string) => void
  handleChange: (
    evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
  handleFocus: () => void
  handleBlur: () => void
}
export default function SelectCategory({
  handleChange,
  handleBlur,
  handleFocus,
  handleChangeCategory,
  label,
  name,
  place,
  value,
  input,
  view,
  category,
}: Props) {
  return (
    <div className="input">
      <input
        id={name}
        className="input__input"
        placeholder={place}
        name={name}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />

      <label className="input__label" htmlFor={name}>
        <span className="input__span">{label}</span>
      </label>
      {view && (
        <Category
          category={category}
          handleChangeCategory={handleChangeCategory}
        />
      )}
    </div>
  )
}
