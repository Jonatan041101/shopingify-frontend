import { GRAPH } from '@/app/(admin-banner)/stats/page'
import { ResponseHistoryShoppingModelAll } from '@/types/response'
import React from 'react'
import { Graphics } from '../Stats/Graphics'
interface Props {
  historys: ResponseHistoryShoppingModelAll
}
export default function HistoryParseGraph({ historys }: Props) {
  const history = Object.entries(historys?.history)
  const graph: GRAPH[] = history.map((histor) => ({
    name: histor[0].toUpperCase(),
    PRODUCTOS: histor[1].reduce(
      (a, b) => a + b.product.reduce((a, b) => a + b.count, 0),
      0
    ),
  }))
  return <Graphics graph={graph} />
}
