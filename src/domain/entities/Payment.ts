import { StatusPayment } from "../../utils/enum/payment";
import { Base } from "./Base";

export class Payment extends Base {
  constructor(
    public studentUuid: string,
    public schoolUuid: string,
    public value: string,
    public monthReference: string,
    public dayReference: string,
    public yearReference: string,
    public status: StatusPayment = StatusPayment.PENDING,
    public discountApplied: boolean,
  ) {
    super();
  }
}
