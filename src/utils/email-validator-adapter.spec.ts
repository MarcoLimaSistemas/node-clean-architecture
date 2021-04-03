import { EmailValidatorAdapter } from './email-validator'
import validator from 'validator'
jest.mock('validator', () => ({
    isEmail (): Boolean {
        return true
    }
}))
describe('Email Validator adapter', () => {
    test('should return false if validator returns false', () => {
        const sut = new EmailValidatorAdapter()
        jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
        const isValid = sut.isValid('invalid_email@email.com')
        expect(isValid).toBe(false)
    })
    test('should return treu if validator returns treu', () => {
        const sut = new EmailValidatorAdapter()
        const isValid = sut.isValid('invalid_email@email.com')
        expect(isValid).toBe(true)
    })
})
