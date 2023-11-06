import * as ElementCreator from "./elementCreator";

// private
//############################################################################################################################################################
function createLongButton(buttonText, dataAttribute, ButtonIconName) {
  const longButton = ElementCreator.createElement("button", "long-button");
  if (dataAttribute) {
    longButton.setAttribute(`data-${dataAttribute[0]}`, dataAttribute[1]);
  }
  const btnText = ElementCreator.createElement("span", "button-text");
  btnText.textContent = buttonText;
  longButton.appendChild(btnText);
  if (ButtonIconName) {
    const buttonIcon = ElementCreator.createMaterialIcon(
      "rounded",
      "button-icon",
      ButtonIconName
    );
    longButton.appendChild(buttonIcon);
  }
  return longButton;
}

function createCategoryListTask(task) {
  const taskInfo = task.taskData;
  const taskContainer = ElementCreator.createElement("div", "task-container");
  const taskTitle = ElementCreator.createElement("h6", "task-title");
  taskTitle.textContent = taskInfo["Title"];
  const taskDesc = ElementCreator.createElement("p", "task-description");
  taskDesc.textContent = taskInfo["Description"];
  ElementCreator.appendChildren(taskContainer, [taskTitle, taskDesc]);
  return taskContainer;
}

// public
//############################################################################################################################################################
export function createSideMenuSection(categoryName, projectList) {
  const categorySection = ElementCreator.createElement(
    "div",
    "category-section"
  );

  // create category header
  const categoryHeader = ElementCreator.createElement("div", "category-header");
  const categoryHeaderText = ElementCreator.createElement(
    "h6",
    "category-name"
  );
  categoryHeaderText.textContent = categoryName;
  const categoryHeaderMoreBtn = ElementCreator.createElement(
    "button",
    "short-button"
  );
  categoryHeaderMoreBtn.classList.add("more-button");
  const buttonIcon = ElementCreator.createMaterialIcon(
    "rounded",
    "button-icon",
    "more_horiz"
  );
  categoryHeaderMoreBtn.appendChild(buttonIcon);
  ElementCreator.appendChildren(categoryHeader, [
    categoryHeaderText,
    categoryHeaderMoreBtn,
  ]);
  categorySection.appendChild(categoryHeader);

  // create category projects
  const categoryContent = ElementCreator.createElement(
    "div",
    "category-content"
  );
  if (projectList.length) {
    projectList.forEach((project) => {
      const projectLink = createLongButton(project.Title, [
        "project-id",
        project.Id,
      ]);
      categoryContent.appendChild(projectLink);
    });
  } else {
    const emptyNotifier = ElementCreator.createElement("p", "empty-notifier");
    emptyNotifier.textContent = "No Project!";
    categoryContent.appendChild(emptyNotifier);
  }

  categorySection.appendChild(categoryContent);

  return categorySection;
}

//############################################################################################################################################################
export function createProjectPage(project) {
  const wrapper = ElementCreator.createElement("div", "wrapper");
  wrapper.classList.add("project-page");

  // create project page header
  const projectHeader = ElementCreator.createElement(
    "section",
    "project-header"
  );
  const projectHeaderTitle = ElementCreator.createElement("h2", "header-title");
  projectHeaderTitle.textContent = "Project : " + project.Title;
  const projectHeaderMoreBtn = ElementCreator.createElement(
    "button",
    "more-button"
  );
  projectHeaderMoreBtn.classList.add("short-button");
  projectHeaderMoreBtn.appendChild(
    ElementCreator.createMaterialIcon("rounded", "button-icon", "more_horiz")
  );

  ElementCreator.appendChildren(projectHeader, [
    projectHeaderTitle,
    projectHeaderMoreBtn,
  ]);
  wrapper.appendChild(projectHeader);

  // create project page description
  const projectDesc = ElementCreator.createElement(
    "section",
    "project-description"
  );
  const projectDescText = ElementCreator.createElement("p");
  projectDescText.textContent = project.Description;
  projectDesc.appendChild(projectDescText);
  wrapper.appendChild(projectDesc);

  // create task list
  const projectTasks = ElementCreator.createElement("section", "project-tasks");
  const projectTasksHeader = ElementCreator.createElement("h3", "tasks-header");
  projectTasksHeader.textContent = "Tasks";
  projectTasks.appendChild(projectTasksHeader);
  const projectTaskButtons = ElementCreator.createElement(
    "div",
    "tasks-buttons"
  );
  const projectTasksNewTask = createLongButton("New Task", undefined, "Add");
  projectTasksNewTask.classList.add("new-task-button");
  projectTaskButtons.appendChild(projectTasksNewTask);
  projectTasks.appendChild(projectTaskButtons);
  const taskCategories = ElementCreator.createElement("div", "task-categories");
  project.Tasks.forEach((task) => {
    taskCategories.appendChild(createCategoryListTask(task));
  });
  projectTasks.appendChild(taskCategories);
  wrapper.appendChild(projectTasks);

  return wrapper;
}
