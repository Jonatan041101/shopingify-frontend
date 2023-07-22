import Icons from '@/atoms/icons'
import { DolarModel } from '@/types/model'
import { ProductShoppingListWithCategoryClient } from '@/types/parse'
import { getTotal } from '@/utils/total'
import React from 'react'
interface Props {
  shopping: ProductShoppingListWithCategoryClient[]
  dolar: DolarModel | null
  changeViewDrive: (view: boolean) => void
}
export default function Facture({ shopping, dolar, changeViewDrive }: Props) {
  const total = getTotal(shopping, dolar?.value ?? 525)
  const closeModal = () => {
    changeViewDrive(false)
  }
  return shopping.map(({ product, id }) => (
    <div key={id} className="facture">
      <i className="facture__close" onClick={closeModal}>
        <Icons icon="close" />
      </i>
      <div className="facture__products">
        {product.map((product) => (
          <article className="facture__article" key={product.id}>
            <div className="facture__div">
              <h3 className="facture__h3">{product.product.name}</h3>
            </div>
            <div className="facture__price">
              <span className="facture__span">{product.count} </span>
              <span className="">x</span>
              <span className="facture__value">
                $
                {Math.trunc(
                  product.product.price * Number(dolar?.value ?? 525)
                )}
              </span>
            </div>
          </article>
        ))}
      </div>
      <div className="facture__total">
        <div className="facture__container">
          <span className="facture__all">Total</span>
          <span className="facture__total--all">${Math.trunc(total)}</span>
        </div>
      </div>
    </div>
  ))
}