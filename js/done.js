const doneList = document.getElementById("done-list");

let dones = [];
let doneIdNum = 0;

function getTime(text) {
  const now = new Date();
  const month = now.getMonth() + 1;
  const _date = now.getDate();

  const time = {
    month,
    _date,
  };

  localStorage.setItem("donetime", JSON.stringify(time));
}

function addDoneToDo(text) {
  const savedDonetime = localStorage.getItem("donetime");

  const now = new Date();
  const nowMonth = now.getMonth() + 1;
  const nowDate = now.getDate();

  const donetoDo = document.createElement("li");
  donetoDo.className = "done-todo";
  donetoDo.id = doneIdNum;

  if (savedDonetime === null) {
    getTime();
    const doneTime = document.createElement("h5");
    doneTime.className = "done-time";
    doneTime.innerText = `${nowMonth}월 ${nowDate}일`;
    donetoDo.appendChild(doneTime);
  } else {
    const parsedDoneTime = JSON.parse(savedDonetime);
    console.log(parsedDoneTime);

    const { month, _date } = parsedDoneTime;

    if (month !== nowMonth && _date !== nowDate) {
      const doneTime = document.createElement("h5");
      doneTime.className = "done-time";
      doneTime.innerText = `${month}월 ${_date}일`;
      donetoDo.appendChild(doneTime);
    }
  }

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "done-todo-checkbox";
  checkbox.id = doneIdNum;
  checkbox.value = text;
  checkbox.checked = true;
  doneIdNum++;

  const label = document.createElement("label");
  label.className = "done-todo-label";
  label.innerHTML = text;

  donetoDo.appendChild(checkbox);
  donetoDo.appendChild(label);
  doneList.appendChild(donetoDo);

  saveDoneToDo(text);
}

function saveDoneToDo(text) {
  const donetoDoObject = {
    id: doneIdNum,
    value: text,
  };

  dones.push(donetoDoObject);
  persistDoneToDos();
}

// 로컬 스토리지에 저장
function persistDoneToDos() {
  // 자바스크립트는 local storage에 있는 모든 데이터를 string으로 저장하려고 한다.
  // 그래서 우리 자바스크립트 object를 string으로 바꿔줘야한다.
  // JSON.stringfy();
  const stringDoneToDo = JSON.stringify(dones);
  localStorage.setItem("dones", stringDoneToDo);
}

function loadDoneToDos() {
  const doneToDos = localStorage.getItem("dones");

  if (doneToDos !== null) {
    const parsedDoneToDos = JSON.parse(doneToDos);

    parsedDoneToDos.forEach(function (doneTodo) {
      addDoneToDo(doneTodo.value);
    });
  }
  return;
}

function init() {
  loadDoneToDos();
}

init();
