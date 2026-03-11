export interface IQueueService {
  sendToQueue(routingKey: string, payload: any): Promise<void>;
}