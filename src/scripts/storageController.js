// storage functions
//############################################################################################################################################################
export function saveToStorage(projectsData) {
  localStorage.clear();
  localStorage.setItem("projectsData", JSON.stringify(projectsData));
}

export function loadFromStorage() {
  return JSON.parse(localStorage.getItem("projectsData"));
}

//############################################################################################################################################################
