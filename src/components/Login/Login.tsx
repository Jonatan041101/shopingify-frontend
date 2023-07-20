'use client'
import Button from '@/atoms/button/Button'
import Input from '@/atoms/input/Input'
import { Login } from '@/types/api-types'
import { EventForm, EventInput } from '@/types/events'
import { loginQuery } from '@/utils/api/loginApi'
import { login } from '@/utils/images'
import Image from 'next/image'
import React, { useState } from 'react'

const INITIAL_STATE: Login = {
  user: '',
  password: '',
}
export default function Login() {
  const [loginText, setLoginText] = useState<Login>(INITIAL_STATE)
  const handleChange = (evt: EventInput) => {
    const { name, value } = evt.target
    if (name === 'password' || name === 'user') {
      setLoginText({
        ...loginText,
        [name]: value,
      })
    }
  }
  const handleSubmit = async (evt: EventForm) => {
    evt.preventDefault()
    try {
      const user = await loginQuery(loginText)
      console.log({ user })
    } catch (error) {
      console.log({ error })
    }
  }
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
      </div>
      <div className="login__container">
        <form className="login__form" onSubmit={handleSubmit}>
          <Input
            handleChange={handleChange}
            label="Nombre de usuario"
            name="user"
            place="Usuario"
            value={loginText.user}
            iconLeft="user"
            input
          />
          <Input
            handleChange={handleChange}
            label="Contraseña"
            name="password"
            place="Contraseña"
            value={loginText.password}
            iconLeft="padlock"
            iconRigth="visibility"
            input
            type="password"
          />
          <Button
            click={() => {}}
            classN="button__yellow"
            text="Iniciar Sesion"
            classNIcon="button__color"
          />
        </form>
      </div>
    </div>
  )
}
