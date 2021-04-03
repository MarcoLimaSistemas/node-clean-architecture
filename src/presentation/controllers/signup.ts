'use strict'

import { EmailValidator } from './../protocols/email-validator'
import { Controller } from './../protocols/controller'

import { badRequest, serverError } from './../helper/http-helper'
import { HttpRequest, HttpResponse } from '../protocols/http'
import { InvalidParamError, MissingParamError } from '../errors'

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
        } catch {
            return serverError()
        }
    }
}
