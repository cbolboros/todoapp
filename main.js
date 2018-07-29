var todo = localStorage.getItem("todolist")
  ? JSON.parse(localStorage.getItem("todolist"))
  : {
      incomplete: [],
      complete: []
    };

var addToDoBtn = document.getElementById("addToDo");
var inputToDo = document.querySelector(".inputToDo");
var deleteBtns = document.querySelectorAll(".deleteToDo");
var completeBtns = document.querySelectorAll(".completeToDo");

renderToDoList();

addToDoBtn.addEventListener("click", function() {
  if (inputToDo.value) {
    addToDoItem(inputToDo.value);
    todo.incomplete.push(inputToDo.value);
    inputToDo.value = "";
    saveLocalStorage();
  }
});

inputToDo.addEventListener("keydown", function(e) {
  if (e.key === "Enter" && inputToDo.value) {
    addToDoItem(inputToDo.value);
    todo.incomplete.push(inputToDo.value);
    inputToDo.value = "";
    saveLocalStorage();
  }
});

function saveLocalStorage() {
  localStorage.setItem("todolist", JSON.stringify(todo));
}

function addToDoItem(value, completed) {
  if (completed) {
    var list = document.querySelector(".complete");
  } else {
    list = document.querySelector(".incomplete");
  }

  var li = document.createElement("li");
  li.innerText = value;

  var liButtons = document.createElement("div");
  liButtons.classList.add("buttons");

  var complete = document.createElement("button");
  complete.classList.add("completeToDo");

  complete.addEventListener("click", completeToDoItem);

  var remove = document.createElement("button");
  remove.classList.add("removeToDo");

  remove.addEventListener("click", deleteToDoItem);

  var completeIcon = document.createElement("i");
  completeIcon.classList.add("far", "fa-check-circle");

  var removeIcon = document.createElement("i");
  removeIcon.classList.add("far", "fa-trash-alt");

  li.appendChild(liButtons);
  liButtons.appendChild(remove);
  liButtons.appendChild(complete);
  complete.appendChild(completeIcon);
  remove.appendChild(removeIcon);
  list.insertBefore(li, list.childNodes[0]);
}

function deleteToDoItem() {
  var item = this.parentNode.parentNode;
  var parent = item.parentNode;
  var className = parent.className;
  var value = item.innerText;
  if (className === "complete") {
    todo.complete.splice(todo.complete.indexOf(value), 1);
  } else {
    todo.incomplete.splice(todo.incomplete.indexOf(value), 1);
  }
  this.parentNode.parentNode.remove();
  saveLocalStorage();
}

function completeToDoItem() {
  var listComplete = document.querySelector(".complete");
  var listIncomplete = document.querySelector(".incomplete");
  var item = this.parentNode.parentNode;
  var parent = item.parentNode;
  var className = parent.className;
  var value = item.innerText.replace(/\r?\n|\r/g, "");
  var target;

  if (className === "complete") {
    target = listIncomplete;
    todo.complete.splice(todo.complete.indexOf(value), 1);
    todo.incomplete.push(value);
  } else {
    target = listComplete;
    todo.incomplete.splice(todo.incomplete.indexOf(value), 1);
    todo.complete.push(value);
  }

  parent.removeChild(item);
  target.insertBefore(item, target.childNodes[0]);
  saveLocalStorage();
}

function renderToDoList() {
  if (!todo.incomplete.length && !todo.complete.length) return;

  for (var i = 0; i < todo.incomplete.length; i++) {
    var value = todo.incomplete[i];
    addToDoItem(value);
  }

  for (var j = 0; j < todo.complete.length; j++) {
    var value = todo.complete[j];
    addToDoItem(value, true);
  }
}
