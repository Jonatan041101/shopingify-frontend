import Icons from '@/atoms/icons'
import React from 'react'

interface Props {
  viewDrive: boolean
  checked: boolean
  handleChangeListProductBuy: () => void
}
export default function MarkerCheck({
  checked,
  viewDrive,
  handleChangeListProductBuy,
}: Props) {
  return (
    <>
      {viewDrive && (
        <button
          className="itemslist__checked"
          onClick={handleChangeListProductBuy}
        >
          {checked && (
            <i className="itemslist__checked--i">
              <Icons icon="nice" />
            </i>
          )}
        </button>
      )}
    </>
  )
}
