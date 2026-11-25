let tasks = [];

function displayTasks() {
    document.getElementById("list").innerHTML = "";

    tasks.forEach((task, index) => {
        let li = document.createElement("li");

        li.innerHTML = `
            <span class="${task.done ? 'done' : ''}">
                ${task.name}
            </span>
            <button onclick="completeTask(${index})">Done</button>
            <button onclick="deleteTask(${index})">Delete</button>
        `;

        document.getElementById("list").appendChild(li);
    });
}

function addTask() {
    let value = document.getElementById("task").value;

    if (value.trim() !== "") {
        tasks.push({name: value, done: false});
        document.getElementById("task").value = "";
        displayTasks();
    }
}

function completeTask(index) {
    tasks[index].done = !tasks[index].done;
    displayTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    displayTasks();
}