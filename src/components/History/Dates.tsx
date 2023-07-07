import Icons from '@/atoms/icons'
import { parseDate } from '@/utils/parseDate'
import React from 'react'
type HistorialDetail = 'historial__date' | 'historial__details'
interface Props {
  date: Date
  classN: HistorialDetail
}

export default function Dates({ date, classN }: Props) {
  return (
    <div className={`${classN}`}>
      <i className="historial__icondate">
        <Icons icon="date" />
      </i>
      <span className="historial__span">{parseDate(date)}</span>
    </div>
  )
}
