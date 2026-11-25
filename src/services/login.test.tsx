import { login, WELCOME_MESSAGE } from './login'

describe('login', () => {
    const mockAlert = jest.fn()

    beforeEach(() => {
        window.alert = mockAlert
        mockAlert.mockClear()
    })

    it('deve exibir um alert com a mensagem de boas vindas', () => {
        login()
        expect(mockAlert).toHaveBeenCalledTimes(1)
        expect(mockAlert).toHaveBeenCalledWith(WELCOME_MESSAGE)
    })
})
