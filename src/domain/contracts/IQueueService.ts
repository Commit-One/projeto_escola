export interface IQueueService {
  sendToQueue<T>(queue: string, payload: T): Promise<void>;
  consumerQueue(queue: string, callback: (payload: any) => Promise<void>): Promise<void>;
}