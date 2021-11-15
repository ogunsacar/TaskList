// define uı vars

const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection"); // ul
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter"); // input
const taskInput = document.querySelector("#task");

// load all event listeners

loadEventListeners();

function loadEventListeners() {

  //Dom load event listeners

  document.addEventListener("DOMContentLoaded", getTasks)

  //add task event

  form.addEventListener("submit", addtask);

  // remove task event
  taskList.addEventListener("click", removeTask);
  // clear task event

  clearBtn.addEventListener("click", clearTasks);

  // filter tasks event
  filter.addEventListener("keyup", filterTasks);
}

// createing getTasks for ls

function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task) {
    // create li element 
    const li = document.createElement("li");
    // add class
    li.className = "collection-item";

    // create tect node and append to li

    li.appendChild(document.createTextNode(task));

    // create new link element 
    const link = document.createElement("a");
    // add class
    link.className = "delete-item secondary-content";
    // add the icon html

    link.innerHTML = '<i class = "fa fa-trash"></i>';

    // append the link to li
    li.appendChild(link);

    //append the li  to ul 

    taskList.appendChild(li);
  })
}



// creating addtask function

function addtask(e) {
  if (taskInput.value === "") {
    alert("add a task")
  }

  // create li element 
  const li = document.createElement("li");
  // add class
  li.className = "collection-item";

  // create tect node and append to li

  li.appendChild(document.createTextNode(taskInput.value));

  // create new link element 
  const link = document.createElement("a");
  // add class
  link.className = "delete-item secondary-content";
  // add the icon html

  link.innerHTML = '<i class = "fa fa-trash"></i>';

  // append the link to li
  li.appendChild(link);

  //append the li  to ul 

  taskList.appendChild(li);


  // store in ls

  storeTaskInLocalStorage(taskInput.value);


  // clear input

  taskInput.value = "";



  e.preventDefault();
}


// storeTask

function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}




// remove task

function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();

      // remove from ls
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// create the function removeTaskFromLocalStorage

function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  })

  localStorage.setItem("tasks", JSON.stringify("tasks"));
}

// CREATE THE CLEARTASK FUNCTION

function clearTasks() {
  // taskList.innerHTML = "";

  // faster
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
}

function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}

