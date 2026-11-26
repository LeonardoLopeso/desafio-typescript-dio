import { createContext, ReactNode, useState } from 'react'
import { IUser } from '../services/login'
import { changeLocalStorage, getStoredSession } from '../services/storage'

interface IAppContext {
    user: IUser | null
    isLoggedIn: boolean
    signIn: (user: IUser) => void
    signOut: () => void
}

export const AppContext = createContext({} as IAppContext)

const getInitialUser = (): IUser | null => {
    const session = getStoredSession()

    return session?.login && session.user ? session.user : null
}

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
    const [ user, setUser ] = useState<IUser | null>(getInitialUser)

    const signIn = (user: IUser) => {
        changeLocalStorage({ login: true, user })
        setUser(user)
    }

    const signOut = () => {
        changeLocalStorage({ login: false })
        setUser(null)
    }

    return (
        <AppContext.Provider value={{ user, isLoggedIn: user !== null, signIn, signOut }}>
            { children }
        </AppContext.Provider>
    )
}
