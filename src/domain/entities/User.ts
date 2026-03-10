import { StatusEnum } from "../../utils/enum/status";
import { EmailVO } from "../values-object/Email";
import { Base } from "./Base";

export class User extends Base {
  constructor(
    public email: string,
    public password: string,
    public schoolUuid: string,
    public profileUuid: string,
    public name: string,
    public status: StatusEnum = StatusEnum.ACTIVE,
  ) {
    super();
  }
}
