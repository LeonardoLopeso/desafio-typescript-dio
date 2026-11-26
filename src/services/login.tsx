import { api } from '../api'

export interface IUser {
    id: string
    name: string
    email: string
}

export const login = async (email: string, password: string): Promise<IUser | null> => {
    const conta = await api

    if (email !== conta.email || password !== conta.password) {
        return null
    }

    return {
        id: conta.id,
        name: conta.name,
        email: conta.email
    }
}
