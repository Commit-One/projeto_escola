export interface IPeriodoRepository {
  createPeriodo(name: string): Promise<boolean>;
  existByName(name: string): Promise<boolean>;
}
