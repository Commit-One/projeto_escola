import { CnpjValidator } from "../../../domain/validator/cnpj.validator";

describe("CNPJ Validator", () => {
  it("deve validar um CNPJ válido", () => {
    expect(CnpjValidator.validate("45.723.174/0001-10")).toBe(true);
  });

  it("deve rejeitar um CNPJ inválido", () => {
    expect(CnpjValidator.validate("99.375.139/001-111")).toBe(false);
  });
});
