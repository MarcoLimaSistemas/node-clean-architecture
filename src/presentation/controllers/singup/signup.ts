'use strict'

import { AddAccount } from '../../../domain/usecases/add-account'
import { badRequest, ok, serverError } from '../../helper/http-helper'
import { InvalidParamError, MissingParamError } from '../../errors'
import { Controller, EmailValidator, HttpRequest, HttpResponse } from './singup-protocols'

export class SingUpController implements Controller {
    private readonly emailValidator: EmailValidator
    private readonly addAccount: AddAccount
    constructor (emailValidator: EmailValidator, addAccount: AddAccount) {
        this.emailValidator = emailValidator
        this.addAccount = addAccount
    }

    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
            for (const filed of requiredFields) {
                if (!httpRequest.body[filed]) {
                    return badRequest(new MissingParamError(filed))
                }
            }
            const { name, email, password, passwordConfirmation } = httpRequest.body
            const emailIsValid = this.emailValidator.isValid(email)
            if (!emailIsValid) {
                return badRequest(new InvalidParamError('email'))
            }
            if (password !== passwordConfirmation) {
                return badRequest(new InvalidParamError('passwordConfirmation'))
            }
            const account = await this.addAccount.add({
                name,
                email,
                password
            })

            return ok(account)
        } catch {
            return serverError()
        }
    }
}
