export interface IPeriodRepository {
  createPeriodo(name: string): Promise<boolean>;
  existByName(name: string): Promise<boolean>;
}
