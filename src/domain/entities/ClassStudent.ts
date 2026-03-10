import { Base } from "./Base";

export class ClassStudent extends Base {
  constructor(
    public name: string,
    public maxAge: number,
    public minAge: number,
  ) {
    super();
  }
}
