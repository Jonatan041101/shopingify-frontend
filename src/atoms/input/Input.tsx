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
}

export default function Input({
  label,
  place,
  input,
  name,
  value,
  handleChange,
}: Props) {
  return (
    <div className="input">
      {input ? (
        <input
          id={name}
          className="input__input"
          placeholder={place}
          name={name}
          value={value}
          onChange={handleChange}
        />
      ) : (
        <textarea
          className="input__textarea"
          id={name}
          placeholder={place}
          name={name}
          value={value}
          onChange={handleChange}
        />
      )}
      <label className="input__label" htmlFor={name}>
        <span className="input__span">{label}</span>
      </label>
    </div>
  )
}
