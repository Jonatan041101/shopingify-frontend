import React from 'react'
import Name from './Name'
interface Props {
  name: string
  text: string
  titleName?: boolean
}
export default function Section({ name, text, titleName }: Props) {
  return (
    <div className="detailproduct__section">
      <Name text={name} />
      <p className="detailproduct__p" data-title={titleName}>
        {text}
      </p>
    </div>
  )
}
