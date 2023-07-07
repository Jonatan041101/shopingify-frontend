import React from 'react'
import Icons from '../icons'
import { IconsTypes } from '../icons/types'
type ClassN =
  | 'button__yellow'
  | 'button__white'
  | 'button__blue'
  | 'button__red'
type ClassNIcon = 'button__color'
type Props = {
  icon?: IconsTypes
  text?: string
  deleteP?: boolean
  classN?: ClassN
  classNIcon?: ClassNIcon
  click: () => void
}

export default function Button({
  icon,
  text,
  deleteP,
  classN,
  classNIcon,
  click,
}: Props) {
  return (
    <button onClick={click} className={`button ${classN}`}>
      {icon && (
        <i className={`button__i ${classNIcon}`} data-delete={deleteP}>
          <Icons icon={icon} />
        </i>
      )}
      {text && <span className="button__span">{text}</span>}
    </button>
  )
}
