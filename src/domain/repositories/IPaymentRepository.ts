import { StatusPayment } from "../../utils/enum/payment";
import { Payment } from "../entities/Payment";

export interface IPaymentRepository {
  create(data: Payment): Promise<boolean>;
  updateStatus(uuid: string, status: StatusPayment): Promise<boolean>;
}
