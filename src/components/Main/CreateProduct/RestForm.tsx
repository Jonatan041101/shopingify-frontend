import Input from '@/atoms/input/Input'
import SelectCategory from '@/atoms/input/SelectCategory'
import { EventInput } from '@/types/events'
import { CategoryName, NewItem } from '@/types/types'
import React from 'react'

interface Props {
  handleChangeCreateProduct: (evt: EventInput) => void
  newProduct: NewItem
  changeRefView: (view: boolean) => void
  manualView: (view: boolean) => void
  // Props exclusivas para SelectCategory
  category: CategoryName[]
  view: boolean
  handleChangeCategory: (category: string) => void
}

export default function RestForm({
  newProduct,
  category,
  view,
  handleChangeCreateProduct,
  changeRefView,
  manualView,
  handleChangeCategory,
}: Props) {
  const handleViewCategory = () => {
    changeRefView(false)
    manualView(true)
  }
  const handleCloseCategory = () => {
    changeRefView(true)
  }

  return (
    <>
      <Input
        handleChange={handleChangeCreateProduct}
        value={newProduct.name}
        name="name"
        input
        label="Nombre"
        place="Ingresar nombre"
      />
      <Input
        handleChange={handleChangeCreateProduct}
        value={newProduct.note}
        name="note"
        label="Nota (Opcional)"
        place="Ingresar nota"
      />
      <div className="create__select">
        <SelectCategory
          handleChange={handleChangeCreateProduct}
          handleBlur={handleCloseCategory}
          handleFocus={handleViewCategory}
          value={newProduct.categoryName}
          category={category}
          view={view}
          handleChangeCategory={handleChangeCategory}
          name="categoryName"
          label="Categoria"
          place="Ingresar nueva categoria"
        />
      </div>
      <div className="create__numbers">
        <Input
          handleChange={handleChangeCreateProduct}
          value={newProduct.price}
          name="price"
          label="Precio"
          place="Precio"
          input
          type="number"
        />
        <Input
          handleChange={handleChangeCreateProduct}
          value={newProduct.stock}
          name="stock"
          label="Cantidad"
          place="Ingresar cantidad"
          input
          type="number"
        />
      </div>
    </>
  )
}
