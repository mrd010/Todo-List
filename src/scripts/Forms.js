import { pluginName } from "mini-css-extract-plugin";
import {
  createElement,
  appendChildren,
  createMaterialIcon,
} from "./elementCreator";

//#########################################################################################################
class Form {
  formBody;
  closeBtn;
  formTitle;
  submitBtn;
  constructor(formName) {
    this.formBody = createElement("form", undefined, ["action", "#"]);
    const formHeader = createElement("div", ".form-header");
    this.formTitle = createElement("h3", "form-header-title");
    this.formTitle.textContent = formName;
    this.closeBtn = createElement("button", "short-button");
    this.closeBtn.appendChild(
      createMaterialIcon("sharp", "button-icon", "close")
    );
    appendChildren(formHeader, [this.formTitle, this.closeBtn]);
    this.formBody.appendChild(formHeader);
    this.submitBtn.createElement("button", "submit-button", ["type", "submit"]);
  }

  get Body() {
    return this.formBody;
  }
}
//#########################################################################################################
export class ProjectForm extends Form {
  projectName;
  projectDesc;
  constructor(formTitle) {
    super(formTitle);
    this.projectName = createElement("div", "input-field", [
      "id",
      "project-name-field",
    ]);
    appendChildren(this.projectName, [
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
    this.projectName.querySelector("label").textContent = "Project Name";
    //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
    this.projectDesc = createElement("div", "input-field", [
      "id",
      "project-desc-field",
    ]);
    appendChildren(
      this.projectDesc,
      createElement("label", undefined, ["for", "project-desc"]),
      createElement(
        "textarea",
        undefined,
        ["name", "project-name"],
        ["id", "project-name"],
        ["row", "5"],
        ["col", "30"]
      )
    );
    this.projectDesc.querySelector("label").textContent = "Project Description";
    //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
    appendChildren(this.formBody, [
      this.projectName,
      this.projectDesc,
      this.submitBtn,
    ]);
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

class Confirm extends Form {
  constructor() {}
}
