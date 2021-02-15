const todoH3 = document.querySelector(".js-todo-h3");
const h3Div = document.querySelector(".js-todo");

const todoContainerWrapper = document.querySelector(".todo-container-wrapper");
todoContainerWrapper.classList.add("hidden");

const todoContainer = document.querySelector(".js-todoContainer");

const inputForm = document.getElementById("inputForm");
const inputTodo = document.getElementById("inputTodo");

const todoList = document.getElementById("todo-list");

const header = document.querySelector(".js-todoHeader");

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

function handleDelete(event) {
  //console.dir(event.target)에서 parentNode찾으면 부모 찾을수 있음.
  //console.dir(event.target);
  //console.log(event.target.parentNode);
  const target = event.target;

  const li = target.parentElement;
  const ul = li.parentElement;
  const toDoId = li.id;

  ul.removeChild(li); // 삭제

  toDos = toDos.filter(function (toDo) {
    //filter는 array의 모든 아이템을 통해 함수를 실행하고
    //true인 아이템들만 가지고 새로운 array를 만든다.
    return toDo.id !== parseInt(toDoId) + 1; //toDoId는 0부터 기준이다. 근데 toDo.id는 1부터 id를 잡기 때문에 +1 해줘야한다.
  });

  persistToDos();
}

let idNum = 0;

function addToDo(text) {
  if (!text) {
    return;
  }
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
  todoList.appendChild(toDo);

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
    idNum = parsedToDos.length;
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

// 체크된 것들 done.js로 이동
todoList.addEventListener("click", function (e) {
  const element = e.target;
  if (element.value) {
    const value = element.value;

    handleDelete(e);

    const now = new Date();
    const doneTime = {
      month: now.getMonth() + 1,
      _day: now.getDate(),
      hour: now.getHours(),
    };
    // isLoad를 같이 보내서 이게 새로고침 하여 로드되어 지는 것인지
    // 아님 To do에서 체크를 해서 보내지는 것인지 확인한다.
    const isLoad = false;
    addDoneToDo(value, doneTime, isLoad);
  }
});
