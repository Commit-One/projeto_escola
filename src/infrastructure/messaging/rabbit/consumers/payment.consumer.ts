import { PaymentDTO } from "../../../../application/dtos/payment.dto";
import { Payment } from "../../../../domain/entities/Payment";
import { IPaymentRepository } from "../../../../domain/repositories/IPaymentRepository";
import { notificationQueue } from "../queues/notification.queue";
import { RabbitService } from "../rabbit.service";

interface ICalculateRemaining {
  monthPending: number;
}

export class PaymentConsumer {
  constructor(
    private readonly rabbit: RabbitService,
    private readonly _repo: IPaymentRepository,
  ) {}

  private calculateRemainingMonthsOfYear(month: number): ICalculateRemaining[] {
    const quantityMonthYear = 12;
    const months: ICalculateRemaining[] = [];

    for (let i = month + 1; i <= quantityMonthYear; i++) {
      months.push({
        monthPending: i,
      });
    }

    return months;
  }

  async execute() {
    await this.rabbit.consumerQueue(
      notificationQueue.name,
      async (payload: PaymentDTO) => {
        const listMonths = this.calculateRemainingMonthsOfYear(
          payload.referenceMonth,
        );

        for (const month of listMonths) {
          const data = new Payment(
            payload.studentUuid,
            payload.schoolUuid,
            payload.valueDefault,
            month.monthPending,
            payload.referenceDay,
            payload.referenceYear,
            payload.status,
            payload.discountApplied,
            payload.discount,
          );
          await this._repo.create(data);
        }
      },
    );
  }
}
