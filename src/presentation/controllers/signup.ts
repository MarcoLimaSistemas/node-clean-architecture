'use strict'
import { MissingParamError } from './../errors/missing-param-error'
import { badRequest } from './../helper/http-helper'
import { HttpRequest, HttpResponse } from '../protocols/http'

export class SingUpController {
    handle (httpRequest: HttpRequest): HttpResponse {
        const requiredFields = ['name', 'email', 'password']
        for (const filed of requiredFields) {
            if (!httpRequest.body[filed]) {
                return badRequest(new MissingParamError(filed))
            }
        }
    }
}
