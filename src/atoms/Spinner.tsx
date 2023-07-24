import React from 'react'
interface Props {
  height: string
  width: string
  user?: boolean
}

export default function Spinner({ height, width, user }: Props) {
  return (
    <div className="loader" style={{ height, width }}>
      <div className="loader__spin" data-user={user} />
    </div>
  )
}
