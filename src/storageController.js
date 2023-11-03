export function saveToStorage(projects, projectCategories) {
  localStorage.clear();
  const projectsData = projects.map((project) => project.projectData);
  localStorage.setItem("projectsData", JSON.stringify(projectsData));
  localStorage.setItem("categoriesData", JSON.stringify(projectCategories));
}

export function loadFromStorage() {
  const projectsData = JSON.parse(localStorage.getItem("projectsData"));
  const categoriesData = JSON.parse(localStorage.getItem("categoriesData"));
  return { projectsInfo: projectsData, categoriesInfo: categoriesData };
}

export function empty() {
  return localStorage.length ? false : true;
}
