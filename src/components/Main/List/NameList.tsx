'use client'
import Button from '@/atoms/button/Button'
import { useBearStore } from '@/store/store'
import React from 'react'

export default function NameList() {
  const { nameList, viewDrive, listForView, changeViewDrive } = useBearStore(
    (state) => state
  )
  const handleViewDrive = () => {
    // if (!listForView) return 'Guarda la lista para empezar a usarla.'
    changeViewDrive(!viewDrive)
  }

  return (
    <div className="list__name">
      <p className="list__list">
        {nameList.length === 0 ? 'Lista de compras' : nameList}
      </p>
      <div className="list__money">
        <Button
          icon="money"
          click={handleViewDrive}
          classNIcon="button__color"
        />
      </div>
    </div>
  )
}
