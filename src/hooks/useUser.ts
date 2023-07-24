import { useBearStore } from '@/store/store'
import { Login } from '@/types/api-types'
import { loginQuery } from '@/utils/api/loginApi'
import { RouterNames, Storage } from '@/utils/storage/enums'
import { useEffect, useState } from 'react'
import useRouting from './useRouting'

export default function useUser() {
  const { changeUser, changeLoaderUser } = useBearStore((state) => state)
  const { handleRouter } = useRouting()
  const [errFetch, setErrFetch] = useState<string>('')
  useEffect(() => {
    const USER = window.localStorage.getItem(Storage['USER'])
    if (USER) {
      const keepSession = async () => {
        try {
          const parseUser: Login = JSON.parse(USER)
          const user = await loginQuery(parseUser)
          if ('user' in user.user) {
            handleRouter(RouterNames.HOME)
            changeUser(user.user)
          }
          setTimeout(() => changeLoaderUser(false), 1500)
        } catch (error) {
          const ERROR = error as Error
          setErrFetch(ERROR.message)
          handleRouter(RouterNames.LOGIN)
          setTimeout(() => setErrFetch(''), 3000)
        }
      }
      keepSession()
    } else {
      handleRouter(RouterNames.LOGIN)
      setTimeout(() => changeLoaderUser(false), 1500)
    }
  }, [])
  return {
    errFetch,
  }
}
