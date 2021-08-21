//DOM SELECT
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterTodo = document.querySelector(".filter-todo");

//EVENT LISTENERs
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteTodo);
filterTodo.addEventListener("click", filterSelection);

//FUNCTIONS
function addTodo(e) {
    //prevent normal behavior
    e.preventDefault();
   
    //create todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
   
    //create list
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;

    //save to local

    //create completed button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    
    //create trash button
   const trashButton = document.createElement("button");
   trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
   trashButton.classList.add("trash-btn");
   todoDiv.appendChild(trashButton);
   
    //attach final Todo
    todoList.appendChild(todoDiv);
}