/**
 * @summary: Função que ajuda na criação das filas do RabbitMQ
 * @param channel - The RabbitMQ channel
 * @param queue - The queueName
 * @returns A promise resolving to the asserted queue
 */
export function assertQueue(channel: any, queue: any) {
  return channel.assertQueue(queue.name, queue.options);
}
