import { render, screen } from '@testing-library/react'
import { Header } from './Header'

describe('Header', () => {
    it('deve exibir o título padrão da aplicação', () => {
        render(<Header />)
        expect(screen.getByRole('heading', { name: 'Dio Bank' })).toBeInTheDocument()
    })

    it('deve exibir o título informado via props', () => {
        render(<Header title='Outro título' />)
        expect(screen.getByRole('heading', { name: 'Outro título' })).toBeInTheDocument()
    })
})
