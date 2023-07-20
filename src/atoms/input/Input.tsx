import { InputChange } from '@/types/types'
import React, { useState } from 'react'
import Icons from '../icons'
import { IconsTypes } from '../icons/types'
import useBoolean from '@/hooks/useBoolean'
import { EventInput, TypeInput } from '@/types/events'
interface Props {
  label: string
  place: string
  name: InputChange
  value: string | number
  input?: boolean
  iconLeft?: IconsTypes
  iconRigth?: IconsTypes
  type?: TypeInput
  handleChange: (evt: EventInput) => void
}

export default function Input({
  label,
  place,
  input,
  name,
  value,
  iconLeft,
  iconRigth,
  type,
  handleChange,
}: Props) {
  const { focus, handleChangeFocus } = useBoolean()
  const [typeInput, setTtypeInput] = useState<TypeInput>(type ?? 'text')
  const handleChangeType = () => {
    if (typeInput === 'text') {
      return setTtypeInput('password')
    }
    setTtypeInput('text')
  }
  console.log(typeInput)

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
            type={typeInput}
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
          <i
            className="input__icon input__btn"
            data-color={typeInput === 'text'}
            onClick={handleChangeType}
          >
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
