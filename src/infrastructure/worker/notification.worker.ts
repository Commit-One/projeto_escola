import cron from "node-cron";
import { environmentConfig } from "../../main/instances";

export class NotificationWorker {
  public async execute() {
    cron.schedule(environmentConfig.CRON_NOTIFICATION, async () => {
      // new NotificationConsumer(rabbitServiceInstance)
      console.log(">>>>> NotificationWorker");
    });
  }
}
