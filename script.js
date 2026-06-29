let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask(){
    const text = document.getElementById("taskInput").value.trim();
    const date = document.getElementById("taskDate").value;
    const priority = document.getElementById("priority").value;

    if(text === ""){
        alert("Please enter a task!");
        return;
    }

    tasks.push({
        text,
        date,
        priority,
        completed:false
    });

    saveTasks();
    renderTasks();

    document.getElementById("taskInput").value="";
    document.getElementById("taskDate").value="";
}

function renderTasks(){
    const taskList = document.getElementById("taskList");
    const search = document.getElementById("search").value.toLowerCase();
    const filter = document.getElementById("filter").value;

    taskList.innerHTML = "";

    let filteredTasks = tasks.filter(task=>{
        let searchMatch = task.text.toLowerCase().includes(search);
        let filterMatch = filter==="all" ||
            (filter==="completed" && task.completed) ||
            (filter==="pending" &&!task.completed);
        return searchMatch && filterMatch;
    });

    filteredTasks.forEach((task,index)=>{
        const div = document.createElement("div");
        div.className = `task ${task.priority}`;

        div.innerHTML = `
            <h3 class="${task.completed? 'completed' : ''}">
                ${task.text}
            </h3>
            <p>📅 ${task.date || 'No Date Set'}</p>
            <p>🏷️ ${task.priority.toUpperCase()} Priority</p>
            <div class="actions">
                <button class="complete-btn" onclick="toggleTask(${index})">
                    ${task.completed? 'Undo' : 'Complete'}
                </button>
                <button class="edit-btn" onclick="editTask(${index})">
                    Edit
                </button>
                <button class="delete-btn" onclick="deleteTask(${index})">
                    Delete
                </button>
            </div>
        `;
        taskList.appendChild(div);
    });

    document.getElementById("counter").innerHTML =
        `📌 Total Tasks: ${tasks.length} | ✅ Completed: ${tasks.filter(t=>t.completed).length}`;
}

function toggleTask(index){
    tasks[index].completed =!tasks[index].completed;
    saveTasks();
    renderTasks();
}

function editTask(index){
    let newTask = prompt("Edit Task", tasks[index].text);
    if(newTask && newTask.trim()!== ""){
        tasks[index].text = newTask;
        saveTasks();
        renderTasks();
    }
}

function deleteTask(index){
    if(confirm("Delete this task?")){
        tasks.splice(index,1);
        saveTasks();
        renderTasks();
    }
}

renderTasks();s