'use strict'

import { badRequest, serverError } from './../helper/http-helper'
import { InvalidParamError, MissingParamError } from '../errors'
import { Controller, EmailValidator, HttpRequest, HttpResponse } from '../protocols'

export class SingUpController implements Controller {
    private readonly emailValidator: EmailValidator
    constructor (emailValidator: EmailValidator) {
        this.emailValidator = emailValidator
    }

    handle (httpRequest: HttpRequest): HttpResponse {
        try {
            const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
            for (const filed of requiredFields) {
                if (!httpRequest.body[filed]) {
                    return badRequest(new MissingParamError(filed))
                }
            }
            const emailIsValid = this.emailValidator.isValid(httpRequest.body.email)
            if (!emailIsValid) {
                return badRequest(new InvalidParamError('email'))
            }
            if (httpRequest.body.password !== httpRequest.body.passwordConfirmation) {
                return badRequest(new InvalidParamError('passwordConfirmation'))
            }
        } catch {
            return serverError()
        }
    }
}
