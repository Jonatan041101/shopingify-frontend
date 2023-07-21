import Button from '@/atoms/button/Button'
import React from 'react'
import Pzas from '../Pzas'
import { ListBuy } from '@/types/types'
interface Props {
  handleCofirm: (view: boolean) => void
  handleUpdateProduct: (
    count: number,
    productId: string,
    categoryName: string,
    listItems: ListBuy[]
  ) => void
  count: number
  categoryName: string
  productId: string
  listItems: ListBuy[]
}
export default function OptionsProduct({
  count,
  categoryName,
  listItems,
  productId,
  handleCofirm,
  handleUpdateProduct,
}: Props) {
  return (
    <div className="itemslist__white">
      <Button deleteP icon="delete" click={() => handleCofirm(false)} />
      <Button
        icon="less"
        click={() =>
          handleUpdateProduct(-1, productId, categoryName, listItems)
        }
      />
      <Pzas count={count} />
      <Button
        icon="more"
        click={() => handleUpdateProduct(1, productId, categoryName, listItems)}
      />
    </div>
  )
}
