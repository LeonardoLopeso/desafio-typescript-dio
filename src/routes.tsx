import { Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from './components/ProtectedRoute'
import Conta from './pages/Conta'
import ContaInfo from './pages/ContaInfo'
import Home from './pages/Home'

const MainRoutes = () => {
    return(
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/conta/:id' element={<ProtectedRoute><Conta /></ProtectedRoute>} />
            <Route path='/infoconta' element={<ProtectedRoute><ContaInfo /></ProtectedRoute>} />
        </Routes>
    )
}

export default MainRoutes
