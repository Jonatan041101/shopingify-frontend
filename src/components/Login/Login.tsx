import { login } from '@/utils/images'
import Image from 'next/image'
import React from 'react'
import FormLogin from './FormLogin'

export default function LoginComponent() {
  return (
    <div className="login">
      <div className="login__landing">
        <h1 className="login__h3">
          Regaleria
          <span className="login__span"> Milagros</span>
        </h1>
        <Image
          src={login}
          alt="Imagen de login"
          width={500}
          height={500}
          className="login__image"
        />
        S
      </div>
      <div className="login__container">
        <FormLogin />
      </div>
    </div>
  )
}
