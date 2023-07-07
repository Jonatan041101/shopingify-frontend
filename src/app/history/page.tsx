import Container from '@/components/Container'
import HistoryC from '@/components/History/HistoryC'
import { getHistorys } from '@/utils/fetchApi'
import React from 'react'

export default async function page() {
  const historys = await getHistorys()
  const history = Object.entries(historys.history)

  return (
    <Container text="historial">
      <HistoryC history={history} />
    </Container>
  )
}
