const todoH3 = document.querySelector(".js-todo-h3");
const h3Div = document.querySelector(".js-todo");

const todoContainerWrapper = document.querySelector(".todo-container-wrapper");
todoContainerWrapper.classList.add("hidden");

const todoContainer = document.querySelector(".js-todoContainer");

function todoClick() {
  todoContainerWrapper.classList.toggle("hidden");
}



todoH3.addEventListener("click", todoClick);
