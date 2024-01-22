import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import DynamicForm from "../components/DynamicForm/DynamicForm";
import { EFormTexts, EValidationErrors } from "../helpers/constants";

test("renders DynamicForm component", () => {
  render(<DynamicForm />);

  // Check texts that are always there, submit button might not be present if default form is empty
  expect(screen.getByText(EFormTexts.formTitle)).toBeInTheDocument();
  expect(screen.getByText(EFormTexts.addField)).toBeInTheDocument();
  expect(screen.getByText(EFormTexts.refreshForm)).toBeInTheDocument();
  expect(screen.getByText(EFormTexts.choiceTitle)).toBeInTheDocument();
  expect(screen.getByText(EFormTexts.basic)).toBeInTheDocument();
  expect(screen.getByText(EFormTexts.login)).toBeInTheDocument();
  expect(screen.getByText(EFormTexts.details)).toBeInTheDocument();
});

test("validate DynamicForm submit, empty", async () => {
  render(<DynamicForm />);

  fireEvent.click(screen.getByText(EFormTexts.submit));

  await (() =>
    expect(screen.getByText(EValidationErrors.required)).toBeInTheDocument());
});

test("validate DynamicForm submit, filled name", async () => {
  render(<DynamicForm />);
  userEvent.type(screen.getByPlaceholderText("Name"), "Jon Snow");
  fireEvent.click(screen.getByText(EFormTexts.submit));

  await (() =>
    expect(
      screen.getByText(EValidationErrors.numberRequired)
    ).toBeInTheDocument());
});

test("validate DynamicForm submit, filled number with string", async () => {
  render(<DynamicForm />);
  userEvent.type(screen.getByPlaceholderText("Name"), "Jon Snow");
  userEvent.type(screen.getByPlaceholderText("Favourite number"), "Robb Stark");
  fireEvent.click(screen.getByText(EFormTexts.submit));

  await (() =>
    expect(
      screen.getByText(EValidationErrors.numberRequired)
    ).toBeInTheDocument());
});
