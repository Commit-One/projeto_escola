export interface IBaseRepository<T> {
  create(data: T): Promise<T>
  delete(uuid: string): Promise<boolean>
  updateStatus(uuid: string, status: string): Promise<boolean>
  update(uuid: string, data: T): Promise<T>
}
