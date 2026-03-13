import { StatusPayment } from "../../utils/enum/payment";
import { IBaseProps } from "../contracts/IBaseProps";
import { Base } from "./Base";

export class Payment extends Base {
  public currentValue: number = 0;

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

    this.currentValue = this.valueDefault;
    if (this.discountApplied) this.calculateDiscount(this.discount);
  }

  private calculateDiscount(discount: number) {
    if (this.discountApplied) {
      const current = this.valueDefault - (this.valueDefault * discount) / 100;
      this.currentValue = current;
      return this.currentValue;
    }

    return this.valueDefault;
  }
}
