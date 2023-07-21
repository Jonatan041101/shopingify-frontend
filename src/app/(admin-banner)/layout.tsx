import Header from '@/components/Main/Header'
import List from '@/components/Main/List'
import SearchPendingHistory from '@/components/History/SearchPendingHistory'
import Alert from '@/atoms/Alert'
import ModalConfirm from '@/components/Modal/ModalConfirm'
import ShoppingCount from '@/components/Modal/ShoppingCount'

export default function RootLayout({
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
      {children}
      <List />
    </>
  )
}
