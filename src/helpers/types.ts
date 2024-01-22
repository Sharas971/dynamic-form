import { ENewFieldTypes } from "./constants";

export type TNewFieldType = `${ENewFieldTypes}`;

type TOption = {
  option: string;
};

export type TField = {
  fieldName: string;
  fieldType: TNewFieldType;
  fieldOptions?: TOption[];
  fieldId: string;
};
