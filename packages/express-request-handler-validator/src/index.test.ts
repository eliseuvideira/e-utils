import { Validator } from "./index";

describe("Validator", () => {
  it("should export the create function", () => {
    expect(Validator.create).toBeDefined();
  });

  it("should export the create function as a function", () => {
    expect(typeof Validator.create).toBe("function");
  });
});
