import React from 'react'
interface Props {
  children: React.ReactNode
  text: string
}
export default function Container({ children, text }: Props) {
  return (
    <div className="products">
      <h1 className="products__h1">
        <span className="products__shoppingify">Shoppingify </span>
        {text}
      </h1>
      {children}
    </div>
  )
}
