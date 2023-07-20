import React from 'react'
import { IconsTypes } from '@/atoms/icons/types'
import Bottle from './Bottle'
import Cart from './Cart'
import DateI from './DateI'
import Delete from './Delete'
import Lista from './Lista'
import History from './History'
import More from './More'
import NoProducts from './NoProducts'
import Search from './Search'
import Stats from './Stats'
import Less from './Less'
import Logo from './Logo'
import Lapiz from './Lapiz'
import ArrowBack from './ArrowBack'
import Arrow from './Arrow'
import Nice from './Nice'
import Close from './Close'
import Padlock from './Padlock'
import User from './User'
import Visibility from './Visibility'

interface Props {
  icon: IconsTypes
}

export default function Icons({ icon }: Props) {
  return (
    <>
      {icon === 'bottle' && <Bottle />}
      {icon === 'close' && <Close />}
      {icon === 'arrow-back' && <ArrowBack />}
      {icon === 'nice' && <Nice />}
      {icon === 'arrow' && <Arrow />}
      {icon === 'lapiz' && <Lapiz />}
      {icon === 'cart' && <Cart />}
      {icon === 'date' && <DateI />}
      {icon === 'delete' && <Delete />}
      {icon === 'history' && <History />}
      {icon === 'list' && <Lista />}
      {icon === 'more' && <More />}
      {icon === 'no-product' && <NoProducts />}
      {icon === 'search' && <Search />}
      {icon === 'stats' && <Stats />}
      {icon === 'less' && <Less />}
      {icon === 'logo' && <Logo />}
      {icon === 'padlock' && <Padlock />}
      {icon === 'user' && <User />}
      {icon === 'visibility' && <Visibility />}
    </>
  )
}
