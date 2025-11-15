let tasks = [];
let selectedTask = null;
let time = 0;
let isRunning = false;
let timerInterval = null;

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}s`;
}

function addTask() {
    const name = taskInput.value.trim();
    if (!name) return;

    tasks.push({
        id: Date.now(),
        name,
        totalTime: 0
    });

    taskInput.value = "";
    renderTasks();
}

function startTask(id) {
    if (isRunning && selectedTask && selectedTask.id !== id) {
        alert("Stop the current task before switching!");
        return;
    }

    selectedTask = tasks.find(t => t.id === id);
    isRunning = true;

    timerInterval = setInterval(() => {
        time++;
        renderTasks();
    }, 1000);

    renderTasks();
}

function stopTask() {
    if (!selectedTask) return;

    selectedTask.totalTime += time;
    isRunning = false;
    time = 0;
    selectedTask = null;

    clearInterval(timerInterval);
    renderTasks();
}

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach(task => {
        const card = document.createElement("div");
        card.className = "task-card";

        const isCurrent = selectedTask?.id === task.id;

        card.innerHTML = `
            <div class="title">${task.name}</div>

            <div class="time-display">Total Time: ${formatTime(task.totalTime)}</div>

            ${
                isCurrent
                    ? `<div class="time-display" style="color:#007bff;font-weight:bold">
                          Current: ${formatTime(time)}
                       </div>
                       <button class="red-btn" onclick="stopTask()">Stop</button>`
                    : `<button class="green-btn" onclick="startTask(${task.id})">Start Task</button>`
            }
        `;

        taskList.appendChild(card);
    });
}

addBtn.addEventListener("click", addTask);
