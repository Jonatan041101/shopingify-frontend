import React from 'react'
import AddItem from './AddItem'
import NameList from './NameList'
import ItemsList from './ItemsList'
import InputName from './InputName'

export default function ListProducts() {
  return (
    <>
      <div className="list__items">
        <AddItem />
        <NameList />
        <ItemsList />
      </div>
      <InputName />
    </>
  )
}
