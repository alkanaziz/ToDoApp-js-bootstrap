"use strict";

let result;

let tasksList = [
    { id: 1, taskName: "Task 1", status: "pending" },
    { id: 2, taskName: "Task 2", status: "pending" },
    { id: 3, taskName: "Task 3", status: "pending" },
    { id: 4, taskName: "Task 4", status: "pending" },
]

let editId;
let isEditTask = false;

const taskInputElem = document.querySelector("#taskInput");

const deleteAllBtnElem = document.getElementById("deleteAllBtn");

displayTasks()

function displayTasks() {
    let ulElem = document.getElementById("task-list");

    if (tasksList.length == 0) {
        ulElem.innerHTML = /*html*/`
            <p class="p-3 m-0">Du hast keine Aufgabe...</p>
        `;
    } else {
        // ADD and DISPLAY TASK from tasksList with "insertAdjacentHTML"
        ulElem.innerHTML = tasksList.map((task) => {
            return /*html*/`
                <li class="task list-group-item list-group-item-info d-flex justify-content-between align-items-center">
                    <div class="form-check">
                        <input type="checkbox" id="${task.id}" class="form-check-input" />
                        <label for="${task.id}" class="form-check-label">${task.taskName}</label>
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
let btnAddNewTaskElem = document.querySelector("#btnAddNewTask");
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
        displayTasks()
    }

    event.preventDefault();

};

// DELETE TASK
function deleteTask(id) {
    // console.log(id);
    let deletedId;

    // Erste Lösung mit for loop
    // for(let i in tasksList) {
    //     if(tasksList[i].id == id) {
    //         deletedId = i;
    //     }
    // };

    // Zweite Lösung mit findIndex 
    deletedId = tasksList.findIndex(task => task.id == id);
    // console.log(deletedId)

    tasksList.splice(deletedId, 1);
    displayTasks();
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
});
