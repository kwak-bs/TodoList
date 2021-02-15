const doneList = document.getElementById("done-list");

let dones = [];
let doneIdNum = 0;
let flag = false;

function handleDoneDelete(event) {
  //console.dir(event.target)에서 parentNode찾으면 부모 찾을수 있음.
  //console.dir(event.target);
  //console.log(event.target.parentNode);

  //const target = event.target;
  // event.target으로 호출하면 하위 DOM까지 건드리는 바람에
  // 삭제되는 대상이 클릭할 때마다 달라진다.
  // 하지만 currentTarget으로 이벤트가 바인딩된 span만 가져오게끔 구현하여서
  // 이러한 이슈를 막았다.
  // event.tartget은 이벤트 버블링의 가장 마지막에 위치한 최하위의 요소를 반환한다.
  // 하지만 여기선 최하위만 반환되는게 아니여서 이슈가 발생했다.
  const span = event.currentTarget;

  const li = span.parentElement;
  const ul = li.parentElement;
  const doneId = li.id;

  ul.removeChild(li); // 삭제

  dones = dones.filter(function (done) {
    //filter는 array의 모든 아이템을 통해 함수를 실행하고
    //true인 아이템들만 가지고 새로운 array를 만든다.
    return done.id !== parseInt(doneId) + 1; //toDoId는 0부터 기준이다. 근데 toDo.id는 1부터 id를 잡기 때문에 +1 해줘야한다.
  });

  persistDoneToDos();
}

function getTime() {
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
    flag = false;
    getTime();
    const doneTime = document.createElement("h5");
    doneTime.className = "done-time";
    doneTime.innerText = `${nowMonth}월 ${nowDate}일`;
    doneList.appendChild(doneTime);
  } else {
    const parsedDoneTime = JSON.parse(savedDonetime);

    const { month, _date } = parsedDoneTime;
    if (month !== nowMonth && _date !== nowDate) {
      flag = false;
    }
    if (!flag) {
      flag = true;
      const doneTime = document.createElement("h5");
      doneTime.className = "done-time";
      doneTime.innerText = `${month}월 ${_date}일`;
      doneList.appendChild(doneTime);
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

  const BtnContainer = document.createElement("span");
  BtnContainer.className = "btn-container";

  const deleteDoneBtn = document.createElement("i");
  deleteDoneBtn.className = "fas fa-trash";
  BtnContainer.appendChild(deleteDoneBtn);

  BtnContainer.addEventListener("click", handleDoneDelete); // 버튼에 삭제 이벤트 추가.

  donetoDo.appendChild(checkbox);
  donetoDo.appendChild(label);
  donetoDo.appendChild(BtnContainer);
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
    doneIdNum = parsedDoneToDos.length;
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
