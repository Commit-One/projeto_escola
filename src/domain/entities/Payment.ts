import { StatusPayment } from "../../utils/enum/payment";
import { NotFoundError, ValidationEmpty } from "../../utils/error";
import { Base } from "./Base";

export class Payment extends Base {
  private currentValue: number = 0

  constructor(
    public studentUuid: string,
    public schoolUuid: string,
    public valueDefault: number,
    public referenceMonth: number,
    public referenceDay: number,
    public referenceYear: number,
    public status: StatusPayment = StatusPayment.PENDING,
    public discountApplied: boolean,
    public discount: number = 0
  ) {
    super();

    this.currentValue = this.valueDefault;
    if (this.discountApplied) this.calculateDiscount(this.discount);
  }

  private calculateDiscount(discount: number) {
    if (this.discountApplied) {
      const current = this.valueDefault - (this.valueDefault * discount / 100);
      this.currentValue = current;
      return this.currentValue;
    }

    return this.valueDefault;
  }

   private validate() {
     if(!this.valueDefault) throw new NotFoundError("Valor")      

    const currentDate = new Date();
    const day = currentDate.getDay();
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    
    // TODO: Fazer validação das datas
  
  }
}

