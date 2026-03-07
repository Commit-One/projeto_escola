import { Base } from "./Base";

export class School extends Base {
  constructor(
    public name: string,
    public address: string,
    public phone: string,
    public email: string,
    public nameDirector: string,
  ) {
    super();
  }
}
