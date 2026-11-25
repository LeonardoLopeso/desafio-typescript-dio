import { fireEvent, render, screen } from '@testing-library/react'
import { WELCOME_MESSAGE } from '../../services/login'
import { Card } from './Card'

describe('Card', () => {
    const mockAlert = jest.fn()

    beforeEach(() => {
        window.alert = mockAlert
        mockAlert.mockClear()
    })

    it('deve renderizar o formulário de login', () => {
        render(<Card />)

        expect(screen.getByPlaceholderText('email')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('password')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Entrar' })).toBeInTheDocument()
    })

    it('deve exibir a mensagem de boas vindas ao clicar em Entrar', () => {
        render(<Card />)

        fireEvent.click(screen.getByRole('button', { name: 'Entrar' }))

        expect(mockAlert).toHaveBeenCalledWith(WELCOME_MESSAGE)
    })
})
