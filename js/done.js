const doneList = document.getElementById("done-list");

let dones = [];
let doneIdNum = 0;

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

function addDoneToDo(text, doneTime, isLoad) {
  let timeFlag = true;

  if (!doneTime) {
    return;
  }
  const { month, _day, hour } = doneTime;

  const donetoDo = document.createElement("li");
  donetoDo.className = "done-todo";
  donetoDo.id = doneIdNum;

  const stringDones = localStorage.getItem("dones");
  let TempDones = [];

  if (stringDones) {
    TempDones = JSON.parse(stringDones);

    Array.prototype.forEach.call(TempDones, function (done) {
      const { month: arrMonth, _day: arrDay, hour: arrHour } = done.doneTime;

      // 배열 객체에 같은 시간이 존재하면 flag = false;
      if (hour === arrHour && month === arrMonth && _day === arrDay) {
        timeFlag = false;
      }
    });
  }

  // 첫 번째 로드될때는 시간이 무조건 추가 되야함
  if (doneIdNum === TempDones.length && isLoad) {
    timeFlag = true;
  }
  console.log(timeFlag);

  // timeFlag = true일때만 시간 추가(h3)
  if (timeFlag) {
    const done_Time = document.createElement("h5");
    done_Time.className = "done-time";
    done_Time.innerText = `${month}월 ${_day}일 ${hour}시`;
    doneList.appendChild(done_Time);
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

  saveDoneToDo(text, doneTime);
}

function saveDoneToDo(text, doneTime) {
  const donetoDoObject = {
    id: doneIdNum,
    value: text,
    doneTime,
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
      addDoneToDo(doneTodo.value, doneTodo.doneTime, true);
    });
  }
  return;
}

function init() {
  loadDoneToDos();
}

init();
