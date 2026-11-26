import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { AppContextProvider } from './AppContext'
import { ProtectedRoute } from './ProtectedRoute'

const renderRoute = () => render(
    <AppContextProvider>
        <MemoryRouter initialEntries={['/privada']}>
            <Routes>
                <Route path='/' element={<p>Tela de login</p>} />
                <Route path='/privada' element={<ProtectedRoute><p>Conteúdo privado</p></ProtectedRoute>} />
            </Routes>
        </MemoryRouter>
    </AppContextProvider>
)

describe('ProtectedRoute', () => {
    beforeEach(() => {
        localStorage.clear()
    })

    it('deve manter a usuária na tela de login quando não estiver logada', () => {
        renderRoute()

        expect(screen.getByText('Tela de login')).toBeInTheDocument()
        expect(screen.queryByText('Conteúdo privado')).not.toBeInTheDocument()
    })

    it('deve exibir o conteúdo quando a usuária estiver logada', () => {
        localStorage.setItem('diobank', JSON.stringify({
            login: true,
            user: { id: '1', name: 'Nathaly Souza', email: 'nath@dio.bank' }
        }))

        renderRoute()

        expect(screen.getByText('Conteúdo privado')).toBeInTheDocument()
    })
})
