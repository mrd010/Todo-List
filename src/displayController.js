import * as Workspace from "./workspace";
import * as ElementCreator from "./elementCreator";
import * as Forms from "./formGenerator";
import { newForm } from "./formGenerator";

export function loadDefaultPage() {
  initEventListeners();
  Workspace.load();
}

function initEventListeners() {
  document
    .querySelector("#new-project")
    .addEventListener("click", () => showForm("new_project"));
}

function showForm(formType) {
  let form;
  switch (formType) {
    case "new_project":
      form = Forms.newProjectForm(Workspace.getCategories());
      break;

    default:
      break;
  }
  showOverlayForm(form);
}

function showOverlayForm(form) {
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
    const formData = new FormData(form);
    Workspace.addProject(Object.fromEntries(formData));
    closeForm(overlayForm);
  });
  document.body.appendChild(overlayForm);
}

function closeForm(overlayForm) {
  overlayForm.style.display = "none";
  overlayForm.remove();
}
