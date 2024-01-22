import React, { useState, useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { generateZodSchema, isArrayEmpty } from "../../helpers/helpers";
import { z } from "zod";
import { TField } from "../../helpers/types";
import InputField from "../InputField/InputField";
import SelectField from "../SelectField/SelectField";
import CheckboxField from "../CheckboxField/CheckboxField";
import AddFieldModal from "../AddFieldModal/AddFieldModal";
import {
  BASIC_FORM,
  LOGIN_FORM,
  EMAIL_DETAILS_FORM,
  ENewFieldTypes,
  EFormTexts,
} from "../../helpers/constants";
import "./DynamicForm.scss";

const DynamicForm: React.FC = () => {
  const [fields, setFields] = useState<TField[]>(BASIC_FORM);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const generatedSchema = useMemo(() => generateZodSchema(fields), [fields]);
  type TSignUpSchema = z.infer<typeof generatedSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(generatedSchema),
  });

  const onSubmit = async (data: TSignUpSchema) => {
    // TODO: api call or something else, not specified in the task.
    // I logged the data to the console
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Used to imitate an action
    console.log("Form data: ", data);

    reset();
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const removeFieldById = (id: string) => {
    setFields((fields) => fields.filter((item) => item.fieldId !== id));
  };

  return (
    <div className="card">
      <form onSubmit={handleSubmit(onSubmit)} className="container">
        <h3 className="heading">{EFormTexts.formTitle}</h3>
        {fields?.map((field) =>
          (() => {
            switch (field.fieldType) {
              case ENewFieldTypes.text:
                return (
                  <InputField
                    register={register}
                    errors={errors}
                    fieldInfo={field}
                    key={field.fieldId}
                    type="text"
                    removeFieldById={removeFieldById}
                  />
                );
              case ENewFieldTypes.number:
                return (
                  <InputField
                    register={register}
                    errors={errors}
                    fieldInfo={field}
                    key={field.fieldId}
                    type="number"
                    removeFieldById={removeFieldById}
                  />
                );
              case ENewFieldTypes.email:
                return (
                  <InputField
                    register={register}
                    errors={errors}
                    fieldInfo={field}
                    key={field.fieldId}
                    type="text"
                    removeFieldById={removeFieldById}
                  />
                );
              case ENewFieldTypes.password:
                return (
                  <InputField
                    register={register}
                    errors={errors}
                    fieldInfo={field}
                    key={field.fieldId}
                    type="password"
                    removeFieldById={removeFieldById}
                  />
                );
              case ENewFieldTypes.checkbox:
                return (
                  <CheckboxField
                    register={register}
                    errors={errors}
                    fieldInfo={field}
                    key={field.fieldId}
                    removeFieldById={removeFieldById}
                  />
                );
              case ENewFieldTypes.select:
                return (
                  <SelectField
                    register={register}
                    errors={errors}
                    fieldInfo={field}
                    key={field.fieldId}
                    removeFieldById={removeFieldById}
                  />
                );
              default:
                return null;
            }
          })()
        )}
        {isArrayEmpty(fields) ? (
          <p className="text-medium-size align-center">
            {EFormTexts.emptyForm}
          </p>
        ) : (
          <button
            disabled={isSubmitting}
            type="submit"
            className="button button-primary"
          >
            {EFormTexts.submit}
          </button>
        )}
        <div className="choices-block">
          <button
            onClick={openModal}
            className="choice-button secondary"
            type="button"
          >
            {EFormTexts.addField}
          </button>
          <button
            onClick={() => reset()}
            className="choice-button secondary"
            type="button"
          >
            {EFormTexts.refreshForm}
          </button>
        </div>
      </form>
      <AddFieldModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        setFields={setFields}
      />
      <div className="container">
        <h3 className="heading">{EFormTexts.choiceTitle}</h3>
        <div className="choices-block">
          <button
            className="choice-button primary"
            onClick={() => setFields(BASIC_FORM)}
            type="button"
          >
            {EFormTexts.basic}
          </button>
          <button
            className="choice-button primary"
            onClick={() => setFields(LOGIN_FORM)}
            type="button"
          >
            {EFormTexts.login}
          </button>
          <button
            className="choice-button primary"
            onClick={() => setFields(EMAIL_DETAILS_FORM)}
            type="button"
          >
            {EFormTexts.details}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DynamicForm;
