import * as Workspace from "./workspace";
import { ProjectForm, DeleteForm, EditProjectForm } from "./Forms";
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
    deleteBtn.classList.add("delete-button");
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
        showEditProjectForm(projectButton);
      });

    projectButton
      .querySelector(".delete-button")
      .addEventListener("click", (e) => {
        showDeleteProjectForm(projectButton);
      });
  });
}

let openedForm = {
  formBtn: null,
  formType: "",
};

function showEditProjectForm(projectBtn) {
  const form = document.querySelector("#projects-nav form");
  if (openedForm.formBtn == projectBtn && openedForm.formType == "edit") {
    form.remove();
    openedForm.formBtn = null;
    openedForm.formType = "";
    projectBtn.classList.remove("selected-for-edit");
  } else {
    if (form) {
      form.remove();
      openedForm.formBtn.classList.remove("selected-for-edit");
      openedForm.formBtn.classList.remove("selected-for-delete");
    }

    const projectId = projectBtn.getAttribute("data-project-id");
    const editProjectForm = new EditProjectForm();
    editProjectForm.setFormValues(
      Workspace.projectData(projectId).projectTitle,
      Workspace.projectData(projectId).projectDescription
    );
    projectBtn.insertAdjacentElement("afterend", editProjectForm.Body);
    editProjectForm.submitBtn.addEventListener("click", () => {
      const projectData = editProjectForm.formData;
      Workspace.editProject(
        projectId,
        projectData.projectName,
        projectData.projectDesc
      );
      refreshSideBar();
      openedForm.formBtn = null;
      openedForm.formType = "";
    });
    editProjectForm.cancelButton.addEventListener("click", () => {
      editProjectForm.Body.remove();
      openedForm.formBtn = null;
      openedForm.formType = "";
      projectBtn.classList.remove("selected-for-edit");
    });
    openedForm.formBtn = projectBtn;
    openedForm.formType = "edit";
    projectBtn.classList.add("selected-for-edit");
  }
}

function showDeleteProjectForm(projectBtn) {
  const form = document.querySelector("#projects-nav form");
  if (openedForm.formBtn == projectBtn && openedForm.formType == "delete") {
    form.remove();
    openedForm.formBtn = null;
    openedForm.formType = "";
    projectBtn.classList.remove("selected-for-delete");
  } else {
    if (form) {
      form.remove();
      openedForm.formBtn.classList.remove("selected-for-edit");
      openedForm.formBtn.classList.remove("selected-for-delete");
    }

    const deleteForm = new DeleteForm();
    projectBtn.insertAdjacentElement("afterend", deleteForm.Body);
    deleteForm.submitBtn.addEventListener("click", () => {
      Workspace.deleteProject(projectBtn.getAttribute("data-project-id"));
      refreshSideBar();
      openedForm.formBtn = null;
      openedForm.formType = "";
    });
    deleteForm.cancelButton.addEventListener("click", () => {
      deleteForm.Body.remove();
      openedForm.formBtn = null;
      openedForm.formType = "";
      projectBtn.classList.remove("selected-for-delete");
    });

    openedForm.formBtn = projectBtn;
    openedForm.formType = "delete";
    projectBtn.classList.add("selected-for-delete");
  }
}

let currentOpenedProjectId;

function showProject() {
  const projectData = Workspace.projectData(
    this.getAttribute("data-project-id")
  );
  createProjectPage(projectData);
}

function createProjectPage({
  projectTitle: projectTitle,
  projectDescription: projectDescription,
  projectTasks: projectTasks,
  projectId: projectId,
}) {
  const projectPage = createElement("div", "project-page");
  const pageHeader = createElement("h2", "project-header");
  pageHeader.textContent = projectTitle;
  const pageDesc = createElement("p", "project-desc");
  pageDesc.textContent = projectDescription;
  appendChildren(projectPage, [pageHeader, pageDesc]);
  const pageTasks = createElement("div", "project-tasks");
  const pageTasksHeader = createElement("div", "project-tasks-header");
  const pageTasksHeaderTitle = createElement("h3", "project-tasks-header");
  pageTasksHeaderTitle.textContent = "Tasks";
  const addTaskMenu = createElement("div", "add-task-menu");
  const addTaskBtn = createElement("button", "text-button", [
    "data-project-id",
    projectId,
  ]);
  addTaskBtn.classList.add("add-task-button");
  addTaskBtn.textContent = "Create Task";
  addTaskBtn.addEventListener("click", showNewTaskForm);
  addTaskMenu.appendChild(addTaskBtn);
  appendChildren(pageTasksHeader, [pageTasksHeaderTitle, addTaskMenu]);
  pageTasks.appendChild(pageTasksHeader);
  const pageTasksList = createElement("div", "project-tasks-list");
  projectTasks.forEach((task) => {});
  pageTasks.appendChild(pageTasksList);
  projectPage.appendChild(pageTasks);
  return projectPage;
}

function createProjectTaskBar() {}

function showNewTaskForm() {
  const addTaskMenu = this.parentNode;
  const form = addTaskMenu.querySelector("form");
  if (form) {
    form.remove();
    this.classList.remove("opened");
  } else {
  }
}
