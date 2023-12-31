import { CreateTagController } from "./create-tag-controller";
import { MissingParamError } from "../../../validations/errors";
import { badRequest } from "../../protocols/http";

const makeSut = (): CreateTagController => new CreateTagController();

describe("CreateTagController", () => {
  test("should return 400 if no Tag name is provided ", async () => {
    const sut = makeSut();
    const httpRequest = {
      body: {},
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(badRequest(new MissingParamError("name")));
  });
});
