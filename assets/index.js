// Your task data
let taskTodo = [
    { id: 1, description: "Sample Task 1", status: " to-do", dueDate: "2025-09-30", priority: " high" },
    { id: 2, description: "Sample Task 2", status: " to-do", dueDate: "2025-10-05", priority: " low" },
    { id: 3, description: "Sample Task 3", status: " in-progress", dueDate: "2025-10-10", priority: " low" },
    { id: 4, description: "Sample Task 4", status: " done", dueDate: "2025-10-15", priority: " high" }
];

// Get references to the UL elements
let taskList = document.getElementById("task-list");
let inProgressList = document.getElementById("in-progress-list");
let completedList = document.getElementById("completed-list");

// Function to create a styled task card (reusable code)
function createTaskCard(task) {
    let li = document.createElement("li");
    li.classList.add(
        'w-full', 'bg-gray-50', 'p-4', 'rounded-md', 'shadow-md', 'cursor-pointer', 'mb-4',
        'flex', 'justify-between', 'items-center', 'text-gray-900'
    );

    let taskDescription = document.createElement("span");
    taskDescription.textContent = task.description;

    let taskDueDate = document.createElement("span");
    taskDueDate.textContent = `Due: ${task.dueDate}`;

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add('bg-red-700', 'text-white', 'p-2', 'rounded', 'hover:bg-red-700', 'ml-4', 'text-sm','cursor-pointer','font-bold');
    deleteBtn.onclick = function() {
        li.remove();
    }


    let priorityTask = document.createElement("span");
    priorityTask.textContent = `Priority: ${task.priority.trim()}`; // Use trim() to clean up the string
    if (task.priority.trim() === "high") {
        priorityTask.classList.add('bg-red-100', 'text-red-500', 'font-bold', 'p-2', 'rounded', 'text-sm');
    } else if (task.priority.trim() === "medium") {
        priorityTask.classList.add('bg-yellow-100', 'text-yellow-500', 'font-bold', 'p-2', 'rounded', 'text-sm');
    } else { // Handle low or other cases
        priorityTask.classList.add('bg-green-100', 'text-green-500', 'font-bold', 'p-2', 'rounded', 'text-sm');
    }

    li.appendChild(taskDescription);
    li.appendChild(taskDueDate);
    li.appendChild(priorityTask);
    li.appendChild(deleteBtn);
    return li;
}

// Display "to-do" tasks
let toDoTasks = taskTodo.filter(task => task.status.trim() === "to-do");
toDoTasks.forEach(task => {
    let card = createTaskCard(task);
    taskList.appendChild(card);
});

// Display "in-progress" tasks
let inProgress = taskTodo.filter(task => task.status.trim() === "in-progress");
inProgress.forEach(task => {
    let card = createTaskCard(task);
    inProgressList.appendChild(card);
});

// Display "completed" tasks
let completed = taskTodo.filter(task => task.status.trim() === "done");
completed.forEach(task => {
    let card = createTaskCard(task);
    completedList.appendChild(card);
});
