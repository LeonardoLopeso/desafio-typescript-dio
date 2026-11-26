import { changeLocalStorage, createLocalStorage, getAllLocalStorage, getStoredSession } from "./storage"

const dioBank = {
    login: false
}

const user = { id: '1', name: 'Nathaly Souza', email: 'nath@dio.bank' }

describe('storage', () => {
    const mockSetItem = jest.spyOn(Storage.prototype, 'setItem')

    beforeEach(() => {
        localStorage.clear()
    })

    it('Deve retornar o objeto no localStorage com a chave diobank', () => {
        const mockGetItem = jest.spyOn(Storage.prototype, 'getItem')
        getAllLocalStorage()
        expect(mockGetItem).toHaveBeenCalledWith('diobank')
    })

    it('Deve criar o objeto no localStorage', () => {
        createLocalStorage()
        expect(mockSetItem).toHaveBeenCalledWith('diobank', JSON.stringify(dioBank))
    })

    it('Deve alterar o valor do objeto no localStorage', () => {
        changeLocalStorage(dioBank)
        expect(mockSetItem).toHaveBeenCalledWith('diobank', JSON.stringify(dioBank))
    })

    it('Deve salvar os dados do usuário no localStorage ao logar', () => {
        changeLocalStorage({ login: true, user })
        expect(mockSetItem).toHaveBeenCalledWith('diobank', JSON.stringify({ login: true, user }))
    })

    describe('getStoredSession', () => {
        beforeEach(() => {
            jest.restoreAllMocks()
        })

        it('Deve retornar a sessão salva no localStorage', () => {
            changeLocalStorage({ login: true, user })
            expect(getStoredSession()).toEqual({ login: true, user })
        })

        it('Deve retornar null quando não houver sessão salva', () => {
            expect(getStoredSession()).toBeNull()
        })

        it('Deve retornar null quando o conteúdo salvo for inválido', () => {
            localStorage.setItem('diobank', 'conteudo-invalido')
            expect(getStoredSession()).toBeNull()
        })
    })
})
