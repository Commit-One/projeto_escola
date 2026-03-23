// Realiza a criação das filas
export function assertQueue(channel: any, queue: any) {
  return channel.assertQueue(queue.name, queue.options);
}
