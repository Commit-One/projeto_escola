import { IQueue } from "./interface";

export const paymentQueue: IQueue = {
  name: "payment.queue",
  options: {
    durable: true,
  },
};
