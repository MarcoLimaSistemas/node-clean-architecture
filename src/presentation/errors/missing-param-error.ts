export class MissingParamError extends Error {
    constructor (paraName: string) {
        super(`Missing param: ${paraName}`)
        this.name = 'MissingParamError'
    }
}
