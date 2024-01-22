import { TField } from "./types";

export const MAX_OPTIONS_AVAILABLE = 10;

export enum EValidationErrors {
  required = "This field is required",
  atleastTwo = "You must create atleast 2 options",
  uniqueOptions = "Options must be unique",
  numberRequired = "This field must be a number",
  invalidEmail = "Invalid email format",
  passwordLength = "Password must be at least 8 characters long",
  passwordSpecialChar = "Password must contain at least 1 special character",
  passwordCapital = "Password must contain at least 1 capital letter",
  passwordNumber = "Password must contain at least 1 number",
  unsupportedType = "Unsupported field type",
  optionsRequired = "All options are required to be filled",
}

// Add more type field types as needed, just remember to add them in generateZodSchema helper function
export enum ENewFieldTypes {
  text = "text",
  number = "number",
  email = "email",
  password = "password",
  checkbox = "checkbox",
  select = "select",
}

export enum EAddModalTexts {
  addNew = "Add new input field",
  options = "Options:",
  addOption = "Add option",
  addField = "Add",
  close = "Close",
  placeholder = "Add desired field name",
}

export enum EFormTexts {
  formTitle = "Create your form",
  emptyForm = "Please add some fields to the form",
  submit = "Submit",
  addField = "Add field",
  choiceTitle = "Some form choices to try:",
  basic = "Basic",
  login = "Login",
  details = "Email details",
  refreshForm = "Refresh form",
}

// User form examples, add more as needed
export const BASIC_FORM: TField[] = [
  { fieldName: "Name", fieldType: "text", fieldId: "001" },
  { fieldName: "Favourite number", fieldType: "number", fieldId: "002" },
  { fieldName: "Agree with conditions", fieldType: "checkbox", fieldId: "003" },
  {
    fieldName: "Select favourite",
    fieldType: "select",
    fieldOptions: [
      { option: "Watermelon" },
      { option: "Pear" },
      { option: "Cherry" },
    ],
    fieldId: "004",
  },
];

export const LOGIN_FORM: TField[] = [
  { fieldName: "Email", fieldType: "email", fieldId: "0001" },
  { fieldName: "Password", fieldType: "password", fieldId: "0002" },
];

export const EMAIL_DETAILS_FORM: TField[] = [
  { fieldName: "Name", fieldType: "text", fieldId: "005" },
  { fieldName: "Email", fieldType: "email", fieldId: "006" },
  {
    fieldName: "Receive weekly emails?",
    fieldType: "checkbox",
    fieldId: "007",
  },
];
