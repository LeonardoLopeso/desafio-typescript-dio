import { UserController } from "./UserController";
import { UserService } from '../services/UserService'
import { Request } from 'express'
import { makeMockResponse } from "../__mocks__/mockResponse.mock";
import { makeMockRequest } from "../__mocks__/mockRequest.mock";

describe('UserController', () => {
    const mockUserService: Partial<UserService> = {
        createUser: jest.fn(),
        getAllUsers: jest.fn().mockReturnValue([]),
        deleteUser: jest.fn()
    }
    
    const userController = new UserController(mockUserService as UserService);

    describe('createUser', () => {
        it('Deve adicionar um novo usuário', () => {
            const mockRequest = {
                body: {
                    name: 'Nath',
                    email: 'nath@test.com'
                }
            } as Request
            const mockResponse = makeMockResponse()
            userController.createUser(mockRequest, mockResponse)
            expect(mockResponse.state.status).toBe(201)
            expect(mockResponse.state.json).toMatchObject({ message: 'Usuário criado' })
            expect(mockUserService.createUser).toHaveBeenCalledWith('Nath', 'nath@test.com')
        })

        it('Deve retornar erro caso o usuário não informe o name', () => {
            const mockRequest = {
                body: {
                    email: 'nath@test.com'
                }
            } as Request
            const mockResponse = makeMockResponse()
            userController.createUser(mockRequest, mockResponse)
            expect(mockResponse.state.status).toBe(400)
            expect(mockResponse.state.json).toMatchObject({ message: 'Bad request! Name obrigatório' })
            expect(mockUserService.createUser).not.toHaveBeenCalled()
        })

        it('Deve retornar erro caso o usuário não informe o email', () => {
            const mockRequest = {
                body: {
                    name: 'Nath'
                }
            } as Request
            const mockResponse = makeMockResponse()
            userController.createUser(mockRequest, mockResponse)
            expect(mockResponse.state.status).toBe(400)
            expect(mockResponse.state.json).toMatchObject({ message: 'Bad request! Email obrigatório' })
            expect(mockUserService.createUser).not.toHaveBeenCalled()
        })
    })

    describe('getAllUsers', () => {
        it('Deve chamar a função getAllUsers e retornar os usuários', () => {
            const users = [{ name: 'Nath', email: 'nath@test.com' }]
            ;(mockUserService.getAllUsers as jest.Mock).mockReturnValueOnce(users)
            const mockRequest = makeMockRequest({})
            const mockResponse = makeMockResponse()
            userController.getAllUsers(mockRequest, mockResponse)
            expect(mockUserService.getAllUsers).toHaveBeenCalledTimes(1)
            expect(mockResponse.state.status).toBe(200)
            expect(mockResponse.state.json).toEqual(users)
        })
    })

    describe('deleteUser', () => {
        it('Deve deletar o usuário pelo email', () => {
            ;(mockUserService.deleteUser as jest.Mock).mockReturnValueOnce(true)
            const mockRequest = {
                body: {
                    email: 'nath@test.com'
                }
            } as Request
            const mockResponse = makeMockResponse()
            userController.deleteUser(mockRequest, mockResponse)
            expect(mockUserService.deleteUser).toHaveBeenCalledWith('nath@test.com')
            expect(mockResponse.state.status).toBe(200)
            expect(mockResponse.state.json).toMatchObject({ message: 'Usuário deletado' })
        })

        it('Deve retornar erro caso o email não seja informado', () => {
            const mockRequest = {
                body: {}
            } as Request
            const mockResponse = makeMockResponse()
            userController.deleteUser(mockRequest, mockResponse)
            expect(mockResponse.state.status).toBe(400)
            expect(mockResponse.state.json).toMatchObject({ message: 'Bad request! Email obrigatório' })
            expect(mockUserService.deleteUser).not.toHaveBeenCalled()
        })

        it('Deve retornar 404 caso o usuário não exista', () => {
            ;(mockUserService.deleteUser as jest.Mock).mockReturnValueOnce(false)
            const mockRequest = {
                body: {
                    email: 'naoexiste@test.com'
                }
            } as Request
            const mockResponse = makeMockResponse()
            userController.deleteUser(mockRequest, mockResponse)
            expect(mockResponse.state.status).toBe(404)
            expect(mockResponse.state.json).toMatchObject({ message: 'Usuário não encontrado' })
        })
    })
})
