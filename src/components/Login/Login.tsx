'use client'
import Button from '@/atoms/button/Button'
import Input from '@/atoms/input/Input'
import { useBearStore } from '@/store/store'
import { Login } from '@/types/api-types'
import { EventForm, EventInput } from '@/types/events'
import { UserNonPassword } from '@/types/model'
import { loginQuery } from '@/utils/api/loginApi'
import { login } from '@/utils/images'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useRef, useState } from 'react'

const INITIAL_STATE: Login = {
  user: '',
  password: '',
}
export default function Login() {
  const [loginText, setLoginText] = useState<Login>(INITIAL_STATE)
  const [err, setErr] = useState<string>('')
  const refErr = useRef<NodeJS.Timeout>()
  const { changeUser } = useBearStore((state) => state)
  const router = useRouter()
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
      const { password, ...resUser } = user.user
      const newUser: UserNonPassword = {
        ...resUser,
      }
      changeUser(newUser)
      router.push('/home')
    } catch (error) {
      const ERROR = error as Error
      setErr(ERROR.message)
      clearInterval(refErr.current)
      refErr.current = setTimeout(() => setErr(''), 3500)
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
          {err.length > 0 && <span className="login__err">{err}</span>}
        </form>
      </div>
    </div>
  )
}
