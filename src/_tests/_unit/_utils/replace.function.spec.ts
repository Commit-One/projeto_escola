import { replace } from "../../../utils/helpers/replace";

describe("Replace", () => {
  it("Removendo caracteres especiais do numero", () => {
    const result = replace("123-123-123-32");

    expect(result).toBe("12312312332");
  });

  it("Removendo caracteres especiais do nome", () => {
    const result = replace("Jhonatan Martins@");

    expect(result).toBe("Jhonatan Martins");
  });
});
