import { login } from '@/utils/images'
import Image from 'next/image'
import React from 'react'

export default function ImageLog() {
  return (
    <div className="login__img">
      <Image
        src={login}
        alt="Imagen de login"
        width={500}
        height={500}
        className="login__image"
      />
    </div>
  )
}
