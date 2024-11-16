import { UI_TODO, TODO_NOTIFICATION, UI_FORMS } from "./object.js";
import tasksList from "./tasks.json" with {type: "json"};

const STATUSE = {
  DONE: "Done",
  TODO: "To Do",
};

const PRIORITY = {
  HIGH: "high",
  MEDIUM: "medium",
  LOW: "low",
}

const toDoList = tasksList.tasks;

function errorStringLine(list){
  if (list.value.length > 30) {
    throw new Error(TODO_NOTIFICATION.STRING_MORE_30)
  } 
  if (list.value.length < 3) {
    throw new Error(TODO_NOTIFICATION.STRING_LESS_3)
  } 
}

function createElements(text, taskList, checked = "") {
  const task = document.createElement("div");
  task.classList.add("task");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = checked;
  checkbox.classList.add("checkbox");

  const textTask = document.createElement("p");
  textTask.textContent = text;
  textTask.classList.add("text");

  const closeBtn = document.createElement("button");
  closeBtn.classList.add("btnCloseTask");

  task.prepend(checkbox, textTask, closeBtn);
  if(taskList === PRIORITY.HIGH){
    UI_TODO.LIST_HIGH.prepend(task);
  }
  if(taskList === PRIORITY.MEDIUM){
    UI_TODO.LIST_MEDIUM.prepend(task);
  }
  if(taskList === PRIORITY.LOW){
    UI_TODO.LIST_LOW.prepend(task);
  }
}

function checklengthInput(list, listTask) {
    addTask(list.value, listTask);
    list.value = "";
}

UI_FORMS.FORM_HIGH.addEventListener("submit", (e) => {
  e.preventDefault();
  try {
    errorStringLine(UI_TODO.TEXT_HIGH)
  } catch (error) { 
    console.error(error.message);
    return alert('Ошибка: ' + error.message); 
  }
  checklengthInput(UI_TODO.TEXT_HIGH, PRIORITY.HIGH);
});
UI_FORMS.FORM_MEDIUM.addEventListener("submit", (e) => {
  e.preventDefault();
  try {
    errorStringLine(UI_TODO.TEXT_MEDIUM)
  } catch (error) { 
    console.error(error.message);
    return alert('Ошибка ' + error.message); 
  }
 
  checklengthInput(UI_TODO.TEXT_MEDIUM, PRIORITY.MEDIUM);
});
UI_FORMS.FORM_LOW.addEventListener("submit", (e) => {
  e.preventDefault();
  try {
    errorStringLine(UI_TODO.TEXT_LOW)
  } catch (error) { 
    console.error(error.message);
    return alert('Ошибка ' + error.message); 
  }
 
  checklengthInput(UI_TODO.TEXT_LOW, PRIORITY.LOW);
});



function filterTask(status, priority) {
  const taskTodo = toDoList.filter(
    (tasks) => tasks.status === status && tasks.priority === priority
  );
  return taskTodo;
}

function addTaskDOM(list, classCheck = "") {
  if (classCheck === "checkbox") {
    filterTask(STATUSE.DONE, list).forEach((task) => {
      createElements(task.name, list, classCheck);
    });
  } else {
    filterTask(STATUSE.TODO, list).forEach((task) => {
      createElements(task.name, list, classCheck);
    });
  }
}

function render() {
  UI_TODO.LIST_HIGH.innerHTML = "";
  UI_TODO.LIST_MEDIUM.innerHTML = "";
  UI_TODO.LIST_LOW.innerHTML = "";
  addTaskDOM(PRIORITY.HIGH, "checkbox");
  addTaskDOM(PRIORITY.MEDIUM, "checkbox");
  addTaskDOM(PRIORITY.LOW, "checkbox");
  addTaskDOM(PRIORITY.HIGH);
  addTaskDOM(PRIORITY.MEDIUM);
  addTaskDOM(PRIORITY.LOW);
}
render();

function addTask(text, list) {
  const checkTaskName = toDoList.find((TaskName) => TaskName.name === text);
  if (checkTaskName === undefined) {
    toDoList.push({ name: text, status: STATUSE.TODO, priority: list });
  }
  render();
}

function deleteTask(list, idList) {
  if (list.length === 0) {
    return;
  } else {
    document.querySelectorAll(idList).forEach((taskList) => {
      taskList.addEventListener("click", (e) => {
        if (e.target.classList.contains("btnCloseTask")) {
          e.target.parentNode.classList.add("delete");
          const indexDeleteElement = toDoList.findIndex(
            (index) =>
              index.name === document.querySelector(".delete").textContent
          );
          toDoList.splice(indexDeleteElement, 1);
          render();
        }
      });
    });
  }
}
deleteTask(UI_TODO.LIST_HIGH, "#taskListHigh");
deleteTask(UI_TODO.LIST_MEDIUM, "#taskListMedium");
deleteTask(UI_TODO.LIST_LOW, "#taskListLow");

function indexStatus(status) {
  const statusArr = document.querySelector(".status").textContent;
  const indexElement = toDoList.findIndex(
    (sta) => sta.name === statusArr
  );
  toDoList[indexElement]["status"] = status;
  render();
}

function changeStatus(list, idList) {
  if (list.length === 0) {
    return;
  } else {
    document.querySelectorAll(idList).forEach((taskList) => {
      taskList.addEventListener("click", (e) => {
        if (e.target.checked) {
          e.target.parentNode.classList.add("status");
          indexStatus(STATUSE.DONE);
          e.target.parentNode.classList.remove("status");
        }
        if (e.target.checked === false) {
          e.target.parentNode.classList.add("status");
          indexStatus(STATUSE.TODO);
          e.target.parentNode.classList.remove("status");
        }
      });
    });
  }
}
changeStatus(UI_TODO.LIST_HIGH, "#taskListHigh");
changeStatus(UI_TODO.LIST_MEDIUM, "#taskListMedium");
changeStatus(UI_TODO.LIST_LOW, "#taskListLow");





