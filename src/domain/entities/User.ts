import { StatusEnum } from "../../utils/enum/status";
import { Base } from "./Base";

export class User extends Base {
  constructor(
    public email: string,
    public password: string,
    public escolaUuid: string,
    public profileUuid: string,
    public name: string,
    public status: StatusEnum = StatusEnum.ACTIVE,
  ) {
    super();
  }
}
