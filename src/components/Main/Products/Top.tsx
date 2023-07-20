'use client'
import React from 'react'
import Searching from './Searching'
import { useBearStore } from '@/store/store'

export default function Top() {
  const { user } = useBearStore((state) => state)
  return (
    <div className="products__top">
      <h1 className="products__h1">
        Bienvenido
        <span className="products__shoppingify"> {user?.user} </span>
        👋
        {/* te permite llevar tu lista de la compra donde vayas */}
      </h1>
      <Searching />
    </div>
  )
}
