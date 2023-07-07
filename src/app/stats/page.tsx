import Message from '@/components/Message'
import { Graphics } from '@/components/Stats/Graphics'
import TopItemCategory from '@/components/Stats/TopItemCategory'
import { statHistory } from '@/utils/apiHistory'
import { getHistorys } from '@/utils/fetchApi'
import React from 'react'

export interface GRAPH {
  name: string
  PRODUCTOS: number
}

export default async function page() {
  const stats = await statHistory()
  const historys = await getHistorys()
  const history = Object.entries(historys.history)
  const graph: GRAPH[] = history.map((histor) => ({
    name: histor[0].toUpperCase(),
    PRODUCTOS: histor[1].reduce(
      (a, b) => a + b.product.reduce((a, b) => a + b.count, 0),
      0
    ),
  }))

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
        <Graphics graph={graph} />
      </div>
    </div>
  )
}
