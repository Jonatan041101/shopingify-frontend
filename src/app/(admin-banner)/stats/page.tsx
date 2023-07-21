import HistoryParseGraph from '@/components/History/HistoryParseGraph'
import Message from '@/components/Message'
import TopItemCategory from '@/components/Stats/TopItemCategory'
import { getHistorys, statHistory } from '@/utils/api/history'
import React from 'react'

export interface GRAPH {
  name: string
  PRODUCTOS: number
}

export default async function PageStats() {
  const stats = await statHistory()
  const historys = await getHistorys()

  return (
    <div className="products">
      <div className="stats">
        <div className="stats__register">
          <div className="stats__articles">
            <h3 className="stats__title">Top Productos</h3>
            <section className="stats__section">
              {stats?.productsStats.map((stat) => (
                <TopItemCategory
                  stat={stat}
                  classN="stats__percentage--yellow"
                  key={stat.id}
                  max={stats.productsStat100}
                />
              ))}
              {stats?.productsStats.length === 0 && <Message />}
            </section>
          </div>
          <div className="stats__articles">
            <h3 className="stats__title">Top Categorias</h3>
            <section className="stats__section">
              {stats?.categoryStats.map((stat) => (
                <TopItemCategory
                  stat={stat}
                  classN="stats__percentage--blue"
                  key={stat.id}
                  max={stats.categoryStat100}
                />
              ))}
              {stats?.categoryStats.length === 0 && <Message />}
            </section>
          </div>
        </div>
        {historys ? (
          <HistoryParseGraph historys={historys} />
        ) : (
          <div>Error al cargar</div>
        )}
      </div>
    </div>
  )
}
