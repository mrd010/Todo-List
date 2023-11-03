import Project from "./project";
import * as Storage from "./storageController";
import Task from "./task";

const projects = [];
const projectCategories = [];

// private functions
function saveWorkspace() {
  Storage.saveToStorage(projects, projectCategories);
}

function fetchWorkspaceInfo() {
  const workspaceInfo = Storage.loadFromStorage();
  return workspaceInfo;
}

function createWorkspace(workspaceInfo) {
  workspaceInfo.categoriesInfo.forEach((category) => {
    projectCategories.push(category);
  });
  workspaceInfo.projectsInfo.forEach((projectInfo) => {
    const newProject = new Project(
      projectInfo["Title"],
      projectInfo["Description"],
      projectInfo["Category"]
    );
    projectInfo["Tasks"].forEach((taskInfo) => {
      const newTask = new Task(
        taskInfo["Title"],
        taskInfo["Description"],
        taskInfo["DueDate"],
        taskInfo["Priority"]
      );
      newProject.addTask(newTask);
    });
    projects.push(newProject);
  });
  console.log(projects);
}

// public functions
export function load() {
  if (!Storage.empty()) {
    createWorkspace(fetchWorkspaceInfo());
  }
}

export function getCategories() {
  if (projectCategories.length) {
    return projectCategories;
  } else {
    return ["Default Category"];
  }
}

export function addToCategories(category) {
  projectCategories.push(category);
}

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
