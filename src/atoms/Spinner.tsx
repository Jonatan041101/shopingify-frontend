import React from 'react'
interface Props {
  height: string
  width: string
}

export default function Spinner({ height, width }: Props) {
  return (
    <div className="loader" style={{ height, width }}>
      <div className="loader__spin" />
    </div>
  )
}
