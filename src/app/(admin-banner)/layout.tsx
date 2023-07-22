import Header from '@/components/Main/Header'
import List from '@/components/Main/List'
import SearchPendingHistory from '@/components/History/SearchPendingHistory'
import Alert from '@/atoms/Alert'
import ModalConfirm from '@/components/Modal/ModalConfirm'
import ShoppingCount from '@/components/Modal/ShoppingCount'
import Dolar from '@/components/Dolar'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <Alert />
      <ModalConfirm />
      <ShoppingCount />
      <SearchPendingHistory />
      <Dolar />
      {children}
      <List />
    </>
  )
}
