import * as ElementCreator from "./elementCreator";
import { nameToId } from "./elementCreator";

const createCloseButton = () => {
  const closeButton = ElementCreator.createElement("button", "short-button");
  closeButton.classList.add("close-form");
  closeButton.appendChild(
    ElementCreator.createMaterialIcon("rounded", "button-icon", "close")
  );
  return closeButton;
};

const createFormHeader = (headerSize, headerContent) => {
  const formHeader = ElementCreator.createElement(
    `h${headerSize}`,
    "form-header"
  );
  formHeader.textContent = headerContent;
  return formHeader;
};

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

const createFormButton = (type, name, classList) => {
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
  formField.appendChild(button);
  return formField;
};
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
  const selectCategory = createFormSelect("Categories", categories, true);
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

const newProjectListForm = () => {};
const newTaskForm = () => {};
