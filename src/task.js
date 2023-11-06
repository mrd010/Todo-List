export default class Task {
  #id;
  #title;
  #description;
  #dueDate;
  #priority;
  #done;
  // constructor
  //############################################################################################################################################################
  constructor(
    title,
    desc,
    dueDate,
    priority,
    category,
    done = false,
    taskId = generateRandomId()
  ) {
    this.#title = title;
    this.#description = desc;
    this.#dueDate = dueDate;
    this.#priority = priority;
    this.#done = done;
    this.#id = taskId;
  }

  // getters and setters
  //############################################################################################################################################################
  get taskData() {
    return {
      ID: this.#id,
      Title: this.#title,
      Description: this.#description,
      DueDate: this.#dueDate,
      Priority: this.#priority,
      Done: this.#done,
    };
  }
}

// outer functions
//############################################################################################################################################################
function generateRandomId() {
  return Math.floor(((Date.now() % 100000) + Math.random()) * 1000);
}
