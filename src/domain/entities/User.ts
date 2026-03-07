import { Base } from "./Base";

export class User extends Base {
  constructor(
    public email: string,
    public password: string,
    public escolaUuid: string,
    public profileUuid: string,
  ) {
    super();
  }
}
