import { FieldValidation } from "../protocols/field-validation";
import { InvalidFieldError } from "../errors";

export class EmailValidation implements FieldValidation {
  constructor(readonly field: string) {}

  validate(value: any): Error {
    const emailRegex =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return !value || emailRegex.test(value) ? null : new InvalidFieldError();
  }
}
