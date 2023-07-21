import Icons from '@/atoms/icons'
import React from 'react'
import Status from './Status'
import Dates from './Dates'
import { HistoryShoppingModel } from '@/types/model'

interface Props {
  history: HistoryShoppingModel
  handleViewHistory: (historyItem: HistoryShoppingModel) => void
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
