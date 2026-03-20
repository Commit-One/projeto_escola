import { lower } from "../../../utils/functions/lower";

describe("Lower", () => {
  it("Convertendo uma string inteira em lowercase", () => {
    const result = lower("TESTE");

    expect(result).toBe("teste");
  });

  it("Convertendo uma string lowecase em lowercase", () => {
    const result = lower("teste");

    expect(result).toBe("teste");
  });

  it("Convertendo uma string parcial em lowercase", () => {
    const result = lower("TeStE");

    expect(result).toBe("teste");
  });
});
