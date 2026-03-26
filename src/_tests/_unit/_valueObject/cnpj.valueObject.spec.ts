import { CnpjValueObject } from "../../../domain/valuesObject/cnpj";

describe("CNPJ Validator", () => {
  it("deve validar um CNPJ válido", () => {
    expect(CnpjValueObject.validate("45.723.174/0001-10")).toBe(true);
  });

  it("deve rejeitar um CNPJ inválido", () => {
    expect(CnpjValueObject.validate("99.375.139/001-111")).toBe(false);
  });
});
