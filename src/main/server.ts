import express from "express";
import { AppDataSource } from "../infra/database/data-source";
import { routes } from "../infra/http/routes";
import { connectRedis } from "../infra/cache/cache.connection";
export class ServerInitializer {
  private readonly app: express.Application;

  constructor() {
    this.app = express();
  }

  public async execute() {
    await AppDataSource.initialize();
    console.log("✅ Database connected");

    connectRedis();
    console.log("✅ Cache connected");

    this.app.use(express.json());

    this.app.use(routes);

    this.app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on http://localhost:${process.env.PORT}`);
    });
  }
}
