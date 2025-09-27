let taskTodo = [
    {
        id: 1,
        description: "Sample Task 1",
        status:" to-do",
        dueDate:"2025-09-30"

    },
    {
        id: 2,
        description: "Sample Task 2",
        status:" to-do",
        dueDate:"2025-10-05"
    },
    {
        id: 3,
        description: "Sample Task 3",
        status:" in-progress",
        dueDate:"2025-10-10"
    },
    {
        id: 4,
        description: "Sample Task 4",
        status:" done",
        dueDate:"2025-10-15"
    }

];

let inProgressTasks = document.getElementById("in-progress-list");
let completedTasks = document.getElementById("completed-list");

let taskList=document.getElementById("task-list");

let toDoTasks=taskTodo.filter(task=>task.status===" to-do");

toDoTasks.forEach(task=>{

let li = document.createElement("li");
li.classList.add(
    'w-full', 
    'bg-gray-50',
    'p-4',
    'rounded-md',
    'shadow-md',
    'cursor-grab',
    'mb-4',
    'flex',
    'justify-between',
    'items-center',
    'text-gray-900');

let taskDescription = document.createElement("span");
taskDescription.textContent = task.description;

let taskDueDate = document.createElement("span");
taskDueDate.textContent = `Due: ${task.dueDate}`;

li.appendChild(taskDescription); // Append the first child
li.appendChild(taskDueDate);     // Append the second child

taskList.appendChild(li);

});


let inProgress=taskTodo.filter(task=>task.status===" in-progress");
inProgress.forEach(task=>{
    let ul = document.createElement("ul");
    ul.classList.add(
        'w-full', 
        'bg-blue-50',
        'p-4',
        'rounded-md',
        'shadow-md',
        'mb-4',
        'text-gray-900'
    );
    let taskDescription = document.createElement("li");
    taskDescription.textContent = task.description;
    ul.appendChild(taskDescription);
    inProgressTasks.appendChild(ul);
});


let completed=taskTodo.filter(task=>task.status===" done");
completed.forEach(task=>{
    let ul = document.createElement("ul");
    ul.classList.add(
        'w-full',
        'bg-green-50',
        'p-4',
        'rounded-md',
        'shadow-md',
        'mb-4', 
        'text-gray-900'
    );
    let taskDescription = document.createElement("li");
    taskDescription.textContent = task.description;
    ul.appendChild(taskDescription);
    completedTasks.appendChild(ul);
});