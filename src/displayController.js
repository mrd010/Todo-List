import * as Workspace from "./workspace";
import * as ElementCreator from "./elementCreator";
import * as Forms from "./formGenerator";
import * as FormValidator from "./formValidator";
import * as SectionCreator from "./layoutSectionCreator";
import { newForm } from "./formGenerator";

// private functions
//############################################################################################################################################################
function initEventListeners() {
  document
    .querySelector("#new-project")
    .addEventListener("click", () => showForm("new_project"));

  document.querySelector("#new-list").addEventListener("click", () => {
    showForm("new_list");
  });
}

//############################################################################################################################################################
function showForm(formType, project = null) {
  let form;
  switch (formType) {
    case "new_project":
      form = Forms.newProjectForm(Workspace.getCategories());
      break;
    case "new_list":
      form = Forms.newProjectListForm();
      break;
    case "new_task":
      form = Forms.newTaskForm(project);
      break;

    default:
      break;
  }
  showOverlayForm(form, formType);
}

//############################################################################################################################################################
function showOverlayForm(form, formType) {
  const overlayForm = ElementCreator.createElement(
    "elementTag",
    "overlay-form"
  );
  overlayForm.appendChild(form);
  overlayForm.querySelector(".close-form").addEventListener("click", () => {
    closeForm(overlayForm);
  });
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let validation;
    const formData = Object.fromEntries(new FormData(form));
    switch (formType) {
      case "new_project":
        validation = FormValidator.newProjectFormIsValid(formData);
        if (validation.valid) {
          Workspace.addProject(formData);
        }
        break;

      case "new_list":
        validation = FormValidator.newListFormIsValid(formData);
        if (validation.valid) {
          Workspace.addCategory(formData);
        }
        break;
      case "new_task":
        const projectId = form.getAttribute("data-project-id");
        const project = Workspace.getProjects().find(
          (prj) => prj.Id == projectId
        );
        validation = FormValidator.newTaskFormIsValid(formData, project);
        if (validation.valid) {
          project.addTaskFromData(formData);
        }
        break;
      default:
        break;
    }

    if (validation.valid) {
      closeForm(overlayForm);
    } else {
      showFormError(form, validation.message);
    }
  });
  document.body.appendChild(overlayForm);
}

//############################################################################################################################################################
function closeForm(overlayForm) {
  overlayForm.style.display = "none";
  overlayForm.remove();
}

//############################################################################################################################################################
function showFormError(form, errorMessage) {
  let error = form.querySelector(".error-container");
  if (error) {
    error.remove();
  }
  error = Forms.createFormError(errorMessage);
  form.appendChild(error);
}

//############################################################################################################################################################
function showProject(project) {
  const appContentContainer = document.querySelector("#app-content");
  let wrapper = appContentContainer.querySelector(".wrapper");
  if (wrapper) {
    wrapper.remove();
  }
  wrapper = SectionCreator.createProjectPage(project);
  appContentContainer.appendChild(wrapper);

  const newTaskBtns = document.querySelector("#app-content .new-task-button");
  newTaskBtns.addEventListener("click", () => {
    showForm("new_task", project);
  });
}

// public functions
//############################################################################################################################################################
export function loadDefaultPage() {
  initEventListeners();
  Workspace.load();
}

//############################################################################################################################################################
export function refreshSideBar(projects, projectsCategories) {
  const categoriesContainer = document.querySelector("#custom-categories");
  let wrapper = categoriesContainer.querySelector(".wrapper");
  if (wrapper) {
    wrapper.remove();
  }

  wrapper = ElementCreator.createElement("div", "wrapper");
  projectsCategories.forEach((category) => {
    const projectList = projects.filter(
      (project) => project.Category === category
    );
    const newSection = SectionCreator.createSideMenuSection(
      category,
      projectList
    );
    wrapper.appendChild(newSection);
  });
  categoriesContainer.appendChild(wrapper);

  const projectBtns = categoriesContainer.querySelectorAll(".long-button");
  projectBtns.forEach((projectBtn) => {
    projectBtn.addEventListener("click", () => {
      const projectId = projectBtn.getAttribute("data-project-id");
      showProject(Workspace.getProject(projectId));
    });
  });
}

//############################################################################################################################################################
export function refreshDisplayContents(projects, projectsCategories) {
  refreshSideBar(projects, projectsCategories);
}
