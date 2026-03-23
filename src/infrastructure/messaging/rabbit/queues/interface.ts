interface IQueueOptions {
  durable: boolean;
  arguments?: Record<string, unknown>;
}

interface IQueueConfig {
  name: string;
  options: IQueueOptions;
}

export interface IRabbitQueueConfig {
  main: IQueueConfig;
  retry: IQueueConfig;
  dlq: IQueueConfig;
}
