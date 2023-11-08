import * as Workspace from "./workspace";
import { ProjectForm } from "./Forms";
import {
  appendChildren,
  createElement,
  createMaterialIcon,
} from "./elementCreator";

//#########################################################################################################

export function initialize() {
  document
    .querySelector("#add-project-button")
    .addEventListener("click", toggleAddProjectForm);
  console.log(Workspace.allProjects());
  refreshSideBar();
}

function toggleAddProjectForm() {
  this.classList.toggle("pressed");
  let wrapper = document.querySelector("#add-project-menu .wrapper");
  if (!wrapper && this.classList.contains("pressed")) {
    const addProjectForm = new ProjectForm("Add Project");
    let wrapper = document.querySelector("#add-project-menu .wrapper");
    wrapper = createElement("div", "wrapper");
    wrapper.appendChild(addProjectForm.Body);
    document.querySelector("#add-project-menu").appendChild(wrapper);
    addProjectForm.Body.querySelector(".submit-button").addEventListener(
      "click",
      (e) => {
        e.preventDefault();
        submitNewProjectForm(addProjectForm);
        wrapper.remove();
        this.classList.remove("pressed");
      }
    );
  }
}

function submitNewProjectForm(projectForm) {
  const projectData = projectForm.formData;
  Workspace.createProject(projectData.projectName, projectData.projectName);
  refreshSideBar();
}

function refreshSideBar() {
  const projectNavContainer = document.querySelector("#projects-nav");
  let wrapper = projectNavContainer.querySelector(".wrapper");
  if (wrapper) {
    wrapper.remove();
  }
  wrapper = createElement("div", "wrapper");
  Workspace.allProjects().forEach((projectData) => {
    const projectBtn = createElement("button", "projects-nav-button", [
      "data-project-id",
      `${projectData.projectId}`,
    ]);
    projectBtn.textContent = projectData.projectTitle;
    const editBtn = createElement("button", "short-button");
    editBtn.classList.add("edit-button");
    editBtn.appendChild(createMaterialIcon("sharp", "button-icon", "edit"));
    const deleteBtn = createElement("button", "short-button");
    editBtn.classList.add("delete-button");
    deleteBtn.appendChild(createMaterialIcon("sharp", "button-icon", "delete"));
    appendChildren(projectBtn, [editBtn, deleteBtn]);
    wrapper.appendChild(projectBtn);
  });
  projectNavContainer.appendChild(wrapper);
  // add events
  const projectButtons = projectNavContainer.querySelectorAll(
    ".projects-nav-button"
  );
  projectButtons.forEach((projectButton) => {
    projectButton.addEventListener("click", showProject);

    projectButton
      .querySelector(".edit-button")
      .addEventListener("click", (e) => {
        showEditProjectForm(projectButton, e);
      });

    projectButton
      .querySelector(".delete-button")
      .addEventListener("click", (e) => {
        showDeleteProjectForm(projectButton, e);
      });
  });
}

function showProject() {
  const projectData = Workspace.projectData(
    this.getAttribute("data-project-id")
  );
}

function showEditProjectForm(projectBtn, e) {}
function showDeleteProjectForm(projectBtn, e) {}
