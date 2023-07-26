'use client'
import Icons from '@/atoms/icons'
import { useBearStore } from '@/store/store'
import React from 'react'

export default function AddItem() {
  const { changeViewCreate } = useBearStore((state) => state)
  const handleClick = () => {
    changeViewCreate(true, 'Agregar producto')
  }
  return (
    <div className="list__top">
      <div className="list__botl">
        <i className="list__bottle">
          <Icons icon="bottle" />
        </i>
      </div>
      <div className="list__add">
        <h3 className="list__non">¿No encontró lo que necesita?</h3>
        <button className="list__button" onClick={handleClick}>
          Agregar producto
        </button>
      </div>
    </div>
  )
}
