import { Box, Center, Input } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../components/AppContext";
import { Card } from "../components/Card";
import DButton from "../components/DButton";
import { login } from "../services/login";

const Home = () => {
    const [ email, setEmail ] = useState<string>('')
    const [ password, setPassword ] = useState<string>('')
    const { user, signIn } = useContext(AppContext)

    const validateUser = async () => {
        const loggedUser = await login(email, password)

        if(!loggedUser){
            return alert('Email ou senha inválidos')
        }

        signIn(loggedUser)
    }

    if (user) {
        return <Navigate to={`/conta/${user.id}`} replace />
    }
  
    return (
        <Box padding="25px">
            <Card>
                <Center>
                    <h1>Faça o login</h1>
                </Center>
                <Input placeholder="email" value={email} onChange={(event) => setEmail(event.target.value)} />
                <Input placeholder="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                <Center>
                    <DButton
                        onClick={validateUser}
                    />
                </Center>
            </Card>
        </Box>
    );
}

export default Home;
