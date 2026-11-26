import { Box } from "@chakra-ui/react"
import { ReactNode } from "react"
import { Header } from "./Header"

export const Layout = ({ children }: { children: ReactNode }) => {
  return(
    <Box minHeight='100vh' backgroundColor='#9413dc' >
      <Header />
      { children }
    </Box>
  )
}
