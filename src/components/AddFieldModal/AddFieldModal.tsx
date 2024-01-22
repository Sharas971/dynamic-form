import React, { Dispatch, SetStateAction } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import Modal from "react-modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from "uuid";
import RemoveButton from "../RemoveButton/RemoveButton";
import {
  ENewFieldTypes,
  EAddModalTexts,
  MAX_OPTIONS_AVAILABLE,
} from "../../helpers/constants";
import { newFieldSchema } from "../../helpers/zodSchemas";
import { TField } from "../../helpers/types";
import "./AddFieldModal.scss";

interface IInputProps {
  isModalOpen: boolean;
  closeModal: () => void;
  setFields: Dispatch<SetStateAction<TField[]>>;
}

const AddFieldModal: React.FC<IInputProps> = ({
  isModalOpen,
  closeModal,
  setFields,
}) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = useForm<TField>({
    resolver: zodResolver(newFieldSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "fieldOptions",
    rules: { maxLength: MAX_OPTIONS_AVAILABLE },
  });

  const handleAppend = () => {
    if (fields.length < MAX_OPTIONS_AVAILABLE) {
      append({ option: "" });
    }
  };

  const addNewField = (data: Omit<TField, "fieldId">) => {
    setFields((oldArray) => [...oldArray, { ...data, fieldId: uuidv4() }]);
  };

  const onSubmit = async (data: TField) => {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Used to imitate an action
    addNewField(data);

    reset();
    reset({
      fieldOptions: [],
    });
    closeModal();
  };

  const handleClose = () => {
    reset();
    closeModal();
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={handleClose}
      ariaHideApp={false}
      className="react-modal"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="container">
        <h2 className="heading">{EAddModalTexts.addNew}</h2>
        <div className="select-container">
          <select id="selectType" {...register("fieldType")} className="select">
            {Object.values(ENewFieldTypes).map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="input-container">
          <input
            {...register("fieldName", { required: true })}
            type="text"
            placeholder={EAddModalTexts.placeholder}
            className="input"
          />
        </div>
        {errors?.fieldName && (
          <p className="error-text">{`${errors.fieldName.message}`}</p>
        )}
        {watch("fieldType") === ENewFieldTypes.select ? (
          <>
            <h3 className="heading">{EAddModalTexts.options}</h3>
            {fields?.length > 0 ? (
              <ul className="list-container">
                {fields.map((field, index) => (
                  <li key={field.id} className="list-item">
                    <input
                      {...field}
                      {...register(`fieldOptions.${index}.option`)}
                      className="list-input"
                    />
                    <RemoveButton onClick={() => remove(index)} />
                  </li>
                ))}
              </ul>
            ) : null}
            {errors?.fieldOptions?.root?.message && (
              <p className="error-text">{`${errors?.fieldOptions?.root?.message}`}</p>
            )}
            {fields.length < MAX_OPTIONS_AVAILABLE ? (
              <button
                type="button"
                className="button button-primary"
                onClick={handleAppend}
              >
                {EAddModalTexts.addOption}
              </button>
            ) : null}
            {errors?.fieldOptions?.message && (
              <p className="error-text">{`${errors?.fieldOptions?.message}`}</p>
            )}
          </>
        ) : null}

        <div className="choices-block">
          <button
            disabled={isSubmitting}
            type="submit"
            className="choice-button primary"
          >
            {EAddModalTexts.addField}
          </button>
          <button
            type="button"
            className="choice-button secondary"
            onClick={handleClose}
          >
            {EAddModalTexts.close}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddFieldModal;
