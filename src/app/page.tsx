'use client'
import Button from '@/atoms/button/Button'
import Input from '@/atoms/input/Input'
import { login } from '@/utils/images'
import Image from 'next/image'
import React from 'react'

export default function page() {
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
        <form className="login__form">
          <Input
            handleChange={() => {}}
            label="Nombre de usuario"
            name="name"
            place="Usuario"
            value=""
            iconLeft="user"
            input
          />
          <Input
            handleChange={() => {}}
            label="Contraseña"
            name="categoryName"
            place="Contraseña"
            value=""
            iconLeft="padlock"
            iconRigth="visibility"
            input
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
