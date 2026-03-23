import { QueueEnum } from "../../../../utils/enum/queue";
import { IRabbitQueueConfig } from "./interface";

export const paymentQueue: IRabbitQueueConfig = {
  main: {
    name: QueueEnum.PAYMENT_NAME,
    options: {
      durable: true,
    },
  },
  retry: {
    name: QueueEnum.PAYMENT_RETRY,
    options: {
      durable: true,
      arguments: {
        "x-message-ttl": 10000,
        "x-dead-letter-exchange": "",
        "x-dead-letter-routing-key": QueueEnum.PAYMENT_NAME,
      },
    },
  },
  dlq: {
    name: QueueEnum.PAYMENT_DLQ,
    options: {
      durable: true,
    },
  },
};
