import { InputChange } from '@/types/types'
import React from 'react'
import Icons from '../icons'
import { IconsTypes } from '../icons/types'
import useBoolean from '@/hooks/useBoolean'
interface Props {
  label: string
  place: string
  name: InputChange
  value: string
  input?: boolean
  iconLeft?: IconsTypes
  iconRigth?: IconsTypes
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
  iconLeft,
  iconRigth,
  handleChange,
}: Props) {
  const { focus, handleChangeFocus } = useBoolean()
  return (
    <div className="input">
      <div className="input__input" data-background={focus}>
        {iconLeft && (
          <i className="input__icon" data-color={focus}>
            <Icons icon={iconLeft} />
          </i>
        )}
        {input ? (
          <input
            id={name}
            // className="input__input"
            onFocus={handleChangeFocus}
            onBlur={handleChangeFocus}
            className="input__value"
            placeholder={place}
            name={name}
            value={value}
            onChange={handleChange}
          />
        ) : (
          <textarea
            className="input__textarea"
            onFocus={handleChangeFocus}
            onBlur={handleChangeFocus}
            id={name}
            placeholder={place}
            name={name}
            value={value}
            onChange={handleChange}
          />
        )}
        {iconRigth && (
          <i className="input__icon" data-color={focus}>
            <Icons icon={iconRigth} />
          </i>
        )}
      </div>
      <label className="input__label" htmlFor={name}>
        <span data-color={focus} className="input__span">
          {label}
        </span>
      </label>
    </div>
  )
}
