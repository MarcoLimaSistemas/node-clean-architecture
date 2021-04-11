import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrytp-adapter'
jest.mock('bcrypt', () => ({
    async hash (): Promise<string> {
        return await new Promise(resolve => resolve('hash'))
    }
}))
const makeSut = (): BcryptAdapter => {
    const salt = 12
    const sut = new BcryptAdapter(salt)
    return sut
}
describe('Bcrypt Adapter', () => {
    test('should call bcrypt with correct value', async () => {
        const sut = makeSut()
        const hashSpy = jest.spyOn(bcrypt, 'hash')
        await sut.encrypt('any_value')
        expect(hashSpy).toHaveBeenCalledWith('any_value', 12)
    })
    test('should return a hash on success', async () => {
        const sut = makeSut()
        const hash = await sut.encrypt('any_value')
        expect(hash).toBe('hash')
    })
    test('should throw if bcrypt throws', async () => {
        const sut = makeSut()
        jest.spyOn(bcrypt, 'hash').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
        const promisse = sut.encrypt('any_value')
        await expect(promisse).rejects.toThrow()
    })
})
