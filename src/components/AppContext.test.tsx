import { act, render, screen } from '@testing-library/react'
import { useContext } from 'react'
import { AppContext, AppContextProvider } from './AppContext'

const user = { id: '1', name: 'Nathaly Souza', email: 'nath@dio.bank' }

const Consumer = () => {
    const { user: currentUser, isLoggedIn, signIn, signOut } = useContext(AppContext)

    return (
        <>
            <span data-testid='status'>{ isLoggedIn ? 'logado' : 'deslogado' }</span>
            <span data-testid='user'>{ currentUser?.name ?? '' }</span>
            <button onClick={() => signIn(user)}>entrar</button>
            <button onClick={signOut}>sair</button>
        </>
    )
}

const renderWithProvider = () => render(
    <AppContextProvider>
        <Consumer />
    </AppContextProvider>
)

describe('AppContext', () => {
    beforeEach(() => {
        localStorage.clear()
    })

    it('deve iniciar deslogado quando não houver dados no localStorage', () => {
        renderWithProvider()

        expect(screen.getByTestId('status')).toHaveTextContent('deslogado')
    })

    it('deve iniciar logado quando os dados do usuário existirem no localStorage', () => {
        localStorage.setItem('diobank', JSON.stringify({ login: true, user }))

        renderWithProvider()

        expect(screen.getByTestId('status')).toHaveTextContent('logado')
        expect(screen.getByTestId('user')).toHaveTextContent(user.name)
    })

    it('deve logar e salvar os dados do usuário no localStorage', () => {
        renderWithProvider()

        act(() => screen.getByText('entrar').click())

        expect(screen.getByTestId('status')).toHaveTextContent('logado')
        expect(JSON.parse(localStorage.getItem('diobank') as string)).toEqual({ login: true, user })
    })

    it('deve deslogar e remover os dados do usuário do localStorage', () => {
        localStorage.setItem('diobank', JSON.stringify({ login: true, user }))
        renderWithProvider()

        act(() => screen.getByText('sair').click())

        expect(screen.getByTestId('status')).toHaveTextContent('deslogado')
        expect(JSON.parse(localStorage.getItem('diobank') as string)).toEqual({ login: false })
    })
})
