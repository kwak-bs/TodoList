const todoH3 = document.querySelector(".js-todo-h3");
const h3Div = document.querySelector(".js-todo");

const todoContainerWrapper = document.querySelector(".todo-container-wrapper");
todoContainerWrapper.classList.add("hidden");

const todoContainer = document.querySelector(".js-todoContainer");

const inputForm = document.getElementById("inputForm");
const inputTodo = document.getElementById("inputTodo");

const list = document.getElementById("list");

let toDos = [];

function todoClick() {
  todoContainerWrapper.classList.toggle("hidden");
}

function onSubmit(event) {
  event.preventDefault();
  const value = inputTodo.value;
  inputTodo.value = "";

  addToDo(value);
}

let idNum = 0;

function addToDo(text) {
  const toDo = document.createElement("li");
  toDo.className = "toDo";
  toDo.id = idNum;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "todo-checkbox";
  checkbox.id = idNum;
  checkbox.value = text;
  idNum++;

  const label = document.createElement("label");
  label.className = "todo-label";
  label.innerHTML = text;

  toDo.appendChild(checkbox);
  toDo.appendChild(label);
  list.appendChild(toDo);

  saveToDo(text);
}

function saveToDo(text) {
  const toDoObject = {
    id: idNum,
    value: text,
  };

  toDos.push(toDoObject);
  persistToDos();
}

// 로컬 스토리지에 투두저장
function persistToDos() {
  // 자바스크립트는 local storage에 있는 모든 데이터를 string으로 저장하려고 한다.
  // 그래서 우리 자바스크립트 object를 string으로 바꿔줘야한다.
  // JSON.stringfy();
  const stringToDo = JSON.stringify(toDos);
  localStorage.setItem("toDos", stringToDo);
}

function loadToDos() {
  const loadedToDos = localStorage.getItem("toDos");

  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);

    parsedToDos.forEach(function (toDo) {
      addToDo(toDo.value);
    });
  }
  return;
}

function init() {
  loadToDos();
}
init();

inputForm.addEventListener("submit", onSubmit);
todoH3.addEventListener("click", todoClick);
