'use client'
import React from 'react'
import { ListNav } from '../types'
import Icons from '@/atoms/icons'
import Link from 'next/link'
import { useBearStore } from '@/store/store'
interface Props {
  list: ListNav
  url: string
}
export default function ListNavC({ list, url }: Props) {
  const { changeUrl } = useBearStore((state) => state)
  const handleChangeUrl = () => {
    changeUrl(list.path)
  }
  return (
    <Link href={list.path} className="header__link" onClick={handleChangeUrl}>
      <li className="header__li">
        {url === list.path && <div className="header__select" />}
        <div className="header__title">{list.name}</div>
        <i className="header__icon">
          <Icons icon={list.icon} />
        </i>
      </li>
    </Link>
  )
}
