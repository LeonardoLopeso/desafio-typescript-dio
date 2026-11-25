import { Box, Center, Input } from '@chakra-ui/react'
import { login } from '../../services/login'
import { Button } from '../Button/Button'

export const Card = () => {
  return (
    <Box backgroundColor='#FFFFFF' borderRadius='25px' padding='15px'>
      <Center>
        <h1>Faça o login</h1>
      </Center>
      <Input placeholder='email' type='email' />
      <Input placeholder='password' type='password' />
      <Center>
        <Button onClick={login}>Entrar</Button>
      </Center>
    </Box>
  )
}
