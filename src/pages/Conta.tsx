import { Center, SimpleGrid, Spinner, Text } from "@chakra-ui/react"
import { Link, Navigate, useParams } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { api, IConta } from "../api"
import CardInfo from "../components/CardInfo"
import { AppContext } from "../components/AppContext"

const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' }).format(date)
}

const Conta = () => {
    const [ userData, setUserData ] = useState<IConta | null>(null)
    const { id } = useParams()
    const { user } = useContext(AppContext)

    useEffect(() => {
        const getData = async () => {
            const data = await api
            setUserData(data)
        }

        getData()
    }, [])

    if(user && id !== user.id) {
        return <Navigate to={`/conta/${user.id}`} replace />
    }
  
    return (
        <Center flexDirection='column'>
            <SimpleGrid columns={2} spacing={8} paddingTop={16}>
                {
                    userData === null ?
                    (  
                        <Center>
                            <Spinner size='xl' color='white'/>
                        </Center>
                    ) : 
                    (
                        <>
                            <CardInfo mainContent={`Bem vinda ${userData.name}`} content={formatDate(new Date())} />
                            <CardInfo mainContent='Saldo' content={`R$ ${userData.balance}`}/>
                        </>
                    )
                }
            </SimpleGrid>
            <Link to='/infoconta'>
                <Text color='white' fontSize='xl' paddingTop={8}>
                    Informações da conta
                </Text>
            </Link>
        </Center>
    )
}

export default Conta
