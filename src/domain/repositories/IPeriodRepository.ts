export interface IPeriodRepository {
  create(name: string): Promise<boolean>
  existByName(name: string): Promise<boolean>;
}
