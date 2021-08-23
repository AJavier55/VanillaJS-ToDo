//DOM SELECT
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterSelection = document.querySelector(".filter-todo");

//EVENT LISTENERs
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteTodo);
filterSelection.addEventListener("click", filterTodo);

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
    saveLocalTodos(todoInput.value);
    //
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    todoInput.value = "";

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

function deleteTodo(e) {
    const item = e.target

    if (item.classList[0] === "trash-btn") {
        //e.target.parentElemet.remove();
        const todo = item.parentElement;
        todo.classList.add("fall");

       removeLocalTodos(todo);
       todo.addEventListener("transitioned", e => {
           todo.remove();
       });
    }
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
        console.log(todo);
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
                case "uncompleted":
                    if (!todo.classList.contains("completed")) {
                        todo.style.display = "flex";
                    } else {
                        todo.style.display = "none";
                    }
        }
    });
}

function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null ) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo) {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        const newTodo = document.createElement("li");
        newTodo.classList.add("todo-item");
        newTodo.innerText = todo;
        todoDiv.appendChild(newTodo)
        todoInput.value = "";

        const completedButton = document.createElement("button");
        completedButton.classList.add("complete-btn");
        completedButton.innerHTML = `<i class="fas fa-check"></i>`;
        todoDiv.appendChild(completedButton);

        const trashButton = document.createElement("button");
        trashButton.classList.add("trash-btn");
        trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
        todoDiv.appendChild(trashButton);

        todoList.appendChild(todoDiv);
    });
}

