import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import DynamicForm from "../components/DynamicForm/DynamicForm";
import AddFieldModal from "../components/AddFieldModal/AddFieldModal";
import { EAddModalTexts, EValidationErrors } from "../helpers/constants";

test("renders AddFieldModal component", () => {
  const mockClose = jest.fn();
  const mockSetFields = jest.fn();
  render(
    <AddFieldModal
      isModalOpen
      closeModal={mockClose}
      setFields={mockSetFields}
    />
  );

  expect(screen.getByText(EAddModalTexts.addNew)).toBeInTheDocument();
  expect(screen.getByText(EAddModalTexts.addField)).toBeInTheDocument();
  expect(screen.getByText(EAddModalTexts.close)).toBeInTheDocument();
});

test("validate AddFieldModal submit, empty", async () => {
  const mockClose = jest.fn();
  const mockSetFields = jest.fn();
  render(
    <AddFieldModal
      isModalOpen
      closeModal={mockClose}
      setFields={mockSetFields}
    />
  );

  fireEvent.click(screen.getByText(EAddModalTexts.addField));

  await (() =>
    expect(screen.getByText(EValidationErrors.required)).toBeInTheDocument());
});

test("validate AddFieldModal submit, filled name and added", async () => {
  render(<DynamicForm />);
  const mockClose = jest.fn();
  const mockSetFields = jest.fn();
  render(
    <AddFieldModal
      isModalOpen
      closeModal={mockClose}
      setFields={mockSetFields}
    />
  );

  userEvent.type(
    screen.getByPlaceholderText(EAddModalTexts.placeholder),
    "Dog name"
  );
  fireEvent.click(screen.getByText(EAddModalTexts.addField));

  // Check if it's added in the main form
  await (() => expect(screen.getByText("Dog name")).toBeInTheDocument());
});
