export class InvalidFieldError extends Error {
  constructor() {
    super("Invalid field value");
    this.name = "InvalidFieldError";
  }
}
