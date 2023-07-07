import { Stat } from '@/types/types'
import React from 'react'
type ClassN = 'stats__percentage--yellow' | 'stats__percentage--blue'
interface Props {
  stat: Stat
  max: number
  classN: ClassN
}
function getFirstDecimal(percentaje: number) {
  // Multiplica el número por 10 y lo redondea al número entero más cercano

  let entero = Math.round(percentaje * 10)
  if (entero === 0) {
    return percentaje
  }
  const numberNonDecimal = String(percentaje).split('.')[0]
  // Obtiene el primer decimal dividiendo el número entero por 10
  const decimals = entero % 10
  const numberParser = Number(numberNonDecimal) + decimals / 10
  return numberParser
}

export default function TopItemCategory({ stat, max, classN }: Props) {
  const result = (100 * stat.count) / max
  const VIEW_RESULT = getFirstDecimal(result)

  return (
    <article className="stats__top">
      <div className="stats__name">
        <h4 className="stats__h4">{stat.name}</h4>
        <p className="stats__p" title={`${result}`}>
          {VIEW_RESULT}%
        </p>
      </div>
      <div className="stats__gray">
        <div
          className={`stats__percentage ${classN}`}
          style={{
            width: `${VIEW_RESULT}%`,
          }}
        />
      </div>
    </article>
  )
}
