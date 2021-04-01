'use strict'
import { Controller } from './../protocols/controller'
import { MissingParamError } from './../errors/missing-param-error'
import { badRequest } from './../helper/http-helper'
import { HttpRequest, HttpResponse } from '../protocols/http'

export class SingUpController implements Controller {
    handle (httpRequest: HttpRequest): HttpResponse {
        const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
        for (const filed of requiredFields) {
            if (!httpRequest.body[filed]) {
                return badRequest(new MissingParamError(filed))
            }
        }
    }
}
