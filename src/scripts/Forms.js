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
}
//#########################################################################################################
export class TaskForm extends Form {
  taskName;
  taskDesc;
  taskDueDate;
  taskPriority;
  constructor(submitName) {
    super(submitName);
    this.taskNameField = createElement("div", "input-field", [
      "id",
      "task-name-field",
    ]);
    appendChildren(this.taskNameField, [
      createElement("label", undefined, ["for", "task-name"]),
      createElement(
        "input",
        undefined,
        ["type", "text"],
        ["name", "task-name"],
        ["id", "task-name"],
        ["required", true]
      ),
    ]);
    this.taskNameField.querySelector("label").textContent = "Task Title";
    //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
    this.taskDescField = createElement("div", "input-field", [
      "id",
      "task-desc-field",
    ]);
    appendChildren(this.taskDescField, [
      createElement("label", undefined, ["for", "task-desc"]),
      createElement(
        "textarea",
        undefined,
        ["name", "task-desc"],
        ["id", "task-desc"],
        ["col", "30"]
      ),
    ]);
    this.taskDescField.querySelector("label").textContent = "Task Description";
    //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
    this.taskDueDate = createElement("div", "input-field", [
      "id",
      "task-due-date",
    ]);
    appendChildren(this.taskDueDate, [
      createElement("label", undefined, ["for", "task-due-date"]),
      createElement(
        "input",
        undefined,
        ["type", "date"],
        ["name", "task-due-date"],
        ["id", "task-due-date"]
      ),
    ]);
    this.taskDueDate.querySelector("label").textContent = "Task Due Date";
    //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
    this.taskPriority = createElement("div", "input-field", [
      "id",
      "task-priority",
    ]);
    const label = createElement("label");
    const sw = createElement("label", "switch");
    appendChildren(sw, [
      createElement("input", undefined, ["type", "checkbox"]),
      createElement("span", "slider"),
    ]);
    label.textContent = "Priority";
    this.taskPriority.appendChild(label);
    this.taskPriority.appendChild(sw);
    //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
    appendChildren(this.formBody, [
      this.taskNameField,
      this.taskDescField,
      this.taskDueDate,
      this.taskPriority,
      this.submitBtn,
    ]);
  }

  get formData() {
    return {
      taskTitle: this.taskNameField.querySelector("input[type='text']").value,
      taskDesc: this.taskDescField.querySelector("textarea").value,
      taskDueDate: new Date(
        this.taskDueDate.querySelector("input[type='date']").value
      ),
      taskPriority: this.taskPriority.querySelector("input[type='checkbox']")
        .checked,
    };
  }
}
//#########################################################################################################

export class DeleteForm extends Form {
  alert;
  cancelButton;
  constructor(action) {
    super(action);
    this.alert = createElement("div", "confirm-alert");
    this.cancelButton = createElement("button", "cancel-button");
    this.cancelButton.textContent = "Cancel";
    appendChildren(this.formBody, [
      this.alert,
      this.cancelButton,
      this.submitBtn,
    ]);
  }
}

export class DeleteProjectForm extends DeleteForm {
  constructor() {
    super("Delete Project");
    this.formBody.classList.add("delete-project-form");
    this.alert.textContent = "All tasks inside project will be removed!";
  }
}

export class DeleteTaskForm extends DeleteForm {
  constructor() {
    super("Delete Task");
    this.formBody.classList.add("delete-task-form");
    this.alert.textContent = "This task will be removed for forever";
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

  setFormValues(projectName, projectDesc) {
    this.projectNameField.querySelector("input").value = projectName;
    this.projectDescField.querySelector("textarea").value = projectDesc;
  }
}
//#########################################################################################################
export class EditTaskForm extends TaskForm {
  cancelButton;
  constructor() {
    super("Save Task");
    this.formBody.classList.add("edit-task-form");
    this.cancelButton = createElement("button", "cancel-button");
    this.cancelButton.textContent = "Cancel";
    this.formBody.appendChild(this.cancelButton);
  }

  setFormValues(taskName, taskDesc, taskDueDate, taskPriority) {
    this.taskNameField.querySelector("input").value = taskName;
    this.taskDescField.querySelector("textarea").value = taskDesc;
    this.taskDueDate.querySelector("input").value = taskDueDate;
    this.taskPriority.querySelector("checkbox").value = taskPriority;
  }
}
