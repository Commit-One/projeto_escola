import { StatusPayment } from "../../utils/enum/payment";
import { IBaseProps } from "../contracts/IBaseProps";
import { Base } from "./Base";

export class Payment extends Base {
  public currentValueDiscountApplied: number = 0;

  constructor(
    public studentUuid: string,
    public schoolUuid: string,
    public valueDefault: number,
    public referenceMonth: number,
    public referenceDay: number,
    public referenceYear: number,
    public status: StatusPayment = StatusPayment.PENDING,
    public discountApplied: boolean,
    public discount: number = 0, // Percentual
    baseProps?: IBaseProps,
  ) {
    super(baseProps);

    this.currentValueDiscountApplied = this.valueDefault;
    if (this.discountApplied) this.calculateDiscount(this.discount);
  }

  private calculateDiscount(discount: number): number {
    const currentMonth = new Date().getMonth() + 1;
    const remainingMonths = 12 - currentMonth;

    if (!this.discountApplied) {
      return this.valueDefault / remainingMonths;
    }

    const totalWithDiscount =
      this.valueDefault - (this.valueDefault * discount) / 100;

    return totalWithDiscount / remainingMonths;
  }
}
