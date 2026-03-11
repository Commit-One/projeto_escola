import { IQueueDefinition } from "./interface";

export const notificationQueue: IQueueDefinition = {
    name: "notification.queue",
    options: {
        durable: true
    }
};