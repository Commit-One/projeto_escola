export class Base {
  public readonly uuid: string;
  public readonly createdAt: Date;
  public readonly enable: boolean;

  constructor() {
    this.uuid = crypto.randomUUID();
    this.createdAt = new Date();
    this.enable = true;
  }
}
