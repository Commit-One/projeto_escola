import { AppError } from "../../utils/error";
import { IBaseProps } from "../contracts/IBaseProps";
import { Base } from "./Base";

export class ClassStudent extends Base {
  constructor(
    public name: string,
    public maxAge: number,
    public minAge: number,
    public schoolUuid: string,
    baseProps?: IBaseProps,
  ) {
    super(baseProps);
    this.validate();
  }

  private validate() {
    if (!this.name) throw new AppError("Nome não pode ser vazio");
    if (this.maxAge === 0) throw new AppError("Idade máxima não pode ser 0");
    if (this.minAge === 0) throw new AppError("Idade mínima não pode ser 0");
    if (!this.schoolUuid) throw new AppError("EscolaUuid não pode ser vazia");
    if (this.maxAge <= this.minAge)
      throw new AppError("A idade máxima precisa ser maior que a idade mínima");
  }
}
