//добавить задачу в список в зависимости от статуса
function addTaskToList(task) {
    let taskList;
    if (task.status === 'active') {
        taskList = document.getElementById('active-tasks');
    } else if (task.status === 'completed') {
        taskList = document.getElementById('completed-tasks');
        addDeleteButton(task, taskList);
    } else if (task.status === 'deleted') {
        taskList = document.getElementById('deleted-tasks');
    }

    let taskItem = document.createElement('li');
    taskItem.textContent = task.text;

    taskList.appendChild(taskItem);

    taskItem.addEventListener('click', function () {
        completeTask(task);
    });

    taskItem.addEventListener('contextmenu', function (event) {
        event.preventDefault();
        deleteTask(task);
    });
}

function addTaskToList(task) {
    let taskList;
    if (task.status === 'active') {
        taskList = document.getElementById('active-tasks');
    } else if (task.status === 'completed') {
        taskList = document.getElementById('completed-tasks');
        addDeleteButton(task, taskList);
    } else if (task.status === 'deleted') {
        taskList = document.getElementById('deleted-tasks');
    }

    let taskItem = document.createElement('li');

    let taskContainer = document.createElement('div');
    taskContainer.textContent = task.text;


    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.style.position = 'absolute';  
    deleteButton.style.right = '5px';  
    deleteButton.addEventListener('click', function () {
        deleteTask(task);
    });
    taskContainer.appendChild(deleteButton);
    
    taskItem.appendChild(taskContainer);

    taskList.appendChild(taskItem);

    taskItem.addEventListener('click', function () {
        completeTask(task);
    });

    taskItem.addEventListener('contextmenu', function (event) {
        event.preventDefault();
        deleteTask(task);
    });
}
//обновление заголовка
function toggleView(view) {
    let activeTasks = document.getElementById('active-tasks');
    let completedTasks = document.getElementById('completed-tasks');
    let deletedTasks = document.getElementById('deleted-tasks');
    let pageTitle = document.querySelector('.container h1');

    activeTasks.style.display = view === 'active' ? 'block' : 'none';
    completedTasks.style.display = view === 'completed' ? 'block' : 'none';
    deletedTasks.style.display = view === 'deleted' ? 'block' : 'none';

    switch (view) {
        case 'active':
            pageTitle.textContent = 'Active Tasks';
            break;
        case 'completed':
            pageTitle.textContent = 'Completed Tasks';
            break;
        case 'deleted':
            pageTitle.textContent = 'Deleted Tasks';
            break;
        default:
            pageTitle.textContent = 'Planning App';
    }

    saveTasks();
}

document.addEventListener('DOMContentLoaded', function () { loadTasks(); } );

//добавление задачи
function addTask() {
    let newTaskInput = document.getElementById('newTaskInput');
    let taskText = newTaskInput.value.trim();

    if (taskText !== '') {
        let task = {
        id: new Date().getTime(),
        text: taskText,
        status: 'active' 
        };

        addTaskToList(task);
        saveTasks();
    }
        newTaskInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        addTask();
    }
    });

    newTaskInput.value = '';
}

function addTaskToList(task) {
    let taskList;
    if (task.status === 'active') {
        taskList = document.getElementById('active-tasks');
    } else if (task.status === 'completed') {
        taskList = document.getElementById('completed-tasks');
    } else if (task.status === 'deleted') {
        taskList = document.getElementById('deleted-tasks');
    }

    let taskItem = document.createElement('li');
    taskItem.textContent = task.text;

    taskList.appendChild(taskItem);

    taskItem.addEventListener('click', function () {
        completeTask(task);
    });

    taskItem.addEventListener('contextmenu', function (event) {
        event.preventDefault();
        deleteTask(task);
    });
}

//завершённая
function completeTask(task) {
    task.status = 'completed';
    moveTaskToList(task, 'active', 'completed');
    saveTasks();
}

//удаление
function deleteTask(task) {
    if (confirm('Are you sure you want to delete this task?')) {
        moveTaskToList(task, 'active', 'deleted');
        moveTaskToList(task, 'completed', 'deleted');
        saveTasks();
    }
}

//перемещение в другой список
function moveTaskToList(task, fromListId, toListId) {
    let fromList = document.getElementById(fromListId + '-tasks');
    let toList = document.getElementById(toListId + '-tasks');

    let taskItem = findTaskItem(task, fromList);
    if (taskItem) {
        fromList.removeChild(taskItem);
        task.status = toListId.replace('-tasks', '');
        addTaskToList(task); 
        saveTasks();
    }
}


function findTaskItem(task, list) {
    let taskItems = list.getElementsByTagName('li');
    for (let i = 0; i < taskItems.length; i++) {
        if (taskItems[i].textContent === task.text) {
        return taskItems[i];
        }
    }
    return null;
}

//фильтр
function updateView() {
    let selectedFilter = document.getElementById('taskFilter').value;
    toggleView(selectedFilter);
    saveTasks();
}

//сахронение 
function saveTasks() {
    let tasks = {
        active: getTasksFromList('active-tasks'),
        completed: getTasksFromList('completed-tasks'),
        deleted: getTasksFromList('deleted-tasks')
    };

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    let tasksString = localStorage.getItem('tasks');
    if (tasksString) {
        let tasks = JSON.parse(tasksString);
        tasks.active.forEach(task => addTaskToList(task));
        tasks.completed.forEach(task => addTaskToList(task));
        tasks.deleted.forEach(task => addTaskToList(task));
    }
}

function getTasksFromList(listId) {
    let taskItems = document.getElementById(listId).getElementsByTagName('li');
    let tasks = [];
    for (let i = 0; i < taskItems.length; i++) {
        let task = {
        text: taskItems[i].textContent,
        status: listId.replace('-tasks', '') 
        };
        tasks.push(task);
    }
    return tasks;
}
