import { getProjects, getCategories } from "./workspace";

//############################################################################################################################################################
export function newListFormIsValid(formData) {
  const list = getCategories();
  if (list.includes(formData["list-name"])) {
    return Response(false, "This name already exists in categories");
  }
  return Response(true);
}

function Response(v, m = null) {
  return { valid: v, message: m };
}

//############################################################################################################################################################
export function newProjectFormIsValid(formData) {
  const projects = getProjects();
  if (
    projects.some(
      (project) => formData["project-name"] == project.projectData.Title
    )
  ) {
    return Response(false, "A project with this name already exists");
  } else return Response(true);
}

//############################################################################################################################################################
export function newTaskFormIsValid(formData, project) {
  return Response(true);
}
