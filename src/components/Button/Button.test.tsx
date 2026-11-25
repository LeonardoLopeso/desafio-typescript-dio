import { fireEvent, render, screen } from '@testing-library/react'
import { Button } from './Button'

describe('Button', () => {
    it('deve chamar o onClick ao ser clicado', () => {
        const onClick = jest.fn()
        render(<Button onClick={onClick}>Entrar</Button>)

        fireEvent.click(screen.getByRole('button', { name: 'Entrar' }))

        expect(onClick).toHaveBeenCalledTimes(1)
    })
})
