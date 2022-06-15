"use sctrict";
const todoControl = document.querySelector(".todo-control");
const headerInput = document.querySelector(".header-input");
const todoList = document.querySelector(".todo-list");
const todoCompleted = document.querySelector(".todo-completed");
let toDoContainer = document.querySelector(".todo-container");

let toDoData = [];

if (localStorage.getItem("toDoData")) {
  toDoData = JSON.parse(localStorage.getItem("toDoData"));
} else {
  toDoData = [];
}

const render = function () {
  localStorage.setItem("toDoData", JSON.stringify(toDoData));
  todoList.innerHTML = "";
  todoCompleted.innerHTML = "";

  toDoData.forEach(function (item, index) {
    const li = document.createElement("li");
    li.classList.add("todo-item");
    li.innerHTML =
      `<span  class="text-todo">` +
      item.text +
      `</span>` +
      `<div class="todo-buttons">` +
      `<button class="todo-remove"></button>` +
      ` <button class="todo-complete"></button>` +
      ` </div>`;

    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }

    li.querySelector(".todo-complete").addEventListener("click", function () {
      item.completed = !item.completed;
      render();
    });

    li.querySelector(".todo-remove").addEventListener("click", function () {
      console.dir(toDoData);
      toDoData.splice(index, 1);
      render();
    });
  });
};

todoControl.addEventListener("submit", function (event) {
  event.preventDefault();

  const newToDo = {
    text: headerInput.value,
    completed: false,
  };

  if (headerInput.value != "") {
    toDoData.push(newToDo);
    headerInput.value = "";
    render();
  }
});

render();
