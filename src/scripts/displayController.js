import * as Workspace from "./workspace";
import { ProjectForm } from "./Forms";
import { createElement } from "./elementCreator";

//#########################################################################################################
export function initialize() {
  document
    .querySelector("#add-project-button")
    .addEventListener("click", toggleAddProjectForm);
}

function toggleAddProjectForm() {
  const addProjectForm = new ProjectForm("Add Project");
  let wrapper = document.querySelector("#add-project-form .wrapper");
  if (wrapper) {
    wrapper.remove();
  }
  wrapper = createElement("div", "wrapper");
  wrapper.appendChild(addProjectForm.Body);
  this.classList.toggle("pressed");
}
