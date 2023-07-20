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
        <div className="login__img">
          <Image
            src={login}
            alt="Imagen de login"
            width={500}
            height={500}
            className="login__image"
          />
        </div>
      </div>
      <div className="login__container">
        <FormLogin />
      </div>
    </div>
  )
}
