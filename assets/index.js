document.addEventListener('DOMContentLoaded', () => {
    // key used in localStorage
    const STORAGE_KEY = 'my-tasks-v1';

    // Load tasks from localStorage; if none, use defaults
    function loadTasks() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return null;
            const parsed = JSON.parse(raw);
            if (!Array.isArray(parsed)) return null;
            return parsed;
        } catch (err) {
            console.error('Failed to parse tasks from localStorage', err);
            return null;
        }
    }

    function saveTasks() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(allTasks));
        } catch (err) {
            console.error('Failed to save tasks to localStorage', err);
        }
    }

    // Default sample tasks (used only when nothing in storage)
    let allTasks = loadTasks() || [
        { id: 1, description: "Sample Task 1", status: "to-do", dueDate: "2025-09-30", priority: "high" },
        { id: 2, description: "Sample Task 2", status: "to-do", dueDate: "2025-10-05", priority: "low" },
        { id: 3, description: "Sample Task 3", status: "in-progress", dueDate: "2025-10-10", priority: "low" },
        { id: 4, description: "Sample Task 4", status: "done", dueDate: "2025-10-15", priority: "high" }
    ];

    // DOM refs
    const taskList = document.getElementById("task-list");
    const inProgressList = document.getElementById("in-progress-list");
    const completedList = document.getElementById("completed-list");
    const addTaskForm = document.getElementById("add-task-form");

    // Delete by id (updates array + storage + re-render)
    function deleteTask(id) {
        allTasks = allTasks.filter(t => t.id !== id);
        saveTasks();
        renderTasks();
    }

    // Reusable task card creator (keeps layout stable for long text)
    function createTaskCard(task) {
        const li = document.createElement("li");
        // root li is a flex row with space-between
        li.classList.add(
            'w-full', 'bg-gray-50', 'p-4', 'rounded-md', 'shadow-md',
            'cursor-pointer', 'mb-4', 'flex', 'justify-between',
            'items-center', 'text-gray-900', 'gap-4'
        );
        li.setAttribute('data-id', task.id);
        li.setAttribute('draggable', 'true');

        // LEFT: description + due date (stacked vertically)
        const leftDiv = document.createElement("div");
        // flex-1 so it takes remaining space; min-w-0 needed so child .truncate works inside flex
        leftDiv.classList.add('flex', 'flex-col', 'text-left', 'flex-1', 'min-w-0');

        const taskDescription = document.createElement("span");
        taskDescription.textContent = task.description;
        // font-medium = slightly bolder; truncate = single-line + ... when overflow
        taskDescription.classList.add('font-medium', 'truncate');
        // show full description on hover (useful when truncated)
        taskDescription.title = task.description;

        const taskDueDate = document.createElement("span");
        taskDueDate.textContent = `Due: ${task.dueDate}`;
        taskDueDate.classList.add('text-sm', 'text-gray-500');

        leftDiv.appendChild(taskDescription);
        leftDiv.appendChild(taskDueDate);

        // MIDDLE: priority badge (prevent it wrapping)
        const priorityTask = document.createElement("span");
        // whitespace-nowrap keeps badge in single line and prevents it from stacking
        priorityTask.classList.add('font-bold', 'p-2', 'rounded', 'text-sm', 'whitespace-nowrap');
        const priorityText = (task.priority || '').trim().toLowerCase();
        priorityTask.textContent = `Priority: ${priorityText || 'low'}`;
        if (priorityText === 'high') {
            priorityTask.classList.add('bg-red-100', 'text-red-500');
        } else if (priorityText === 'medium') {
            priorityTask.classList.add('bg-yellow-100', 'text-yellow-500');
        } else {
            priorityTask.classList.add('bg-green-100', 'text-green-500');
        }

        // RIGHT: delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add(
            'bg-red-700', 'text-white', 'px-3', 'py-1',
            'rounded', 'hover:bg-red-800', 'text-sm', 'cursor-pointer', 'font-bold'
        );
        deleteBtn.onclick = function (e) {
            e.stopPropagation();
            deleteTask(task.id);
        };

        // Assemble li
        li.appendChild(leftDiv);
        li.appendChild(priorityTask);
        li.appendChild(deleteBtn);

        return li;
    }

    // Render lists from allTasks
    function renderTasks() {
        taskList.innerHTML = '';
        inProgressList.innerHTML = '';
        completedList.innerHTML = '';

        allTasks.forEach(task => {
            const card = createTaskCard(task);
            const status = (task.status || '').trim().toLowerCase();
            if (status === 'to-do' || status === 'todo' || status === 'to do') {
                taskList.appendChild(card);
            } else if (status === 'in-progress' || status === 'in progress' || status === 'inprogress') {
                inProgressList.appendChild(card);
            } else if (status === 'done' || status === 'completed' || status === 'complete') {
                completedList.appendChild(card);
            } else {
                // unknown status => put in to-do by default
                taskList.appendChild(card);
            }
        });
    }

    // Form handler: add new task, save, and render
    addTaskForm.onsubmit = function (event) {
        event.preventDefault();

        const descriptionInput = document.getElementById("description").value.trim();
        const statusInput = document.getElementById("status").value.trim();
        const dateInput = document.getElementById("date").value;
        const priorityInput = document.getElementById("priority").value.trim();

        if (!descriptionInput) {
            alert('Please provide a description.');
            return;
        }

        // Use a timestamp as a unique id to avoid collisions if items were deleted/added
        const newTask = {
            id: Date.now(),
            description: descriptionInput,
            status: statusInput || 'to-do',
            dueDate: dateInput || '',
            priority: priorityInput || 'low'
        };

        allTasks.push(newTask);
        saveTasks();
        addTaskForm.reset();
        renderTasks();
    };

    // Initial render
    renderTasks();
});
