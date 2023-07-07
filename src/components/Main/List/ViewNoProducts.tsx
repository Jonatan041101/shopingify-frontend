import Icons from '@/atoms/icons'
import React from 'react'

export default function ViewNoProducts() {
  return (
    <div className="itemslist__nonproducts">
      <div className="itemslist__nonproducts--container">
        <p className="itemslist__nonproducts--p">Sin productos</p>
        <div className="itemslist__nonproducts--icon">
          <i className="itemslist__nonproducts--i">
            <Icons icon="no-product" />
          </i>
        </div>
      </div>
    </div>
  )
}
