function app() {
  const inputTodo = document.querySelector(".input-todo");
  const btnTodo = document.querySelector(".add-todo");
  const ulTodo = document.querySelector(".todo-list");

  function createLi() {
    const li = document.createElement("li");
    return li;
  }

  function clearInputArea() {
    inputTodo.value = "";
    inputTodo.focus();
  }

  function createRemoveBtn(li) {
    li.innerText += " ";
    const btnRemove = document.createElement("button");
    btnRemove.innerText = "Apagar";
    btnRemove.addEventListener("click", () => {
      btnRemove.parentElement.remove();
      saveTodos();
    });
    li.appendChild(btnRemove);
  }

  inputTodo.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      if (!inputTodo.value) return;
      createTodo(inputTodo.value);
    }
  });

  function createTodo(inputText) {
    const li = createLi();
    li.innerText = inputText;
    ulTodo.appendChild(li);
    clearInputArea();
    createRemoveBtn(li);
    saveTodos();
  }

  function saveTodos() {
    const liTodos = ulTodo.querySelectorAll("li");
    const todosLi = [];

    for (let todo of liTodos) {
      let todoText = todo.innerText;
      todoText = todoText.replace("Apagar", "").trim();
      todosLi.push(todoText);
    }

    const todosJSON = JSON.stringify(todosLi);
    localStorage.setItem("todos", todosJSON);
  }

  function addSavedTodos() {
    const todos = localStorage.getItem("todos");
    const todosList = JSON.parse(todos);

    for (let todo of todosList) {
      createTodo(todo);
    }
  }

  addSavedTodos();

  btnTodo.addEventListener("click", () => {
    if (!inputTodo.value) return;
    createTodo(inputTodo.value);
  });
}

app();
