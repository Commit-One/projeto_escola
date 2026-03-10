export interface IProfileRepository {
  create(name: string): Promise<boolean>
  existByName(name: string): Promise<boolean>;
}
