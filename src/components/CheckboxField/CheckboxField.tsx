import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import RemoveButton from "../RemoveButton/RemoveButton";
import { TField } from "../../helpers/types";
import "./CheckboxField.scss";

interface ICheckboxProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  fieldInfo: TField;
  removeFieldById: (id: string) => void;
}

const CheckboxField: React.FC<ICheckboxProps> = ({
  register,
  errors,
  fieldInfo,
  removeFieldById,
}) => {
  return (
    <>
      <label className="checkbox-label">
        <input
          className="checkbox"
          type="checkbox"
          id={fieldInfo?.fieldName}
          {...register(fieldInfo?.fieldName)}
        />
        {fieldInfo?.fieldName}
        <RemoveButton onClick={() => removeFieldById(fieldInfo.fieldId)} />
      </label>
      {errors?.[fieldInfo?.fieldName] && (
        <p className="error-text">{`${
          errors?.[fieldInfo?.fieldName]?.message
        }`}</p>
      )}
    </>
  );
};

export default CheckboxField;
