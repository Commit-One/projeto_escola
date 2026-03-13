export interface IQueue {
  name: string;
  options: {
    durable: boolean;
  };
}
