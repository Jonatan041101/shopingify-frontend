import Container from '@/components/Container'
import HistoryC from '@/components/History/HistoryC'
import HistoryParse from '@/components/History/HistoryParse'
import { getHistorys } from '@/utils/api/history'
import React from 'react'

export default async function page() {
  const historys = await getHistorys()

  return (
    <Container text="historial">
      {historys ? (
        <HistoryParse historys={historys} />
      ) : (
        <div>Error al cargar</div>
      )}
    </Container>
  )
}
