import * as Storage from "./storageController";
import {
  formatDistanceToNow,
  subDays,
  addDays,
  compareAsc,
  compareDesc,
  isToday,
  isSameDay,
  isEqual,
  isFuture,
} from "date-fns";

// utility functions
function generateID() {
  return Math.floor(((Date.now() % 100000) + Math.random()) * 1000);
}

//#########################################################################################################
// Task Class
class Task {
  id;
  title;
  description;
  dueDate;
  priority;
  done;
  constructor(title, description, dueDate, priority, id = generateID()) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.id = id;
    this.done = false;
  }
}
//#########################################################################################################
// Project Class
class Project {
  title;
  description;
  id;
  #tasks;
  constructor(title, description, id = generateID()) {
    this.title = title;
    this.description = description;
    this.id = id;
    this.#tasks = [];
  }

  get tasks() {
    return this.#tasks;
  }

  tasksData() {
    return this.#tasks.map((task) => {
      return {
        taskTitle: task.title,
        taskDescription: task.description,
        taskDueDate: task.dueDate,
        taskPriority: task.priority,
        taskDone: task.done,
        taskId: task.id,
      };
    });
  }

  addTask(task) {
    this.#tasks.push(task);
  }

  editTask(taskId, taskTitle, taskDesc, taskDueDate, taskPriority) {
    const task = this.#tasks.find((tsk) => tsk.id == taskId);

    if (task.title != taskTitle) {
      task.title = taskTitle;
    }
    if (task.description != taskDesc) {
      task.description = taskDesc;
    }
    if (task.dueDate != taskDueDate) {
      task.dueDate = taskDueDate;
    }
    if (task.priority != taskPriority) {
      task.priority = taskPriority;
    }
  }

  deleteTask(taskId) {
    const taskIndex = this.#tasks.findIndex((tsk) => tsk.id == taskId);
    this.#tasks.splice(taskIndex, 1);
  }

  changeTaskStatus(taskId, status) {
    this.#tasks.find((tsk) => tsk.id == taskId).done = status;
  }

  moveTask(taskId, dir) {
    const taskIndex = this.#tasks.findIndex((tsk) => tsk.id == taskId);
    [this.#tasks[taskIndex], this.#tasks[taskIndex + dir]] = [
      this.#tasks[taskIndex + dir],
      this.#tasks[taskIndex],
    ];
  }
}

//#########################################################################################################
// Workspace Module
const projects = [];

function createProject(title, desc) {
  projects.push(new Project(title, desc));
}

function reCreateProject(title, desc, tasks, id) {
  const project = new Project(title, desc, id);
  tasks.forEach((task) => project.addTask(task));
}

function createTask(projectId, taskTitle, taskDesc, taskDueDate, taskPriority) {
  const newTask = new Task(taskTitle, taskDesc, taskDueDate, taskPriority);
  const project = projects.find((prj) => prj.id == projectId);
  if (project) {
    project.addTask(newTask);
  }
}

function reCreateTask(
  project,
  taskTitle,
  taskDesc,
  taskDueDate,
  taskPriority,
  taskId
) {
  const newTask = new Task(
    taskTitle,
    taskDesc,
    taskDueDate,
    taskPriority,
    taskId
  );

  project.addTask(newTask);
}

function editProject(projectId, title, desc) {
  const project = projects.find((prj) => prj.id == projectId);
  project.title = title;
  project.description = desc;
}

function editProjectTask(
  projectId,
  taskId,
  taskTitle,
  taskDesc,
  taskDueDate,
  taskPriority
) {
  projects
    .find((prj) => prj.id == projectId)
    .editTask(taskId, taskTitle, taskDesc, taskDueDate, taskPriority);
}

function deleteProject(projectId) {
  const projectIndex = projects.findIndex((prj) => prj.id == projectId);
  if (projectIndex) {
    projects.splice(projectIndex, 1);
  }
}

function deleteProjectTask(projectId, taskId) {
  const project = projects.find((prj) => prj.id == projectId);
  project.deleteTask(taskId);
}

function changeTaskDoneStatus(projectId, taskId, doneStatus) {
  projects
    .find((prj) => prj.id == projectId)
    .changeTaskStatus(taskId, doneStatus);
}

function moveTask(projectId, taskId, dir) {
  const project = projects.find((prj) => prj.id == projectId);
  project.moveTask(taskId, dir);
}

function projectsData() {
  return projectsList.map((project) => {
    return {
      projectTitle: project.title,
      projectDescription: project.description,
      projectId: project.id,
      projectTasks: project.tasksData(),
    };
  });
}

function saveWorkspace() {
  Storage.saveToStorage(projectsData());
}

function loadWorkspace() {
  return Storage.loadFromStorage();
}

function allProjects() {
  return projectsData();
}

function specificDayProjectTasks(date) {
  return projects.map((project) => {
    const dayTasks = project.tasks.filter((task) =>
      isSameDay(task.dueDate, date)
    );
    if (dayTasks.length) {
      return {
        projectTitle: project.title,
        projectId: project.id,
        taskInfo: dayTasks.map((tsk) => {
          return {
            taskTitle: tsk.title,
            taskDescription: tsk.description,
            taskDueDate: tsk.dueDate,
            taskPriority: tsk.priority,
            taskDone: tsk.done,
            taskId: tsk.id,
          };
        }),
      };
    }
  });
}

function todayProjectTasks() {
  return specificDayProjectTasks(Date.now());
}

function upcomingProjectTasks(upcomingDays) {
  const projectsByDays = [];
  for (let i = 0; i < upcomingDays; i++) {
    projectsByDays.push(specificDayProjectTasks(addDays(Date.now(), i)));
  }
  return projectsByDays;
}
