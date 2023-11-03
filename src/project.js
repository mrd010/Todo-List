import Task from "./task";
export default class Project {
  #title;
  #description;
  #category;
  #tasks;
  constructor(title, description, category) {
    this.#title = title;
    this.#description = description;
    this.#category = category;
    this.#tasks = [];
  }

  get projectData() {
    return {
      Title: this.#title,
      Description: this.#description,
      Category: this.#category,
      Tasks: this.#tasks.map((task) => task.taskData),
    };
  }

  addTask(task) {
    this.#tasks.push(task);
  }
}
