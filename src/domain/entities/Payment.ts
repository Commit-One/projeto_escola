import { StatusPayment } from "../../utils/enum/payment";
import { IBaseProps } from "../contracts/IBaseProps";
import { Base } from "./Base";

export class Payment extends Base {
  public monthlyValue: number = 0;
  public datePayment: Date = new Date();

  constructor(
    public studentUuid: string,
    public schoolUuid: string,
    public annualValue: number,
    public referenceMonth: number,
    public referenceDay: number,
    public referenceYear: number,
    public status: StatusPayment = StatusPayment.PENDING,
    public discountApplied: boolean,
    public discount: number = 0, // Percentual
    baseProps?: IBaseProps,
  ) {
    super(baseProps);
    this.calculateMonthlyValue(this.discount);
    this.datePayment = new Date(
      this.referenceDay,
      this.referenceMonth,
      this.referenceYear,
    );
  }

  private getRemainingMonths(): number {
    const month = new Date().getMonth() + 1;
    return Math.max(1, 12 - month + 1);
  }

  private calculateMonthlyValue(discount: number): number {
    const remainingMonths = this.getRemainingMonths();

    const valueDefault = Number(this.annualValue);
    const valueWithDiscountApplied = this.discountApplied
      ? valueDefault - (valueDefault * discount) / 100
      : valueDefault;

    const monthlyValue = valueWithDiscountApplied / remainingMonths;

    this.monthlyValue = Number(monthlyValue.toFixed(2));

    return this.monthlyValue;
  }
}
