import { BonusAccount } from './class/BonusAccount'
import { CompanyAccount } from './class/CompanyAccount'
import { DioAccount } from './class/DioAccount'
import { PeopleAccount } from './class/PeopleAccount'

const run = (description: string, operation: () => void): void => {
  try {
    operation()
    console.log(`✔ ${description}`)
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.log(`✘ ${description}: ${message}`)
  }
}

const printSummary = (account: DioAccount): void => {
  console.log(
    `[${account.constructor.name}] ${account.getName()} (nº ${account.getAccountNumber()}) - saldo: ${account.getBalance()}\n`
  )
}

const peopleAccount = new PeopleAccount(1, 'Nath', 10)
console.log(`Documento: ${peopleAccount.getDocId()}`)
run('Depósito de 100', () => peopleAccount.deposit(100))
run('Saque de 30', () => peopleAccount.withdraw(30))
run('Saque de 70 (igual ao saldo)', () => peopleAccount.withdraw(70))
run('Depósito de -50', () => peopleAccount.deposit(-50))
printSummary(peopleAccount)

const companyAccount = new CompanyAccount('DIO', 20)
run('Empréstimo de 1000', () => companyAccount.getLoan(1000))
run('Depósito de 500', () => companyAccount.deposit(500))
run('Saque de 200', () => companyAccount.withdraw(200))
printSummary(companyAccount)

const bonusAccount = new BonusAccount('Leo', 30)
run('Depósito de 100 (+10 de bônus)', () => bonusAccount.deposit(100))
run('Saque de 50', () => bonusAccount.withdraw(50))
run('Saque de 100', () => bonusAccount.withdraw(100))
printSummary(bonusAccount)
