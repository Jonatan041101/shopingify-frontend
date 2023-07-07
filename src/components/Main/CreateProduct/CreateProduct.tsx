'use client'
import Button from '@/atoms/button/Button'
import Input from '@/atoms/input/Input'
import SelectCategory from '@/atoms/input/SelectCategory'
import useAlert from '@/hooks/useAlert'
import useView from '@/hooks/useView'
import { useBearStore } from '@/store/store'
import { Category, InputChange, NewItem } from '@/types/types'
import { createProduct } from '@/utils/fetchApi'
import React, { useState } from 'react'
const INITIAL_STATE = {
  categoryName: '',
  image: '',
  name: '',
  note: '',
}
export default function CreateProduct() {
  const { items, category, changeViewCreate, addItemsProducts } = useBearStore(
    (state) => state
  )
  const [newProduct, setNewProduct] = useState<NewItem>(INITIAL_STATE)
  const { view, changeView } = useView()
  const { createAlert } = useAlert()
  const handleChangeViewCreate = () => {
    changeViewCreate(false)
  }
  const handleChangeCreateProduct = (
    evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = evt.target
    setNewProduct({
      ...newProduct,
      [name as InputChange]: value,
    })
  }
  const handleCreateProduct = async () => {
    const product = await createProduct(newProduct)
    console.log({ product: product.product.category.name })

    const newItems: Category[] = [...items]
    const category = newItems.find(
      ({ name }) => name === product.product.category.name
    )
    if (category) {
      category.product.push(product.product)
      addItemsProducts(newItems)
      createAlert(`${product.product.name} agregado a ${category.name}`, false)
    } else {
      const newCategoryWithProduct: Category = {
        name: product.product.category.name,
        id: product.product.category.id,
        product: [product.product],
      }
      addItemsProducts([...newItems, newCategoryWithProduct])
      createAlert(
        `Categoria ${newCategoryWithProduct.name} creada y producto ${product.product.name} agregado.`,
        false
      )
    }
    handleChangeViewCreate()
    setNewProduct(INITIAL_STATE)
  }
  const handleViewCategory = () => {
    setTimeout(() => {
      changeView()
    }, 300)
  }
  const handleChangeCategory = (category: string) => {
    setNewProduct({
      ...newProduct,
      categoryName: category,
    })
  }
  return (
    <div className="create">
      <div className="create__div">
        <h2 className="create__title">Agregar nuevo producto</h2>
        <div className="create__inputs">
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
          <Input
            handleChange={handleChangeCreateProduct}
            value={newProduct.image}
            name="image"
            input
            label="Imagen"
            place="Ingresa URL"
          />
          <div className="create__select">
            <SelectCategory
              handleChange={handleChangeCreateProduct}
              handleBlur={handleViewCategory}
              handleFocus={handleViewCategory}
              value={newProduct.categoryName}
              name="categoryName"
              label="Categoria"
              place="Ingresar nueva categoria"
            />
            {view && (
              <ul className="create__categorys">
                {category.map(({ name, id }) => (
                  <li
                    className="create__li"
                    key={id}
                    onClick={() => handleChangeCategory(name)}
                  >
                    {name}{' '}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      <div className="create__buttons">
        <Button
          classN="button__white"
          click={handleChangeViewCreate}
          text="Cancelar"
        />
        <Button
          classN="button__yellow"
          click={handleCreateProduct}
          text="Guardar"
        />
      </div>
    </div>
  )
}
