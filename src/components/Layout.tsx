import { ReactNode } from 'react'
import { Footer } from './Footer'
import { Header } from './Header/Header'

interface ILayout {
  children: ReactNode
}

export const Layout = ({ children }: ILayout) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
