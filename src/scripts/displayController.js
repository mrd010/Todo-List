import * as Workspace from "./workspace";
import {
  ProjectForm,
  DeleteForm,
  EditProjectForm,
  TaskForm,
  DeleteTaskForm,
  EditTaskForm,
} from "./Forms";
import {
  appendChildren,
  createElement,
  createMaterialIcon,
} from "./elementCreator";
import {
  formatDistanceToNow,
  format,
  subDays,
  addDays,
  compareAsc,
  compareDesc,
  isToday,
  isSameDay,
  isEqual,
  isFuture,
} from "date-fns";

//#########################################################################################################

export function initialize() {
  document
    .querySelector("#add-project-button")
    .addEventListener("click", toggleAddProjectForm);
  refreshSideBar();
  console.log(Workspace.allProjects());
}

function toggleAddProjectForm() {
  this.classList.toggle("pressed");
  let wrapper = document.querySelector("#add-project-menu .wrapper");
  if (!wrapper && this.classList.contains("pressed")) {
    const addProjectForm = new ProjectForm("Add Project");
    addProjectForm.Body.classList.add("new-project-form");
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
  Workspace.createProject(projectData.projectName, projectData.projectDesc);
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
    projectButton.addEventListener("click", () =>
      showProject(projectButton.getAttribute("data-project-id"))
    );

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
    editProjectForm.submitBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const projectData = editProjectForm.formData;
      Workspace.editProject(
        projectId,
        projectData.projectName,
        projectData.projectDesc
      );
      refreshSideBar();
      if (currentOpenedProjectId == projectId) {
        showProject(projectId);
      }

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
    deleteForm.submitBtn.addEventListener("click", (e) => {
      e.preventDefault();
      Workspace.deleteProject(projectBtn.getAttribute("data-project-id"));
      if (
        currentOpenedProjectId == projectBtn.getAttribute("data-project-id")
      ) {
        document.querySelector("#content .wrapper").remove();
      }
      currentOpenedProjectId = null;
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

let currentOpenedProjectId = null;

function showProject(projectId) {
  const projectData = Workspace.projectData(projectId);

  let wrapper = document.querySelector("#content .wrapper");
  if (wrapper) {
    wrapper.remove();
  }
  wrapper = createElement("div", "wrapper");
  wrapper.appendChild(createProjectPage(projectData));
  document.querySelector("#content").appendChild(wrapper);
  currentOpenedProjectId = projectId;
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
  if (!projectDescription) {
    pageDesc.style.display = "none";
  }
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
  addTaskBtn.classList.add("open-button");
  addTaskBtn.textContent = "Create Task";
  addTaskBtn.addEventListener("click", showNewTaskForm);
  addTaskMenu.appendChild(addTaskBtn);
  appendChildren(pageTasksHeader, [pageTasksHeaderTitle, addTaskMenu]);
  pageTasks.appendChild(pageTasksHeader);
  if (projectTasks.length) {
    const pageTasksList = createElement("div", "project-tasks-list");

    // -------
    const tasksHeaderRow = createElement("div", "tasks-header-row");
    let h = createElement("h5");
    h.textContent = "Priority";
    tasksHeaderRow.appendChild(h);

    h = createElement("h5");
    h.textContent = "Title";
    tasksHeaderRow.appendChild(h);

    h = createElement("h5");
    h.textContent = "Description";
    tasksHeaderRow.appendChild(h);

    h = createElement("h5");
    h.textContent = "Due Date";
    tasksHeaderRow.appendChild(h);

    h = createElement("h5");
    h.textContent = "Remaining Time";
    tasksHeaderRow.appendChild(h);

    h = createElement("h5");
    h.textContent = "Status";
    tasksHeaderRow.appendChild(h);

    h = createElement("h5");
    h.textContent = "Actions";
    tasksHeaderRow.appendChild(h);

    pageTasksList.appendChild(tasksHeaderRow);

    projectTasks
      .filter((task) => task.taskDone === false)
      .forEach((task) => {
        const taskRow = createProjectTaskRow(task);
        pageTasksList.appendChild(taskRow);
      });
    projectTasks
      .filter((task) => task.taskDone === true)
      .forEach((task) => {
        const taskRow = createProjectTaskRow(task);
        pageTasksList.appendChild(taskRow);
      });
    pageTasksList.querySelectorAll(".check-done").forEach((checkDone) => {
      const checkbox = checkDone.querySelector('input[type="checkbox"]');
      const tskId = checkbox.getAttribute("data-task-id");
      checkbox.addEventListener("change", () => {
        Workspace.changeTaskDoneStatus(projectId, tskId, checkbox.checked);
        showProject(projectId);
      });
    });
    pageTasksList.querySelectorAll(".edit-button").forEach((btn) => {
      btn.addEventListener("click", () =>
        showEditTaskForm(projectId, btn.getAttribute("data-task-id"), btn)
      );
    });
    pageTasksList.querySelectorAll(".delete-button").forEach((btn) => {
      btn.addEventListener("click", () =>
        showDeleteTaskForm(projectId, btn.getAttribute("data-task-id"), btn)
      );
    });
    pageTasks.appendChild(pageTasksList);
  }
  projectPage.appendChild(pageTasks);
  return projectPage;
}

function showNewTaskForm() {
  const addTaskMenu = this.parentNode;
  const projectId = this.getAttribute("data-project-id");
  const form = addTaskMenu.querySelector("form");
  if (form) {
    form.remove();
    this.classList.remove("pressed");
  } else {
    const taskForm = new TaskForm("Create Task");
    taskForm.Body.classList.add("new-task-form");
    addTaskMenu.appendChild(taskForm.Body);
    this.classList.add("pressed");

    taskForm.submitBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const taskData = taskForm.formData;
      Workspace.createTask(
        projectId,
        taskData.taskTitle,
        taskData.taskDesc,
        taskData.taskDueDate,
        taskData.taskPriority
      );
      taskForm.Body.remove();
      showProject(projectId);
    });
  }
}

function createProjectTaskRow(taskInfo) {
  const taskContainer = createElement("div", "tasks-row");

  const taskPriority = createMaterialIcon(
    "sharp",
    taskInfo.taskPriority ? "task-priority-on" : "task-priority",
    "label_important"
  );

  const taskTitle = createElement("span", "task-title");
  taskTitle.textContent = taskInfo.taskTitle;
  const taskDesc = createElement("span", "task-desc");
  taskDesc.textContent = taskInfo.taskDescription;
  const taskDueDate = createElement("time", "task-due-date", [
    "datetime",
    format(taskInfo.taskDueDate, "MM/dd/yyyy"),
  ]);
  taskDueDate.textContent = format(taskInfo.taskDueDate, "MM/dd/yyyy");
  const taskRemainingTime = createElement("span", "task-remain-time");
  taskRemainingTime.textContent = formatDistanceToNow(
    Date.parse(taskInfo.taskDueDate),
    { addSuffix: true }
  );

  const taskDone = createElement("div", "check-done");
  const label = createElement("label", "check-mark", [
    "for",
    `check-done-${taskInfo.taskId}`,
  ]);

  const iconName = taskInfo.taskDone ? "task_alt" : "radio_button_unchecked";
  const icon = createMaterialIcon("sharp", "check-mark-icon", iconName);
  label.appendChild(icon);

  const checkDoneBox = createElement(
    "input",
    undefined,
    ["type", "checkbox"],
    ["name", `check-done-${taskInfo.taskId}`],
    ["id", `check-done-${taskInfo.taskId}`],
    ["data-task-id", taskInfo.taskId]
  );
  checkDoneBox.checked = taskInfo.taskDone;

  const taskActions = createElement("div", "task-actions");
  const editBtn = createElement("button", "short-button", [
    "data-task-id",
    taskInfo.taskId,
  ]);
  editBtn.classList.add("edit-button");
  editBtn.appendChild(createMaterialIcon("sharp", "button-icon", "edit"));
  const deleteBtn = createElement("button", "short-button", [
    "data-task-id",
    taskInfo.taskId,
  ]);
  deleteBtn.classList.add("delete-button");
  deleteBtn.appendChild(createMaterialIcon("sharp", "button-icon", "delete"));
  appendChildren(taskActions, [editBtn, deleteBtn]);

  appendChildren(taskDone, [label, checkDoneBox]);
  appendChildren(taskContainer, [
    taskPriority,
    taskTitle,
    taskDesc,
    taskDueDate,
    taskRemainingTime,
    taskDone,
    taskActions,
  ]);
  taskContainer.style.backgroundColor = taskInfo.taskDone
    ? "#475569"
    : "#0ea5e9";
  taskContainer.style.opacity = taskInfo.taskDone ? "0.4" : "1";
  return taskContainer;
}
let openedTaskForm = {
  taskId: null,
  formType: "",
};

function showEditTaskForm(projectId, taskId, editBtn) {
  if (openedTaskForm.taskId === taskId && openedTaskForm.formType == "edit") {
    document.querySelector(".edit-task-form").remove();
    openedTaskForm.taskId = null;
    openedTaskForm.formType = "";
  } else {
    if (openedTaskForm.taskId !== null) {
      document.querySelector(`.${openedTaskForm.formType}-task-form`).remove();
    }
    let editForm = new EditTaskForm();
    const buttonPos = editBtn.getBoundingClientRect();
    editForm.Body.style.position = "fixed";
    editForm.Body.style.top = `${buttonPos.top}px`;
    editForm.Body.style.left = `${buttonPos.left}px`;
    document.body.appendChild(editForm.Body);
    editForm.submitBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const taskData = editForm.formData;
      Workspace.editProjectTask(
        projectId,
        taskId,
        taskData.taskTitle,
        taskData.taskDesc,
        taskData.taskDueDate,
        taskData.taskPriority
      );
      editForm.Body.remove();
      showProject(projectId);
      openedTaskForm.taskId = null;
      openedTaskForm.formType = "";
    });
    editForm.cancelButton.addEventListener("click", () => {
      editForm.Body.remove();
      openedTaskForm.taskId = null;
      openedTaskForm.formType = "";
    });
    openedTaskForm.taskId = taskId;
    openedTaskForm.formType = "edit";
  }
}
function showDeleteTaskForm(projectId, taskId, deleteBtn) {
  if (openedTaskForm.taskId === taskId && openedTaskForm.formType == "delete") {
    document.querySelector(".delete-task-form").remove();
    openedTaskForm.taskId = null;
    openedTaskForm.formType = "";
  } else {
    if (openedTaskForm.taskId !== null) {
      document.querySelector(`.${openedTaskForm.formType}-task-form`).remove();
    }
    let deleteForm = new DeleteTaskForm();
    const buttonPos = deleteBtn.getBoundingClientRect();
    console.log(buttonPos);
    deleteForm.Body.style.position = "fixed";
    deleteForm.Body.style.top = `${buttonPos.top}px`;
    deleteForm.Body.style.left = `${buttonPos.left}px`;
    document.body.appendChild(deleteForm.Body);
    deleteForm.submitBtn.addEventListener("click", (e) => {
      e.preventDefault();
      Workspace.deleteProjectTask(projectId, taskId);
      deleteForm.Body.remove();
      showProject(projectId);
      openedTaskForm.taskId = null;
      openedTaskForm.formType = "";
    });
    deleteForm.cancelButton.addEventListener("click", () => {
      deleteForm.Body.remove();
      openedTaskForm.taskId = null;
      openedTaskForm.formType = "";
    });
    openedTaskForm.taskId = taskId;
    openedTaskForm.formType = "delete";
  }
}
