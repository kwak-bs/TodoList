const clock = document.querySelector(".js-clock .clock__text");
const dateWrap = document.querySelector(".js-clock .date__text");

function getTime() {
  const now = new Date(); // 시간 불러옴. 업데이트 된 시간을 매번 저장하는 것은 아님
  const minutes = now.getMinutes();
  const hours = now.getHours();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const _date = now.getDate();
  const dayList = ["일", "월", "화", "수", "목", "금", "토"];
  const day = dayList[now.getDay()];

  const time = `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }`;

  const today = `${year}년 ${month}월 ${_date}일 (${day})`;
  // html에 시간 나타내줌 10 미만이면 앞에 0을 붙여준다.
  clock.innerHTML = time;
  dateWrap.innerHTML = today;
  return;
}

function init() {
  //getTime();
  setInterval(getTime, 1000); // 1초마다 매번 업데이트 해줌. setInterval 덕분에 업데이트 된 시간을 가져올 수 있음.
  return;
}

init();
