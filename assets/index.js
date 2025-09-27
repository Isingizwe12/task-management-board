document.addEventListener('DOMContentLoaded', () => {
    // Your task data
    let allTasks = [
        { id: 1, description: "Sample Task 1", status: "to-do", dueDate: "2025-09-30", priority: "high" },
        { id: 2, description: "Sample Task 2", status: "to-do", dueDate: "2025-10-05", priority: "low" },
        { id: 3, description: "Sample Task 3", status: "in-progress", dueDate: "2025-10-10", priority: "low" },
        { id: 4, description: "Sample Task 4", status: "done", dueDate: "2025-10-15", priority: "high" }
    ];

    // Get references to the UL elements
    const taskList = document.getElementById("task-list");
    const inProgressList = document.getElementById("in-progress-list");
    const completedList = document.getElementById("completed-list");
    const addTaskForm = document.getElementById("add-task-form");

    // Function to create a styled task card (reusable)
   function createTaskCard(task) {
    let li = document.createElement("li");
    li.classList.add(
        'w-full', 'bg-gray-50', 'p-4', 'rounded-md', 'shadow-md',
        'cursor-pointer', 'mb-4', 'flex', 'justify-between',
        'items-center', 'text-gray-900', 'gap-4'
    );
    li.setAttribute('data-id', task.id);
    li.setAttribute('draggable', 'true');

    // Left section: description + due date
    let leftDiv = document.createElement("div");
    leftDiv.classList.add('flex', 'flex-col', 'text-left', 'flex-1', 'min-w-0');

    let taskDescription = document.createElement("span");
    taskDescription.textContent = task.description;
    taskDescription.classList.add('font-medium', 'truncate'); // keeps it tidy

    let taskDueDate = document.createElement("span");
    taskDueDate.textContent = `Due: ${task.dueDate}`;
    taskDueDate.classList.add('text-sm', 'text-gray-500');

    leftDiv.appendChild(taskDescription);
    leftDiv.appendChild(taskDueDate);

    // Middle: priority badge
    let priorityTask = document.createElement("span");
    priorityTask.textContent = `Priority: ${task.priority.trim()}`;
    priorityTask.classList.add('font-bold', 'p-2', 'rounded', 'text-sm', 'whitespace-nowrap');
    if (task.priority.trim() === "high") {
        priorityTask.classList.add('bg-red-100', 'text-red-500');
    } else if (task.priority.trim() === "medium") {
        priorityTask.classList.add('bg-yellow-100', 'text-yellow-500');
    } else {
        priorityTask.classList.add('bg-green-100', 'text-green-500');
    }

    // Right: delete button
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add(
        'bg-red-700', 'text-white', 'px-3', 'py-1',
        'rounded', 'hover:bg-red-800', 'text-sm', 'cursor-pointer', 'font-bold'
    );
    deleteBtn.onclick = function() {
        li.remove();
    };

    // Put them all inside li
    li.appendChild(leftDiv);
    li.appendChild(priorityTask);
    li.appendChild(deleteBtn);

    return li;
}


    // New function to render all tasks
    function renderTasks() {
        // Clear all existing task cards
        taskList.innerHTML = '';
        inProgressList.innerHTML = '';
        completedList.innerHTML = '';

        // Render tasks based on their status
        allTasks.forEach(task => {
            const card = createTaskCard(task);
            const status = task.status.trim();
            if (status === "to-do") {
                taskList.appendChild(card);
            } else if (status === "in-progress") {
                inProgressList.appendChild(card);
            } else if (status === "done") {
                completedList.appendChild(card);
            }
        });
    }

    // Form submission handler
    addTaskForm.onsubmit = function(event) {
        event.preventDefault();

        // Get input values inside the handler
        const descriptionInput = document.getElementById("description").value;
        const statusInput = document.getElementById("status").value;
        const dateInput = document.getElementById("date").value;
        const priorityInput = document.getElementById("priority").value;

     

        // Create a new task object with a unique ID
        const newTaskId = allTasks.length > 0 ? Math.max(...allTasks.map(t => t.id)) + 1 : 1;
        const newTask = {
            id: newTaskId,
            description: descriptionInput,
            status: statusInput,
            dueDate: dateInput,
            priority: priorityInput
        };

        // Push the new task to the array
        allTasks.push(newTask);
        
        // Reset the form and re-render the lists
        addTaskForm.reset();
        renderTasks(); // Call the function to re-render everything
    };
    
    // Initial render when the page loads
    renderTasks();
});
