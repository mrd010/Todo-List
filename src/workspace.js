import Project from "./project";
import * as DisplayController from "./displayController";
import * as Storage from "./storageController";
import Task from "./task";

// variables
//############################################################################################################################################################
const projects = [];
const projectCategories = [];

// private functions
//############################################################################################################################################################
function fetchWorkspaceInfo() {
  const workspaceInfo = Storage.loadFromStorage();
  return workspaceInfo;
}

//############################################################################################################################################################
function createWorkspace(workspaceInfo) {
  workspaceInfo.categoriesInfo.forEach((category) => {
    if (category != "Default") {
      projectCategories.push(category);
    }
  });
  workspaceInfo.projectsInfo.forEach((projectInfo) => {
    const newProject = new Project(
      projectInfo["Title"],
      projectInfo["Description"],
      projectInfo["Category"],
      projectInfo["ID"]
    );

    projectInfo["Tasks"].forEach((taskInfo) => {
      const newTask = new Task(
        taskInfo["Title"],
        taskInfo["Description"],
        taskInfo["DueDate"],
        taskInfo["Priority"],
        taskInfo["Done"],
        taskInfo["ID"]
      );
      newProject.addTask(newTask);
    });
    projects.push(newProject);
  });
  console.log(projects);
  console.log(projectCategories);
}

// public functions
//############################################################################################################################################################
export function saveWorkspace() {
  Storage.saveToStorage(projects, projectCategories);
}

//############################################################################################################################################################
export function load() {
  // localStorage.clear();
  projectCategories.push("Default");
  if (!Storage.empty()) {
    createWorkspace(fetchWorkspaceInfo());
  }

  DisplayController.refreshSideBar(projects, projectCategories);
}

//############################################################################################################################################################
export function getProjects() {
  return projects;
}

//############################################################################################################################################################
export function getCategories() {
  return projectCategories;
}

//############################################################################################################################################################
export function addCategory(data) {
  const categoryName = data["list-name"];
  projectCategories.push(categoryName);
  saveWorkspace();

  DisplayController.refreshSideBar(projects, projectCategories);
}

//############################################################################################################################################################
export function addProject(data) {
  projects.push(
    new Project(
      data["project-name"],
      data["project-description"],
      data["categories"]
    )
  );
  saveWorkspace();
}

//############################################################################################################################################################
export function getProject(projectId) {
  const selectedProject = projects.find((project) => project.Id == projectId);

  return selectedProject;
}
