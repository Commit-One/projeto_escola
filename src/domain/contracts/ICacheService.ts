export interface ICacheService {
  set(key: string, value: unknown): Promise<void>;
  get<T>(key: string): Promise<T | null>;
  delete(key: string): Promise<void>;
}
