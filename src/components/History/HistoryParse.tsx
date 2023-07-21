import React from 'react'
import HistoryC from './HistoryC'
import { ResponseHistoryShoppingModelAll } from '@/types/response'
interface Props {
  historys: ResponseHistoryShoppingModelAll
}
export default function HistoryParse({ historys }: Props) {
  const history = Object.entries(historys.history)

  return <HistoryC history={history} />
}
