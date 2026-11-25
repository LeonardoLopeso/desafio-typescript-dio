import { Button as ChakraButton } from '@chakra-ui/react'
import { MouseEventHandler, ReactNode } from 'react'

interface IButton {
  onClick: MouseEventHandler<HTMLButtonElement>
  children: ReactNode
}

export const Button = ({ onClick, children }: IButton) => {
  return (
    <ChakraButton
      onClick={onClick}
      colorScheme='teal'
      size='sm'
      width='100%'
      marginTop='5px'
    >
      {children}
    </ChakraButton>
  )
}
