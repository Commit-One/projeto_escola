import { ValidationEmpty } from "../../utils/error";
import { Base } from "./Base";

export class Period extends Base {
  constructor(public name: string) {
    super();
    this.validate()
  }

  private validate() {
    if (!this.name) throw new ValidationEmpty("name")
  }
}
