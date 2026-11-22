import { DioAccount } from './DioAccount'

const DEPOSIT_BONUS = 10

export class BonusAccount extends DioAccount {
  deposit(value: number): void {
    super.deposit(value + DEPOSIT_BONUS)
  }
}
