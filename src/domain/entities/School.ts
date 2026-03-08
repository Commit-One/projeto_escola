import { StatusEnum } from "../../utils/enum/status";
import { Base } from "./Base";

export class School extends Base {
  constructor(
    public name: string,
    public address: string,
    public phone: string,
    public email: string,
    public nameDirector: string,
    public status: StatusEnum = StatusEnum.ACTIVE,
  ) {
    super();
  }
}
