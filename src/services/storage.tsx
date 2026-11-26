import { IUser } from './login'

export interface IDioBank {
    login: boolean
    user?: IUser
}

const STORAGE_KEY = 'diobank'

const dioBank: IDioBank = {
    login: false
}

export const getAllLocalStorage = (): string | null => {
    return localStorage.getItem(STORAGE_KEY)
}

export const getStoredSession = (): IDioBank | null => {
    const storage = getAllLocalStorage()

    if (!storage) {
        return null
    }

    try {
        return JSON.parse(storage) as IDioBank
    } catch {
        return null
    }
}

export const createLocalStorage = (): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dioBank))
}

export const changeLocalStorage = (dioBank: IDioBank): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dioBank))
}
