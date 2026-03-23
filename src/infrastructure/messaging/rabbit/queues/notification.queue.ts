import { QueueEnum } from "../../../../utils/enum/queue";
import { IRabbitQueueConfig } from "./interface";

export const notificationQueue: IRabbitQueueConfig = {
  main: {
    name: QueueEnum.NOTIFICATION_NAME,
    options: {
      durable: true,
    },
  },
  retry: {
    name: QueueEnum.NOTIFICATION_RETRY,
    options: {
      durable: true,
      arguments: {
        "x-message-ttl": 10000,
        "x-dead-letter-exchange": "",
        "x-dead-letter-routing-key": QueueEnum.NOTIFICATION_NAME,
      },
    },
  },
  dlq: {
    name: QueueEnum.NOTIFICATION_DLQ,
    options: {
      durable: true,
    },
  },
};
