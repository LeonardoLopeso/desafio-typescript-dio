import { login } from './login'

jest.mock('../api', () => ({
    api: Promise.resolve({
        email: 'nath@dio.bank',
        password: '123456',
        name: 'Nathaly Souza',
        balance: 2000.00,
        id: '1'
    })
}))

describe('login', () => {
    const mockEmail = 'nath@dio.bank'
    const mockPassword = '123456'

    it('deve retornar os dados do usuário quando email e senha forem válidos', async () => {
        const response = await login(mockEmail, mockPassword)

        expect(response).toEqual({
            id: '1',
            name: 'Nathaly Souza',
            email: mockEmail
        })
    })

    it('não deve expor a senha nos dados retornados', async () => {
        const response = await login(mockEmail, mockPassword)

        expect(response).not.toHaveProperty('password')
    })

    it('deve retornar null quando o email for inválido', async () => {
        const response = await login('email@invalido.com', mockPassword)

        expect(response).toBeNull()
    })

    it('deve retornar null quando a senha for inválida', async () => {
        const response = await login(mockEmail, 'senha-errada')

        expect(response).toBeNull()
    })

    it('deve retornar null quando a senha não for informada', async () => {
        const response = await login(mockEmail, '')

        expect(response).toBeNull()
    })
})
