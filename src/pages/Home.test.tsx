import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { AppContextProvider } from '../components/AppContext'
import { login } from '../services/login'
import Home from './Home'

jest.mock('../services/login', () => ({
    login: jest.fn()
}))

const mockLogin = login as jest.MockedFunction<typeof login>
const user = { id: '1', name: 'Nathaly Souza', email: 'nath@dio.bank' }

const renderHome = () => render(
    <AppContextProvider>
        <MemoryRouter initialEntries={['/']}>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/conta/:id' element={<p>Página da conta</p>} />
            </Routes>
        </MemoryRouter>
    </AppContextProvider>
)

const fillForm = (email: string, password: string) => {
    fireEvent.change(screen.getByPlaceholderText('email'), { target: { value: email } })
    fireEvent.change(screen.getByPlaceholderText('password'), { target: { value: password } })
    fireEvent.click(screen.getByRole('button', { name: 'Entrar' }))
}

describe('Home', () => {
    const mockAlert = jest.fn()

    beforeEach(() => {
        localStorage.clear()
        mockLogin.mockReset()
        mockAlert.mockClear()
        window.alert = mockAlert
    })

    it('deve validar o email e a senha informados', async () => {
        mockLogin.mockResolvedValue(user)
        renderHome()

        fillForm(user.email, '123456')

        expect(await screen.findByText('Página da conta')).toBeInTheDocument()
        expect(mockLogin).toHaveBeenCalledWith(user.email, '123456')
    })

    it('deve exibir um alerta quando email ou senha forem inválidos', async () => {
        mockLogin.mockResolvedValue(null)
        renderHome()

        fillForm(user.email, 'senha-errada')

        await waitFor(() => expect(mockAlert).toHaveBeenCalledWith('Email ou senha inválidos'))
        expect(screen.getByText('Faça o login')).toBeInTheDocument()
    })

    it('deve redirecionar para a conta após login válido', async () => {
        mockLogin.mockResolvedValue(user)
        renderHome()

        fillForm(user.email, '123456')

        expect(await screen.findByText('Página da conta')).toBeInTheDocument()
    })

    it('não deve exibir a tela de login quando os dados do usuário existirem no localStorage', () => {
        localStorage.setItem('diobank', JSON.stringify({ login: true, user }))

        renderHome()

        expect(screen.queryByText('Faça o login')).not.toBeInTheDocument()
        expect(screen.getByText('Página da conta')).toBeInTheDocument()
    })
})
