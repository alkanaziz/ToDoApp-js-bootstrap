"use strict";

const tasksList = localStorage.getItem("tasksList") ? JSON.parse(localStorage.getItem("tasksList")) : [];

// SAVE "tasksList" Array to LocalStorage
function saveToLocalStorage() {
    localStorage.setItem("tasksList", JSON.stringify(tasksList));
}

let editId;
let isEditTask = false;
const taskInputElem = document.querySelector("#taskInput");
const btnAddNewTaskElem = document.querySelector("#btnAddNewTask");
const deleteAllBtnElem = document.getElementById("deleteAllBtn");
const filtersSpanElem = document.querySelectorAll(".filters span");

displayTasks("all")

function displayTasks(filter) {
    let ulElem = document.getElementById("task-list");
    
    if (tasksList.length == 0) {
        ulElem.innerHTML = /*html*/`
            <p class="p-3 m-0">Du hast keine Aufgabe...</p>
            `;
    } else {
        // DISPLAY TASK from tasksList with "filter()" and "map()" Methods
        ulElem.innerHTML = tasksList.filter((task) => task.status == filter || filter == "all").map((task) => {
            let isCompleted = task.status == "completed" ? "checked" : "";
            return /*html*/`
                <li class="task list-group-item list-group-item-info d-flex justify-content-between align-items-center">
                    <div class="form-check">
                        <input onclick="updateStatus(this)" type="checkbox" id="${task.id}" class="form-check-input" ${isCompleted} />
                        <label for="${task.id}" class="form-check-label ${isCompleted}">${task.taskName}</label>
                    </div>
                    <div class="dropdown">
                        <button class="btn btn-link dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa-solid fa-ellipsis"></i></button>
                        <ul class="dropdown-menu">
                            <li><a onclick="editTask(${task.id}, '${task.taskName}')" class="dropdown-item" href="#"><i class="fa-solid fa-pen"></i> Bearbeiten</a></li>
                            <li><a onclick="deleteTask(${task.id})" class="dropdown-item" href="#"><i class="fa-solid fa-trash"></i> Löschen</a></li>
                        </ul>
                    </div>
                </li>
                `;
        }).join("");
    }

};

// ADD NEW TASK and EDIT TASK FUNCTION
btnAddNewTaskElem.addEventListener("click", addNewTask);

function addNewTask(event) {

    if (taskInputElem.value === "") {
        alert("Bitte geben Sie eine Aufgabe ein...")
    } else {

        if (!isEditTask) {
            // Add New Task
            let newId = tasksList.length == 0 ? 1 : tasksList[tasksList.length - 1].id + 1;
            tasksList.push({ id: newId, taskName: taskInputElem.value, status: "pending" })
        } else {
            // Edit selected Task
            for (let task of tasksList) {
                if (task.id == editId) {
                    task.taskName = taskInputElem.value;
                }
                isEditTask = false;
            }
        }
        taskInputElem.value = "";
        displayTasks(document.querySelector(".filters span.active").id)
    }

    event.preventDefault();
    saveToLocalStorage();
};

// DELETE TASK
function deleteTask(id) {
    let deletedId;

    deletedId = tasksList.findIndex(task => task.id == id);

    tasksList.splice(deletedId, 1);
    displayTasks(document.querySelector(".filters span.active").id);
    saveToLocalStorage();
};

// EDIT TASK FUNKTION
function editTask(taskId, taskName) {
    isEditTask = true;
    editId = taskId;
    taskInputElem.value = taskName;
    taskInputElem.focus();
    taskInputElem.classList.add("active");
};

// DELETE ALLS TASK FUNCTION MIT addEventListener()
deleteAllBtnElem.addEventListener("click", function () {
    tasksList.splice(0, tasksList.length);
    displayTasks();
    saveToLocalStorage();
});

// UPDATE STATUS und STYLE OF TASKS with toggle() und findIndex() methods
function updateStatus(selectedTask) {
    let labelElem = selectedTask.nextElementSibling;
    let newStatus = selectedTask.checked ? "completed" : "pending";

    labelElem.classList.toggle("checked", selectedTask.checked)

    let selectedTaskIndex = tasksList.findIndex(task => task.id == selectedTask.id);
    tasksList[selectedTaskIndex].status = newStatus;
   
    displayTasks(document.querySelector(".filters span.active").id)
    saveToLocalStorage();
};

// FILTERS
for(let span of filtersSpanElem) {
    span.addEventListener("click", () => {
        document.querySelector("span.active").classList.remove("active");
        span.classList.add("active");
        displayTasks(span.id);
    })
};