export interface IProfileRepository {
  createProfile(name: string): Promise<boolean>;
  existByName(name: string): Promise<boolean>;
}
