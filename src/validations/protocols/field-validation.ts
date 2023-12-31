export interface FieldValidation {
  field: string;
  validate: (value: any) => Error;
}
