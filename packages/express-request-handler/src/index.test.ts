import { Handler } from "./index";
import { create } from "./functions/create";

jest.mock("./functions/create");

describe("Handler", () => {
  it("should be defined", () => {
    expect(Handler).toBeDefined();
  });

  it("should be an object that contains a create function", () => {
    expect(Handler).toMatchObject({
      create: expect.any(Function),
    });
  });

  it("should contain the create function", () => {
    expect(Handler.create).toBe(create);
  });
});
