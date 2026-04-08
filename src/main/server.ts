import express from "express";
import { AppDataSource } from "../infrastructure/database/data-source";
import { routes } from "../infrastructure/http/routes";
import { connectRedis } from "../infrastructure/redis/redis.connection";
import { setupRabbitMQ } from "../infrastructure/messaging/rabbit/setup";
import { requestLoggerMiddleware } from "../infrastructure/http/middleware/requestLogger.middleware";
import { errorMiddleware } from "../infrastructure/http/middleware/errorLogger.middleware";
import { generateOpenAPIDocument } from "./swagger";
import swaggerUi from "swagger-ui-express";
import { startWorkers } from "./startWorkers";

export class ServerInitializer {
  private readonly app: express.Application;

  constructor() {
    this.app = express();
  }

  public async inicialize() {
    await AppDataSource.initialize();
    console.log("✅ Database connected");

    await connectRedis();
    console.log("✅ Cache connected");

    await setupRabbitMQ();
    console.log("✅ Rabbit connected");

    await startWorkers();
    console.log("✅ Workers started");

    this.app.use(requestLoggerMiddleware);

    this.app.use(express.json());
    this.app.use(routes);

    const openApiDocument = generateOpenAPIDocument();
    this.app.use("/docs", swaggerUi.serve, swaggerUi.setup(openApiDocument));

    this.app.use(errorMiddleware);

    this.app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on http://localhost:${process.env.PORT}`);
    });
  }
}
