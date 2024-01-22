import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import RemoveButton from "../RemoveButton/RemoveButton";
import { TField } from "../../helpers/types";
import "./InputField.scss";

interface IInputProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  fieldInfo: TField;
  type: string;
  removeFieldById: (id: string) => void;
}

const InputField: React.FC<IInputProps> = ({
  register,
  errors,
  fieldInfo,
  type,
  removeFieldById,
}) => {
  return (
    <>
      <div className="input-container">
        <input
          {...register(fieldInfo.fieldName, {
            valueAsNumber: type === "number",
          })}
          type={type}
          placeholder={fieldInfo.fieldName}
          className="input"
        />
        <RemoveButton onClick={() => removeFieldById(fieldInfo.fieldId)} />
      </div>
      {errors?.[fieldInfo?.fieldName] && (
        <p className="error-text">{`${
          errors?.[fieldInfo?.fieldName]?.message
        }`}</p>
      )}
    </>
  );
};

export default InputField;
