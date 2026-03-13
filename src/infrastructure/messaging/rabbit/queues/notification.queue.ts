import { IQueue } from "./interface";

export const notificationQueue: IQueue = {
  name: "notification.queue",
  options: {
    durable: true,
  },
};
