import { z } from "zod";
import { EValidationErrors, ENewFieldTypes } from "./constants";

export const newFieldSchema = z
  .object({
    fieldType: z.string(),
    fieldName: z.string().min(1, { message: EValidationErrors.required }),
    fieldOptions: z
      .array(
        z.object({
          option: z.string(),
        })
      )
      .optional(),
  })
  .refine(
    (data) => {
      if (data.fieldType === ENewFieldTypes.select) {
        if (data?.fieldOptions) {
          return data?.fieldOptions?.length >= 2;
        } else return false;
      }
      return true;
    },
    {
      message: EValidationErrors.atleastTwo,
      path: ["fieldOptions"],
    }
  )
  .refine(
    (data) => {
      if (data.fieldType !== ENewFieldTypes.select) {
        return true;
      }

      return data?.fieldOptions?.every((item) => item.option.trim().length > 0);
    },
    {
      message: EValidationErrors.optionsRequired,
      path: ["fieldOptions"],
    }
  )
  .refine(
    (data) => {
      if (data.fieldType === ENewFieldTypes.select && data?.fieldOptions) {
        const options = new Set(data?.fieldOptions?.map((e) => e.option));
        return options.size === data?.fieldOptions?.length;
      }

      return true;
    },
    {
      message: EValidationErrors.uniqueOptions,
      path: ["fieldOptions"],
    }
  );
