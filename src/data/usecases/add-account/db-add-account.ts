import { AddAccountRepository } from './../../protocols/add-account-repository'
import { AccountModel, AddAccount, AddAccountModel, Encrypter } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
    private readonly encrypter: Encrypter
    private readonly addAccountRepository: AddAccountRepository
    constructor (encrypter: Encrypter, addAccountRepository: AddAccountRepository) {
        this.encrypter = encrypter
        this.addAccountRepository = addAccountRepository
    }

    async add (account: AddAccountModel): Promise<AccountModel> {
        const hashedPassword = await this.encrypter.encrypt(account.password)
        await this.addAccountRepository.add({ ...account, password: hashedPassword })
        return await new Promise(resolve => resolve(null))
    }
}
