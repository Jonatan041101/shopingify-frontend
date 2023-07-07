import Icons from '@/atoms/icons'
import { HistoryItem } from '@/types/types'
import React from 'react'
import Status from './Status'
import { parseDate } from '@/utils/parseDate'
import Dates from './Dates'

interface Props {
  history: HistoryItem
  handleViewHistory: (historyItem: HistoryItem) => void
}
export default function HistoryCard({ history, handleViewHistory }: Props) {
  return (
    <section
      className="historial__section"
      key={history.id}
      onClick={() => handleViewHistory(history)}
    >
      <article className="historial__article">
        <p className="historial__name">{history.name}</p>
        <div className="historial__container">
          <Dates date={history.date} classN="historial__date" />
          <Status status={history.status} />
          <i className="historial__arrow">
            <Icons icon="arrow" />
          </i>
        </div>
      </article>
    </section>
  )
}
