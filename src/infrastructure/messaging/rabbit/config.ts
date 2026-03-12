export const rabbitConfig = {
  url: process.env.RABBITMQ_URL || "amqp://admin:admin@localhost:5672",
  exchange: {
    name: "app.exchange",
    type: "direct" as const,
  },
};