import { z, ZodType } from "zod";
import { ENewFieldTypes, EValidationErrors } from "./constants";
import { TField } from "./types";

export function generateZodSchema(fields: TField[]): ZodType<any, any, any> {
  const schemaObject: Record<string, ZodType<any, any, any>> = {};

  fields.forEach((field) => {
    let fieldSchema: ZodType<any, any, any>;

    switch (field.fieldType) {
      case ENewFieldTypes.text:
        fieldSchema = z
          .string()
          .min(1, { message: EValidationErrors.required });
        break;
      case ENewFieldTypes.number:
        fieldSchema = z.number({
          required_error: EValidationErrors.required,
          invalid_type_error: EValidationErrors.numberRequired,
        });
        break;
      case ENewFieldTypes.email:
        fieldSchema = z
          .string()
          .min(1, { message: EValidationErrors.required })
          .email(EValidationErrors.invalidEmail);
        break;
      case ENewFieldTypes.password:
        fieldSchema = z
          .string()
          .min(8, EValidationErrors.passwordLength)
          .regex(
            /[$&+,:;=?@#|'<>.^*()%!-]/,
            EValidationErrors.passwordSpecialChar
          )
          .regex(/[A-Z]/, EValidationErrors.passwordCapital)
          .regex(/[0-9]/, EValidationErrors.passwordNumber);
        break;
      case ENewFieldTypes.checkbox:
        fieldSchema = z.boolean();
        break;
      case ENewFieldTypes.select:
        fieldSchema = z
          .string()
          .min(1, { message: EValidationErrors.required })
          .default("");
        break;
      // Add more field types as needed, just remember to add them in ENewFieldTypes enum

      default:
        throw new Error(
          `${EValidationErrors.unsupportedType}: ${field.fieldType}`
        );
    }

    schemaObject[field.fieldName] = fieldSchema;
  });

  return z.object(schemaObject).required();
}

export const isArrayEmpty = <T>(arr: T[]): boolean => {
  return arr.length === 0;
};
