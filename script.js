let result;

let taskList = [
    {id: 1, taskName: "Task 1", status: "pending"},
    {id: 2, taskName: "Task 2", status: "pending"},
    {id: 3, taskName: "Task 3", status: "pending"},
    {id: 4, taskName: "Task 4", status: "pending"},
]
let ulElem = document.getElementById("task-list");


for(let task of taskList) {
    let liElem = document.createElement("li");
    liElem.className = "task list-group-item list-group-item-info";
    liElem.innerHTML = /*html*/`
        <div class="form-check">
           <input type="checkbox" id="${task.id}" class="form-check-input" />
           <label for="${task.id}" class="form-check-label">${task.taskName}</label>
        </div>
    `;
ulElem.insertAdjacentElement("beforeend", liElem);
console.log(liElem)
}
console.log(ulElem)

