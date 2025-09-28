**Task Management Board**

A web-based task management application built with HTML, Tailwind CSS, and vanilla JavaScript. Users can add, edit, delete, and track tasks with different statuses and priorities. All tasks are stored in localStorage, ensuring persistence across browser sessions.

**How it looks**

![How task management board looks](/assets/images/task-management.png)


**Features**

Add Tasks: Enter a description, due date, priority, and status.

Edit Tasks: Modify tasks using a modal form.

Delete Tasks: Remove tasks individually.

Task Status Management: Tasks are automatically organized into:

**To Do**

**In Progress**

**Completed**

Priority Indicators: Color-coded badges for Low, Medium, and High priority tasks.

Persistent Storage: All tasks are saved in the browser localStorage.

Responsive Design: Works on mobile, tablet (including iPad Mini), and desktop screens.

Drag-and-drop ready: Tasks include the draggable attribute for future enhancements.

**Technologies Used**

HTML5

Tailwind CSS (via CDN)

JavaScript (vanilla)   

**Key Sections in index.html**

Header: Displays the title “Task Management Board”.

Sidebar:

Categories (All Tasks, In Progress, Completed)

Add Task Form (Description, Due Date, Priority, Status)

Main Content: Displays tasks in three sections:

To Do

In Progress

Completed

Edit Modal: Hidden form for editing tasks.

Task Cards: Dynamically created with JS and color-coded by priority.

Usage

Open index.html in a web browser.

Add a task using the sidebar form.

Edit or delete tasks using the buttons on each task card.

Tasks automatically move between sections based on status.

All tasks are saved automatically in localStorage.

**How It Works**

Add Task: Sidebar form → task added to allTasks array → stored in localStorage → rendered in the correct section.

Edit Task: Open modal → update task in array → update localStorage → re-render task list.

Delete Task: Remove task from array → update localStorage → re-render list.

Checkbox: Marks tasks as completed → automatically moves task to Completed section.



Author

Isingizwe Aline