// import { inject, injectable } from "tsyringe";
// // import { PaymentDTO } from "../../../../application/dtos/payment.dto";
// import { IPaymentRepository } from "../../../../domain/repositories/IPaymentRepository";
// import { ContainerEnum } from "../../../../utils/enum/container";
// import { IQueueService } from "../../../../domain/contracts/IQueueService";
// // import { paymentQueue } from "../queues/payment.queue";

// interface ICalculateRemaining {
//   monthPending: number;
// }

// @injectable()
// export class PaymentConsumer {
//   constructor(
//     @inject(ContainerEnum.QUEUE_SERVICE)
//     private readonly rabbit: IQueueService,

//     @inject(ContainerEnum.PAYMENT_REPOSITORY)
//     private readonly _repo: IPaymentRepository,
//   ) {}

//   // private calculateRemainingMonthsOfYear(month: number): ICalculateRemaining[] {
//   //   const quantityMonthYear = 12;
//   //   const months: ICalculateRemaining[] = [];

//   //   for (let i = month + 1; i <= quantityMonthYear; i++) {
//   //     months.push({
//   //       monthPending: i,
//   //     });
//   //   }

//   //   return months;
//   // }

//   // async execute() {
//   //   await this.rabbit.consumerQueue(
//   //     paymentQueue,
//   //     async (payload: PaymentDTO) => {
//   //       await this._repo.createAllPayments(payload);
//   //     },
//   //   );
//   // }
// }
