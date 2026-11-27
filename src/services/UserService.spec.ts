import { User, UserService } from "./UserService";

describe('UserService', () => {
    let mockDb: User[]
    let userService: UserService

    beforeEach(() => {
        mockDb = []
        userService = new UserService(mockDb)
        jest.spyOn(global.console, 'log').mockImplementation(() => undefined)
    })

    afterEach(() => {
        jest.restoreAllMocks()
    })

    it('Deve adicionar um novo usuário', () => {
        userService.createUser('nath', 'nath@test.com');
        expect(console.log).toHaveBeenCalledWith('DB atualizado', mockDb)
        expect(mockDb).toEqual([{ name: 'nath', email: 'nath@test.com' }])
    })

    it('Deve retornar todos os usuários', () => {
        userService.createUser('nath', 'nath@test.com');
        expect(userService.getAllUsers()).toEqual([{ name: 'nath', email: 'nath@test.com' }])
    })

    it('Deve deletar o usuário pelo email', () => {
        userService.createUser('nath', 'nath@test.com');
        userService.createUser('joana', 'joana@test.com');

        const deleted = userService.deleteUser('nath@test.com')

        expect(deleted).toBe(true)
        expect(mockDb).toEqual([{ name: 'joana', email: 'joana@test.com' }])
        expect(console.log).toHaveBeenCalledWith('DB atualizado', mockDb)
    })

    it('Deve retornar false ao tentar deletar um usuário inexistente', () => {
        userService.createUser('nath', 'nath@test.com');

        const deleted = userService.deleteUser('naoexiste@test.com')

        expect(deleted).toBe(false)
        expect(mockDb).toHaveLength(1)
    })
})
