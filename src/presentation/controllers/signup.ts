'use strict'
import { InvalidParamError } from './../errors/invalid-param-error'
import { EmailValidator } from './../protocols/email-validator'
import { Controller } from './../protocols/controller'
import { MissingParamError } from './../errors/missing-param-error'
import { badRequest } from './../helper/http-helper'
import { HttpRequest, HttpResponse } from '../protocols/http'

export class SingUpController implements Controller {
    private readonly emailValidator: EmailValidator
    constructor (emailValidator: EmailValidator) {
        this.emailValidator = emailValidator
    }

    handle (httpRequest: HttpRequest): HttpResponse {
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
    }
}
