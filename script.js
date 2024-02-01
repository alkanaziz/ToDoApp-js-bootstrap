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
    <li class="task list-group-item list-group-item-info">
        <div class="form-check">
            <input type="checkbox" id="${task.id}" class="form-check-input" />
            <label for="${task.id}" class="form-check-label">${task.taskName}</label>
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
    tasksList.push({ id: tasksList.length + 1, taskName: taskInputElem.value, status: "pending" })
    taskInputElem.value = "";

    displayTasks()
    
    event.preventDefault();

}