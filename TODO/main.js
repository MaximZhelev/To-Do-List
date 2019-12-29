const date = document.querySelector(".date");
const today = new Date();
const input = document.getElementById("text");
const remove = document.querySelector(".minus");
const list = document.getElementById("list");

//Declaring add button + adding event listener
const plus = document
  .getElementById("plus")
  .addEventListener("click", function(e) {
    if (input.value) {
      addTodo(input.value);
    }
    input.value = "";
  });
//Variables
let LIST = [],
  id = 0;

//get item from local storage
let data = localStorage.getItem("TODO");
//check if data is not empty
if (data) {
  LIST = JSON.parse(data);
  id = LIST.length;
  loadList(LIST);
} else {
  LIST = [];
  id = 0;
}
//load items to the user interface
function loadList(array) {
  array.forEach(item => {
    addTodo(item.name, item.id, item.deleted);
  });
}
//Show date
date.textContent = today.toDateString();
//add todo note function
function addTodo(todo, id, deleted) {
  if (deleted) {
    return;
  }
  const li = document.createElement("li");
  li.className = "item";
  li.innerHTML = `<span>${todo}</span>
    <button class="minus" id=${id}>-</button>`;
  list.insertAdjacentElement("beforeend", li);
}
//Enter to add todo note
document.addEventListener("keypress", function(e) {
  if (e.keyCode == 13) {
    const todo = input.value;
    if (todo) {
      addTodo(todo, id, false);
      LIST.push({
        name: todo,
        id: id,
        deleted: false
      });
      //add item to localstorage (this code must be added when its updated)
      localStorage.setItem("TODO", JSON.stringify(LIST));
      id++;
    }
    input.value = "";
  }
});

//Remove function
function removeTodo(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);
  LIST[element.id].deleted = true;
}
//Remove button click listener
list.addEventListener("click", function(e) {
  if (e.target.nodeName.toLowerCase() !== "button") {
    return;
  }
  e.stopPropagation();
  removeTodo(e.target);
  //add item to localstorage (this code must be added when its updated)
  localStorage.setItem("TODO", JSON.stringify(LIST));
});
