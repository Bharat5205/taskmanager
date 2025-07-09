let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";
  tasks.forEach((task, index) => {
    const taskEl = document.createElement("div");
    taskEl.className = "task" + (task.done ? " done" : "");
    taskEl.innerHTML = `
      <strong>${task.title}</strong> - Due: ${task.dueDate}<br>
      <small>${task.description}</small>
      <div class="actions">
        <button onclick="toggleDone(${index})">${task.done ? "Undo" : "Done"}</button>
        <button onclick="deleteTask(${index})">Delete</button>
      </div>
    `;
    list.appendChild(taskEl);
  });
}

function addTask() {
  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();
  const dueDate = document.getElementById("dueDate").value;
  if (!title) return alert("Task title is required");

  tasks.push({ title, description, dueDate, done: false });
  saveTasks();
  renderTasks();
  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
  document.getElementById("dueDate").value = "";
}

function toggleDone(index) {
  tasks[index].done = !tasks[index].done;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

renderTasks();
