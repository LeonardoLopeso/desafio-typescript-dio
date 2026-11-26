import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AppContextProvider } from '../components/AppContext'
import ContaInfo from './ContaInfo'

describe('ContaInfo', () => {
    beforeEach(() => {
        localStorage.setItem('diobank', JSON.stringify({
            login: true,
            user: { id: '1', name: 'Nathaly Souza', email: 'nath@dio.bank' }
        }))
    })

    afterEach(() => {
        localStorage.clear()
    })

    it('deve exibir o nome e o email da usuária logada', () => {
        render(
            <AppContextProvider>
                <MemoryRouter>
                    <ContaInfo />
                </MemoryRouter>
            </AppContextProvider>
        )

        expect(screen.getByText('Nathaly Souza')).toBeInTheDocument()
        expect(screen.getByText('nath@dio.bank')).toBeInTheDocument()
    })
})
