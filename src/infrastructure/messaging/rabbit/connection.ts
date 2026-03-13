import amqp, { Channel } from "amqplib";
import { rabbitConfig } from "./config";

export class RabbitMQConnection {
  private static connection: amqp.ChannelModel | null = null;
  private static channel: Channel | null = null;

  static async getChannel(): Promise<Channel> {
    if (this.channel) return this.channel;

    if (!this.connection) {
      this.connection = await amqp.connect(rabbitConfig.url);
    }

    this.channel = await this.connection.createChannel();

    this.connection.on("close", () => {
      this.connection = null;
      this.channel = null;
    });

    this.connection.on("error", () => {
      this.connection = null;
      this.channel = null;
    });

    return this.channel;
  }

  static async close(): Promise<void> {
    if (this.channel) {
      await this.channel.close();
      this.channel = null;
    }

    if (this.connection) {
      await this.connection.close();
      this.connection = null;
    }
  }
}
