const nameContainer = document.querySelector(".js-name");

//로컬 스토리지에 이름이 있는 경우
function paintName(name) {
  nameContainer.innerHTML = "";
  const title = document.createElement("span");
  title.className = "name__text";
  title.innerHTML = `${name}님. 행운을 빕니다. `;

  const editNameContainer = document.createElement("span");
  editNameContainer.className = "edit-name-container";

  const editNameBtn = document.createElement("i");
  editNameBtn.className = "fas fa-user-edit";

  editNameContainer.appendChild(editNameBtn);
  editNameContainer.addEventListener("click", handleNameDelete);

  nameContainer.appendChild(title);
  nameContainer.appendChild(editNameContainer);
}

// 하 처음에 handleDelete()로 이름 지었다가, 만들자마자 삭제가 안되는 이슈가 발생해서 삽질좀함.
// 아마 todo.js에 있는 handleDelete()랑 겹쳐서 그런듯.
// 함수 네이밍할 때 중복되지 않도록 주의하자.
function handleNameDelete() {
  const name = localStorage.getItem("username");
  if (name !== null) {
    localStorage.removeItem("username"); // 로컬 스토리지에서 삭제
  }
  nameContainer.innerHTML = ""; // 초기화
  paintInput(); // 이름 입력 창 띄우기
}

//이름입력 후 제출처리
function handleSubmit(event) {
  event.preventDefault(); // form 입력 시 새로고침 방지. 새로고침이 default 이벤트임
  const form = event.target;
  const input = form.querySelector("input");
  const value = input.value; // 입력값 저장

  localStorage.setItem("username", value); // key - value 형태로 로컬 스토리지에 저장.
  paintName(value);
}

// 로컬 스토리지에 이름이 없는 경우
function paintInput() {
  // input , form 둘이 세트임
  const input = document.createElement("input");
  input.placeholder = "이름을 입력하세요.";
  input.type = "text";
  input.className = "name__input";

  const form = document.createElement("form");
  form.addEventListener("submit", handleSubmit);
  form.appendChild(input);
  nameContainer.appendChild(form);
}

function loadName() {
  // 로컬스토리지의 username 값 불러와서 저장
  const name = localStorage.getItem("username");

  if (name === null) {
    // 유저가 없는 경우
    paintInput();
  } else {
    // 유저가 있는 경우
    paintName(name);
  }
}

function init() {
  loadName();
}

init();
