const tabList = document.querySelectorAll(".tab-list");

// 탭 선택 (To do, Done)
Array.prototype.forEach.call(tabList, function (list) {
  // todo-content의 자식은 ul이다. 즉, list.children[0] = ul 클래스
  list.children[0].addEventListener("click", function (e) {
    e.preventDefault();

    const tabTodoList = document.querySelectorAll(".todoList");
    let tabNum = this.parentElement.getAttribute("data-tabnum");
    Array.prototype.forEach.call(tabTodoList, function (cont, i) {
      cont.style.display = "none";
      tabList[i].className = "tab-list";
    });
    tabTodoList[tabNum].style.display = "block";

    if (list.className.indexOf("tab_active") == -1) {
      list.className = "tab-list tab_active";
    }
  });
});
