import { IBaseProps } from "../../domain/contracts/IBaseProps";
import { StatusPayment } from "../../utils/enum/payment";

export interface PaymentDTO {
  studentUuid: string;
  schoolUuid: string;
  annualValue: number;
  referenceMonth: number;
  referenceDay: number;
  referenceYear: number;
  status: StatusPayment;
  discountApplied: boolean;
  discount: number;
  baseProps?: IBaseProps;
}
