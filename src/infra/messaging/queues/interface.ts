export interface IQueueDefinition {
  name: string;
  options: {
    durable: boolean,
  },
}