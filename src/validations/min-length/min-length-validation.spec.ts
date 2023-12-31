import faker, { random } from "faker";
import { InvalidFieldError } from "../errors";
import { MinLengthValidation } from "./min-length-validation";

const makeSut = () => new MinLengthValidation(faker.database.column(), 5);

describe("MinLengthValidation", () => {
  test("should return error if field value is invalid", () => {
    const sut = makeSut();
    const error = sut.validate(faker.random.alphaNumeric(4));
    expect(error).toEqual(new InvalidFieldError());
  });

  test("should return falsy if field is valid", () => {
    const sut = makeSut();
    const error = sut.validate(faker.random.alphaNumeric(5));
    expect(error).toBeFalsy();
  });
});
