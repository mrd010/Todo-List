import { ca } from "date-fns/locale";
import {
  createElement,
  appendChildren,
  createMaterialIcon,
} from "./elementCreator";

//#########################################################################################################
class Form {
  formBody;
  submitBtn;
  constructor(formName) {
    this.formBody = createElement("form", undefined, ["action", "#"]);
    this.submitBtn = createElement("button", "submit-button", [
      "type",
      "submit",
    ]);
    this.submitBtn.classList.add("text-button");
    this.submitBtn.textContent = formName;
  }

  get Body() {
    return this.formBody;
  }
}
//#########################################################################################################
export class ProjectForm extends Form {
  projectNameField;
  projectDescField;
  constructor(formTitle) {
    super(formTitle);
    this.projectNameField = createElement("div", "input-field", [
      "id",
      "project-name-field",
    ]);
    appendChildren(this.projectNameField, [
      createElement("label", undefined, ["for", "project-name"]),
      createElement(
        "input",
        undefined,
        ["type", "text"],
        ["name", "project-name"],
        ["id", "project-name"],
        ["required", true]
      ),
    ]);
    this.projectNameField.querySelector("label").textContent = "Project Name";
    //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
    this.projectDescField = createElement("div", "input-field", [
      "id",
      "project-desc-field",
    ]);
    appendChildren(this.projectDescField, [
      createElement("label", undefined, ["for", "project-desc"]),
      createElement(
        "textarea",
        undefined,
        ["name", "project-desc"],
        ["id", "project-desc"],
        ["col", "30"]
      ),
    ]);
    this.projectDescField.querySelector("label").textContent =
      "Project Description";
    //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
    appendChildren(this.formBody, [
      this.projectNameField,
      this.projectDescField,
      this.submitBtn,
    ]);
  }

  get formData() {
    return {
      projectName: this.projectNameField.querySelector("input").value,
      projectDesc: this.projectDescField.querySelector("textarea").value,
    };
  }

  setFormValues(projectName, projectDesc) {
    this.projectNameField.querySelector("input").value = projectName;
    this.projectDescField.querySelector("textarea").value = projectDesc;
  }
}
//#########################################################################################################
class TaskForm extends Form {
  type;
  taskName;
  taskDesc;
  taskDueDate;
  taskPriority;
  constructor(type) {
    if (type == "add") {
      super("Add Project");
    } else if (type == "edit") {
      super("Edit Project");
    }
    this.type = type;
  }
}
//#########################################################################################################

export class DeleteForm extends Form {
  alert;
  cancelButton;
  constructor() {
    super("Delete Project");
    this.formBody.classList.add("delete-project-form");
    this.alert = createElement("div", "confirm-alert");
    this.alert.textContent = "All tasks inside project will be removed!";
    this.cancelButton = createElement("button", "cancel-button");
    this.cancelButton.textContent = "Cancel";
    appendChildren(this.formBody, [
      this.alert,
      this.cancelButton,
      this.submitBtn,
    ]);
  }
}
//#########################################################################################################
export class EditProjectForm extends ProjectForm {
  cancelButton;
  constructor() {
    super("Save Project");
    this.formBody.classList.add("edit-project-form");
    this.cancelButton = createElement("button", "cancel-button");
    this.cancelButton.textContent = "Cancel";
    this.formBody.appendChild(this.cancelButton);
  }
}
