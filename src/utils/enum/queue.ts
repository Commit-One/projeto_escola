export enum QueueEnum {
  NOTIFICATION_NAME = "notification.queue",
  NOTIFICATION_RETRY = "notification.queue.retry",
  NOTIFICATION_DLQ = "notification.queue.dlq",

  PAYMENT_NAME = "payment.queue",
  PAYMENT_RETRY = "payment.queue.retry",
  PAYMENT_DLQ = "payment.queue.dlq",
}
