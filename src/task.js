export default class Task {
  #title;
  #description;
  #dueDate;
  #priority;
  #done;
  constructor(title, desc, dueDate, priority, done) {
    this.#title = title;
    this.#description = desc;
    this.#dueDate = dueDate;
    this.#priority = priority;
    this.#done = done;
  }

  get taskData() {
    return {
      Title: this.#title,
      Description: this.#description,
      DueDate: this.#dueDate,
      Priority: this.#priority,
      Done: this.#done,
    };
  }
}
