"use strict";

let result;

let tasksList = [
    { id: 1, taskName: "Task 1", status: "pending" },
    { id: 2, taskName: "Task 2", status: "pending" },
    { id: 3, taskName: "Task 3", status: "pending" },
    { id: 4, taskName: "Task 4", status: "pending" },
]

displayTasks()

function displayTasks() {
    let ulElem = document.getElementById("task-list");
    ulElem.innerHTML = "";

    // ADD and DISPLAY TASK from tasksList with "insertAdjacentHTML"
    for (let task of tasksList) {

        let liElem = /*html*/ `
    <li class="task list-group-item list-group-item-info d-flex justify-content-between align-items-center">
        <div class="form-check">
            <input type="checkbox" id="${task.id}" class="form-check-input" />
            <label for="${task.id}" class="form-check-label">${task.taskName}</label>
        </div>
        <div class="dropdown">
            <button class="btn btn-link dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa-solid fa-ellipsis"></i></button>
            <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#"><i class="fa-solid fa-pen"></i> Bearbeiten</a></li>
                <li><a class="dropdown-item" href="#"><i class="fa-solid fa-trash"></i> Löschen</a></li>
            </ul>
        </div>
    </li>
    `;
        ulElem.insertAdjacentHTML("beforeend", liElem);

    }
};

// ADD NEW TASK BUTTON
let btnAddNewTaskElem = document.querySelector("#btnAddNewTask");
btnAddNewTaskElem.addEventListener("click", addNewTask);

function addNewTask(event) {

    let taskInputElem = document.querySelector("#taskInput");

    if (taskInputElem.value === "") {
        alert("Bitte geben Sie eine Aufgabe ein...")
    } else {
        tasksList.push({ id: tasksList.length + 1, taskName: taskInputElem.value, status: "pending" })
        taskInputElem.value = "";
        displayTasks()
    }
    
    event.preventDefault();

}