import { RouterNames } from '@/utils/storage/enums'
import { useRouter } from 'next/navigation'

export default function useRouting() {
  const router = useRouter()
  const handleRouter = (route: RouterNames) => {
    router.push(route)
  }
  return {
    handleRouter,
  }
}
