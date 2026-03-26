import { CpfValueObject } from "../../../domain/valuesObject/cpf";

describe("CPF Validator", () => {
  it("Deve retornar true para um CPF válido", () => {
    const result = CpfValueObject.validate("367.618.050-07");
    expect(result).toBe(true);
  });

  it("Deve retornar false para um CPF válido", () => {
    const result = CpfValueObject.validate("367.618.050-12");
    expect(result).toBe(false);
  });
});
