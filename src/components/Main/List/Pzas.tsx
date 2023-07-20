import React from 'react'

interface Props {
  count: number
}
export default function Pzas({ count }: Props) {
  return <div className="itemslist__count">{count}</div>
}
