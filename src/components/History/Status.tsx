import React from 'react'
interface Props {
  status: string
}
export default function Status({ status }: Props) {
  return (
    <div className={`historial__status ${status.toLowerCase()}`}>{status}</div>
  )
}
