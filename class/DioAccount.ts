export abstract class DioAccount {
  private readonly name: string
  private readonly accountNumber: number
  private balance: number = 0
  private status: boolean = true

  constructor(name: string, accountNumber: number) {
    this.name = name
    this.accountNumber = accountNumber
  }

  getName(): string {
    return this.name
  }

  getAccountNumber(): number {
    return this.accountNumber
  }

  getBalance(): number {
    return this.balance
  }

  deposit(value: number): void {
    this.credit(value)
  }

  withdraw(value: number): void {
    this.validateStatus()
    this.validateAmount(value)

    if (this.balance <= value) {
      throw new Error('Saldo insuficiente')
    }

    this.balance -= value
  }

  protected credit(value: number): void {
    this.validateStatus()
    this.validateAmount(value)
    this.balance += value
  }

  private validateStatus(): void {
    if (!this.status) {
      throw new Error('Conta inválida')
    }
  }

  private validateAmount(value: number): void {
    if (!Number.isFinite(value) || value <= 0) {
      throw new Error('Valor deve ser maior que zero')
    }
  }
}
