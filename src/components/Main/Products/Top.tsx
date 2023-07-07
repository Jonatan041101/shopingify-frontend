import Icons from '@/atoms/icons'
import React from 'react'
import Searching from './Searching'

export default function Top() {
  return (
    <div className="products__top">
      <h1 className="products__h1">
        <span className="products__shoppingify">Shoppingify </span>
        te permite llevar tu lista de la compra donde vayas
      </h1>
      <Searching />
    </div>
  )
}
