import { IBaseProps } from "../contracts/IBaseProps";

export class Base {
  public readonly uuid: string;
  public readonly createdAt: Date;
  public readonly enable: boolean;

  constructor(props?: IBaseProps) {
    this.uuid = props?.uuid ?? crypto.randomUUID();
    this.createdAt = props?.createdAt ?? new Date();
    this.enable = props?.enable ?? true;
  }
}
