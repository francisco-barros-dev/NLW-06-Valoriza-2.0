import faker from "faker";
import { ValidationBuilder as sut } from "./validation-builder";
import { MinLengthValidation } from "../min-length/min-length-validation";
import { RequiredFieldValidation } from "../required-field/required-field-validation";
import { EmailValidation } from "../email/email-validation";

describe("ValidationBuilder", () => {
  test("should return RequiredFieldValidation", () => {
    const fieldName = faker.database.column();
    const validations = sut.field(fieldName).required().build();
    expect(validations).toEqual([new RequiredFieldValidation(fieldName)]);
  });

  test("should return MinLengthValidation", () => {
    const fieldName = faker.database.column();
    const minLength = faker.datatype.number();
    const validations = sut.field(fieldName).min(minLength).build();
    expect(validations).toEqual([
      new MinLengthValidation(fieldName, minLength),
    ]);
  });

  test("should return EmailValidation", () => {
    const fieldName = faker.database.column();
    const validations = sut.field(fieldName).email().build();
    expect(validations).toEqual([new EmailValidation(fieldName)]);
  });

  test("should return a list of validations", () => {
    const validations = sut
      .field("any_field")
      .required()
      .email()
      .min(3)
      .build();
    expect(validations).toEqual([
      new RequiredFieldValidation("any_field"),
      new EmailValidation("any_field"),
      new MinLengthValidation("any_field", 3),
    ]);
  });
});
