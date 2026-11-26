import { Center, SimpleGrid, Text } from "@chakra-ui/react"
import { useContext } from "react"
import { Link } from "react-router-dom"
import { AppContext } from "../components/AppContext"
import CardInfo from "../components/CardInfo"

const ContaInfo = () => {
    const { user } = useContext(AppContext)

    if (!user) {
        return null
    }

    return (
        <Center flexDirection='column'>
            <Text color='white' fontSize='3xl' fontWeight='bold' paddingTop={16}>
                Informações da conta
            </Text>
            <SimpleGrid columns={2} spacing={8} paddingTop={8}>
                <CardInfo mainContent='Nome' content={user.name} />
                <CardInfo mainContent='Email' content={user.email} />
            </SimpleGrid>
            <Link to={`/conta/${user.id}`}>
                <Text color='white' fontSize='xl' paddingTop={8}>
                    Voltar para a conta
                </Text>
            </Link>
        </Center>
    )
}

export default ContaInfo
