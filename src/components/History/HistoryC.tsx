'use client'
import { HistoryItem } from '@/types/types'
import React, { useState } from 'react'
import HistoryCard from './HistoryCard'
import HistoryDetail from './HistoryDetail'
import Message from '../Message'

interface Props {
  history: [string, HistoryItem[]][]
}

export default function HistoryC({ history }: Props) {
  const [product, setProduct] = useState<HistoryItem | null>(null)
  const handleViewHistory = (historyItem: HistoryItem | null) => {
    setProduct(historyItem)
  }
  return (
    <>
      {product ? (
        <HistoryDetail
          product={product}
          handleViewHistory={handleViewHistory}
        />
      ) : (
        <div className="historial">
          {history.length === 0 && <Message />}
          {history.map((histor) => (
            <div className="historial__order" key={histor[0]}>
              <h3 className="historial__h3">{histor[0]}</h3>
              {histor[1].map((historyItem) => (
                <HistoryCard
                  key={historyItem.id}
                  history={historyItem}
                  handleViewHistory={handleViewHistory}
                />
              ))}
            </div>
          ))}
        </div>
      )}
    </>
  )
}
