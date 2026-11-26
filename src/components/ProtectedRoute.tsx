import { ReactElement, useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AppContext } from './AppContext'

export const ProtectedRoute = ({ children }: { children: ReactElement }) => {
    const { isLoggedIn } = useContext(AppContext)

    return isLoggedIn ? children : <Navigate to='/' replace />
}
