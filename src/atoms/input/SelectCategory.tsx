import { InputChange } from '@/types/types'
import React from 'react'
interface Props {
  label: string
  place: string
  name: InputChange
  value: string
  input?: boolean
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
  label,
  name,
  place,
  value,
  input,
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
    </div>
  )
}
