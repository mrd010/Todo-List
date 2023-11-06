import Task from "./task";
import { saveWorkspace } from "./workspace";

//############################################################################################################################################################
export default class Project {
  #id;
  #title;
  #description;
  #category;
  #tasks;
  constructor(title, description, category, projectId = generateRandomId()) {
    this.#title = title;
    this.#description = description;
    this.#category = category;
    this.#tasks = [];
    this.#id = projectId;
  }

  // private methods
  //############################################################################################################################################################

  // public getters and setters
  //############################################################################################################################################################
  get projectData() {
    return {
      ID: this.#id,
      Title: this.#title,
      Description: this.#description,
      Category: this.#category,
      Tasks: this.#tasks.map((task) => task.taskData),
    };
  }

  get Title() {
    return this.#title;
  }

  get Category() {
    return this.#category;
  }

  get Id() {
    return this.#id;
  }

  get Description() {
    return this.#description;
  }

  get Tasks() {
    return this.#tasks;
  }

  // public methods
  //############################################################################################################################################################
  addTaskFromData(taskData) {
    this.#tasks.push(
      new Task(
        taskData["task-title"],
        taskData["task-description"],
        taskData["due-date"],
        taskData["priority"],
        taskData["category"]
      )
    );
    saveWorkspace();
  }

  addTask(task) {
    this.#tasks.push(task);
    saveWorkspace();
  }
}

// outer functions
//############################################################################################################################################################
function generateRandomId() {
  return Math.floor(((Date.now() % 100000) + Math.random()) * 1000);
}
