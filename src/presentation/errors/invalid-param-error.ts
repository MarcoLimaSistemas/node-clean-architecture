export class InvalidParamError extends Error {
    constructor (paraName: string) {
        super(`Missing param: ${paraName}`)
        this.name = 'InvalidParamError'
    }
}
