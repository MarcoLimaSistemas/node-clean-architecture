'use strict'
import { MissingParamError } from './../errors/missing-param-error'
import { badRequest } from './../helper/http-helper'
import { HttpRequest, HttpResponse } from '../protocols/http'

export class SingUpController {
    handle (httpRequest: HttpRequest): HttpResponse {
        if (!httpRequest.body.name) {
            return badRequest(new MissingParamError('name'))
        }
        if (!httpRequest.body.email) {
            return badRequest(new MissingParamError('email'))
        }
    }
}
