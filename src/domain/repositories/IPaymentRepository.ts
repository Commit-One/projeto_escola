import { PaymentDTO } from "../../application/dtos/payment.dto";
import { StatusPayment } from "../../utils/enum/payment";
import { Payment } from "../entities/Payment";

export interface IPaymentRepository {
  createUnitPayment(data: Payment): Promise<boolean>;
  createAllPayments(data: PaymentDTO): Promise<boolean>;
  updateStatus(uuid: string, status: StatusPayment): Promise<boolean>;
  sendUpcomingPaymentDueAlert(): Promise<Payment[]>;
}
