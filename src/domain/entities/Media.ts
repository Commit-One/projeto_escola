import { ValidationEmpty } from "../../utils/error";
import { IBaseProps } from "../contracts/IBaseProps";
import { Base } from "./Base";

export class Media extends Base {
  constructor(
    public schoolUuid: string,
    public media: number,
    baseProps?: IBaseProps,
  ) {
    super(baseProps);
    this.validate();
  }

  private validate() {
    if (!this.schoolUuid) throw new ValidationEmpty("schoolUuid");
    if (!this.media) throw new ValidationEmpty("media");
  }
}
