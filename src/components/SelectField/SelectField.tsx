import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import RemoveButton from "../RemoveButton/RemoveButton";
import { TField } from "../../helpers/types";
import "./SelectField.scss";

interface ISelectProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  fieldInfo: TField;
  removeFieldById: (id: string) => void;
}

const SelectField: React.FC<ISelectProps> = ({
  register,
  errors,
  fieldInfo,
  removeFieldById,
}) => {
  return (
    <>
      <div className="select-container">
        <select
          id={fieldInfo.fieldName}
          {...register(fieldInfo.fieldName)}
          className="select"
          defaultValue=""
        >
          <option value="" disabled>
            {fieldInfo.fieldName}
          </option>
          {fieldInfo?.fieldOptions?.map((el) => (
            <option key={el?.option} value={el?.option}>
              {el?.option}
            </option>
          ))}
        </select>
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

export default SelectField;
