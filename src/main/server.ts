import express from "express";
import { AppDataSource } from "../infrastructure/database/data-source";
import { routes } from "../infrastructure/http/routes";
import { connectRedis } from "../infrastructure/cache/cache.connection";
import { setupRabbitMQ } from "../infrastructure/messaging/rabbit/setup";
import { startWorkers } from "./instances";

export class ServerInitializer {
  private readonly app: express.Application;

  constructor() {
    this.app = express();
  }

  public async execute() {
    await AppDataSource.initialize();
    console.log("✅ Database connected");

    await connectRedis();
    console.log("✅ Cache connected");

    await setupRabbitMQ();
    console.log("✅ Rabbit connected");

    // await startWorkers()
    // console.log("✅ startWorkers connected");

    this.app.use(express.json());
    this.app.use(routes);

    this.app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on http://localhost:${process.env.PORT}`);
    });
  }
}
