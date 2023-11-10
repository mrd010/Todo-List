// storage functions
//############################################################################################################################################################
export function saveToStorage(projectsData) {
  localStorage.setItem("projectsData", JSON.stringify(projectsData));
}

export function loadFromStorage() {
  return JSON.parse(localStorage.getItem("projectsData"));
}

//############################################################################################################################################################

export function clear() {
  localStorage.clear();
}
