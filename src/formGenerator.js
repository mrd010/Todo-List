import * as ElementCreator from "./elementCreator";
import { nameToId } from "./elementCreator";

// private functions
//############################################################################################################################################################
const createCloseButton = () => {
  const closeButton = ElementCreator.createElement("button", "short-button");
  closeButton.classList.add("close-form");
  closeButton.appendChild(
    ElementCreator.createMaterialIcon("rounded", "button-icon", "close")
  );
  return closeButton;
};

//############################################################################################################################################################
const createFormHeader = (headerSize, headerContent) => {
  const formHeader = ElementCreator.createElement(
    `h${headerSize}`,
    "form-header"
  );
  formHeader.textContent = headerContent;
  return formHeader;
};

//############################################################################################################################################################
const createFormTextInput = (name, required = false) => {
  const formField = ElementCreator.createElement("div", "form-field");
  const label = ElementCreator.createElement("label", undefined, [
    "for",
    nameToId(name),
  ]);
  label.textContent = name;
  const input = ElementCreator.createElement(
    "input",
    undefined,
    ["type", "text"],
    ["id", nameToId(name)],
    ["name", nameToId(name)],
    ["required", required]
  );
  ElementCreator.appendChildren(formField, [label, input]);
  return formField;
};

//############################################################################################################################################################
const createFormDateInput = (name, required = false) => {
  const formField = ElementCreator.createElement("div", "form-field");
  const label = ElementCreator.createElement("label", undefined, [
    "for",
    nameToId(name),
  ]);
  label.textContent = name;
  const input = ElementCreator.createElement(
    "input",
    undefined,
    ["type", "date"],
    ["id", nameToId(name)],
    ["name", nameToId(name)],
    ["required", required]
  );
  ElementCreator.appendChildren(formField, [label, input]);
  return formField;
};

//############################################################################################################################################################
const createFormFlipButton = (name, required = false) => {
  const formField = ElementCreator.createElement("div", "flipswitch");
  const label = ElementCreator.createElement("label", "flipswitch-label", [
    "for",
    nameToId(name),
  ]);
  ElementCreator.appendChildren(label, [
    ElementCreator.createElement("div", "flipswitch-inner"),
    ElementCreator.createElement("div", "flipswitch-switch"),
  ]);
  const input = ElementCreator.createElement(
    "input",
    "flipswitch-cb",
    ["type", "checkbox"],
    ["id", nameToId(name)],
    ["name", nameToId(name)]
  );
  ElementCreator.appendChildren(formField, [input, label]);
  return formField;
};

//############################################################################################################################################################
const createFormTextArea = (name, required = false) => {
  const formField = ElementCreator.createElement("div", "form-field");
  const label = ElementCreator.createElement("label", undefined, [
    "for",
    nameToId(name),
  ]);
  label.textContent = name;
  const input = ElementCreator.createElement(
    "textarea",
    undefined,
    ["id", nameToId(name)],
    ["name", nameToId(name)],
    ["cols", "30"],
    ["rows", "5"]
  );
  ElementCreator.appendChildren(formField, [label, input]);
  return formField;
};

//############################################################################################################################################################
const createFormSelect = (name, list, required = false) => {
  const formField = ElementCreator.createElement("div", "form-field");
  const label = ElementCreator.createElement("label", undefined, [
    "for",
    nameToId(name),
  ]);
  label.textContent = name;
  const input = ElementCreator.createElement(
    "select",
    undefined,
    ["id", nameToId(name)],
    ["name", nameToId(name)],
    ["required", required]
  );
  list.forEach((item) => {
    let option = ElementCreator.createElement("option", undefined, [
      "value",
      item,
    ]);
    option.textContent = item;
    input.appendChild(option);
  });
  ElementCreator.appendChildren(formField, [label, input]);
  return formField;
};

//############################################################################################################################################################
const createFormButton = (type, name, classList, attributes = null) => {
  const formField = ElementCreator.createElement("div", "form-field");
  const button = ElementCreator.createElement(
    "button",
    undefined,
    ["id", nameToId(name)],
    ["type", type]
  );
  button.textContent = name;
  classList.forEach((className) => {
    button.classList.add(className);
  });
  if (attributes) {
    button.setAttribute(attributes[0], attributes[1]);
  }
  formField.appendChild(button);
  return formField;
};

// public functions
//############################################################################################################################################################
export const newProjectForm = (categories) => {
  // create form
  const form = ElementCreator.createElement("form", "new-project");

  ElementCreator.appendChildren(form, [
    createCloseButton(),
    createFormHeader("3", "Create Project"),
  ]);

  // create form content
  const formContent = ElementCreator.createElement("div", "form-content");

  const projectName = createFormTextInput("Project Name", true);
  const projectDesc = createFormTextArea("Project Description");
  const selectCategory = createFormSelect("Category", categories, true);
  const submitBtn = createFormButton("submit", "Add Project", [
    "form-button",
    "long-button",
  ]);
  ElementCreator.appendChildren(formContent, [
    projectName,
    projectDesc,
    selectCategory,
    submitBtn,
  ]);

  form.appendChild(formContent);
  return form;
};

//############################################################################################################################################################
export const newProjectListForm = () => {
  // create form
  const form = ElementCreator.createElement("form", "new-list");

  ElementCreator.appendChildren(form, [
    createCloseButton(),
    createFormHeader("3", "New List"),
  ]);

  // create form content
  const formContent = ElementCreator.createElement("div", "form-content");

  const listName = createFormTextInput("List Name", true);
  const submitBtn = createFormButton("submit", "Add List", [
    "form-button",
    "long-button",
  ]);
  ElementCreator.appendChildren(formContent, [listName, submitBtn]);

  form.appendChild(formContent);
  return form;
};
//############################################################################################################################################################
export const newTaskForm = (project) => {
  // create form
  const form = ElementCreator.createElement("form", "new-task", [
    "data-project-id",
    `${project.Id}`,
  ]);

  ElementCreator.appendChildren(form, [
    createCloseButton(),
    createFormHeader("3", "New Task"),
  ]);

  // create form content
  const formContent = ElementCreator.createElement("div", "form-content");

  const taskTitle = createFormTextInput("Task Title", true);
  const taskDesc = createFormTextArea("Task Description");
  const taskDueDate = createFormDateInput("Task Due Date", true);
  const priority = createFormFlipButton("Priority");
  const submitBtn = createFormButton("submit", "Add Task", [
    "form-button",
    "long-button",
  ]);
  ElementCreator.appendChildren(formContent, [
    taskTitle,
    taskDesc,
    taskDueDate,
    priority,
    submitBtn,
  ]);

  form.appendChild(formContent);
  return form;
};

//############################################################################################################################################################
export function createFormError(errorMessage) {
  const errorWrapper = ElementCreator.createElement("div", "error-container");
  const errorIcon = ElementCreator.createMaterialIcon(
    "rounded",
    "text-icon",
    "error"
  );
  const errorText = ElementCreator.createElement("p", "error");
  errorText.textContent = errorMessage;
  ElementCreator.appendChildren(errorWrapper, [errorIcon, errorText]);
  return errorWrapper;
}
