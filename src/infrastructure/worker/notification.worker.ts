import cron from "node-cron";
import { environmentConfig } from "../../main/instances";
// import { NotificationConsumer } from "../messaging/rabbit/consumers/notification.consumer";
// import { rabbitServiceInstance } from "../../main/instances";

export class NotificationWorker {
    public async execute() {
        cron.schedule(environmentConfig.CRON_NOTIFICATION, async () => {
            // new NotificationConsumer(rabbitServiceInstance)
            console.log(">>>>> NotificationWorker")
        });
    }
}
