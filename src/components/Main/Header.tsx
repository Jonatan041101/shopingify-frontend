'use client'
import Icons from '@/atoms/icons'
import React, { useEffect } from 'react'
import { listNav } from './mapNavList'
import CounterCart from './Header/CounterCart'
import ListNavC from './Header/ListNav'
import { useBearStore } from '@/store/store'

interface Props {}

export default function Header({}: Props) {
  const { url, viewListComponent, changeUrl, changeViewListComponent } =
    useBearStore((state) => state)
  useEffect(() => {
    if (window !== undefined) {
      const url = new URL(window.location.href)
      changeUrl(url.pathname)
    }
  }, [])
  const handleViewList = () => {
    changeViewListComponent(!viewListComponent)
  }
  return (
    <div className="header">
      <div className="header__container">
        <i className="header__logo">
          <Icons icon="logo" />
        </i>
        <nav className="header__nav">
          <ul className="header__ul">
            {listNav.map((list) => (
              <ListNavC key={list.id} list={list} url={url} />
            ))}
          </ul>
        </nav>
        <button className="header__bottom" onClick={handleViewList}>
          <CounterCart />
          <i className="header__cart">
            <Icons icon="cart" />
          </i>
        </button>
      </div>
    </div>
  )
}
