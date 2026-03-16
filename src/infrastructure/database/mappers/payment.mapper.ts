import { Payment } from "../../../domain/entities/Payment";
import { PaymentEntity } from "../entities/PaymentEntity";

export class PaymentMapper {
  static toEntity(data: Payment): PaymentEntity {
    const entity = new PaymentEntity();

    entity.monthlyValue = data.monthlyValue;
    entity.discount = data.discount;
    entity.discountApplied = data.discountApplied;
    entity.referenceDay = data.referenceDay;
    entity.referenceMonth = data.referenceMonth;
    entity.referenceYear = data.referenceYear;
    entity.schoolUuid = data.schoolUuid;
    entity.status = data.status;
    entity.studentUuid = data.studentUuid;
    entity.annualValue = data.annualValue;

    return entity;
  }
}
