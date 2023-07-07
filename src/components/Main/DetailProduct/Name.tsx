import React from 'react'

interface Props {
  text: string
}

export default function Name({ text }: Props) {
  return <span className="detailproduct__name">{text}</span>
}
