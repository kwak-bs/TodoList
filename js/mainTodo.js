const mainContainer = document.querySelector(".js-mainTodo");

//로컬 스토리지에 이름이 있는 경우
function paintMain(mainTodo) {
  mainContainer.innerHTML = "";
  const today = document.createElement("h3");
  today.className = "main__text";
  today.innerText = `TODAY`;

  const deleteMain = document.createElement("span");
  deleteMain.innerHTML = "🚫";
  deleteMain.className = "Main__button";
  deleteMain.addEventListener("click", handleMainDelete);

  const main = document.createElement("h2");
  main.className = "maintodo__text";
  main.innerHTML = mainTodo;

  mainContainer.appendChild(today);
  mainContainer.appendChild(deleteMain);
  mainContainer.appendChild(main);
}

function handleMainDelete() {
  const main = localStorage.getItem("main");
  if (main !== null) {
    localStorage.removeItem("main"); // 로컬 스토리지에서 삭제
  }
  mainContainer.innerHTML = ""; // 초기화
  paintMainInput(); // 이름 입력 창 띄우기
}

//이름입력 후 제출처리
function handleMainSubmit(event) {
  event.preventDefault(); // form 입력 시 새로고침 방지. 새로고침이 default 이벤트임
  const form = event.target;
  const input = form.querySelector("input");
  const value = input.value; // 입력값 저장

  localStorage.setItem("main", value); // key - value 형태로 로컬 스토리지에 저장.
  paintMain(value);
}

// 로컬 스토리지에 MainTodo가 없는 경우
function paintMainInput() {
  const question = document.createElement("h3");
  question.innerHTML = "반드시 해야될 한가지만 입력해보세요.";
  question.className = "main__question";

  const input = document.createElement("input");
  input.type = "text";
  input.className = "main__input";

  const form = document.createElement("form");
  form.addEventListener("submit", handleMainSubmit);
  form.appendChild(input);

  mainContainer.appendChild(question);
  mainContainer.appendChild(form);
}

function loadMain() {
  // 로컬스토리지의 username 값 불러와서 저장
  const mainTodo = localStorage.getItem("main");

  if (mainTodo === null) {
    // mainTodo가 없는 경우
    paintMainInput();
  } else {
    // 유저가 있는 경우
    paintMain(mainTodo);
  }
}

function init() {
  loadMain();
}

init();
