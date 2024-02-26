document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('taskInput');
    const addButton = document.getElementById('addButton');
    const taskList = document.getElementById('taskList');
    const completedList = document.getElementById('completedList');
    const trashList = document.getElementById('trashList');

    loadTasks();

    addButton.addEventListener('click', addTask);

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            const taskItem = createTaskItem(taskText, 'active');
            taskList.appendChild(taskItem);
            saveTasks();
            taskInput.value = '';
        }
    }

    function completeTask(event) {
        const taskItem = event.target.parentElement;
        const taskText = taskItem.textContent.trim();
        taskList.removeChild(taskItem);
        const completedTaskItem = createTaskItem(taskText, 'completed');
        completedList.appendChild(completedTaskItem);
        saveTasks();
    }

    function deleteTask(event) {
        const taskItem = event.target.parentElement;
        const parentList = taskItem.parentElement;
        const taskText = taskItem.textContent.trim();

        if (parentList === taskList) {
            taskList.removeChild(taskItem);
        } else if (parentList === completedList) {
            completedList.removeChild(taskItem);
        } else if (parentList === trashList) {
            trashList.removeChild(taskItem);
        }

        saveTasks();
    }

    function createTaskItem(text, state) {
        const taskItem = document.createElement('li');
        taskItem.textContent = text;

        const completeButton = document.createElement('button');
        completeButton.textContent = 'Complete';
        completeButton.addEventListener('click', completeTask);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', deleteTask);

        taskItem.appendChild(completeButton);
        taskItem.appendChild(deleteButton);

        if (state) {
            taskItem.dataset.state = state;
        }

        return taskItem;
    }

    function saveTasks() {
        const tasksData = {
            activeTasks: getTasksDataArray(taskList),
            completedTasks: getTasksDataArray(completedList),
            deletedTasks: getTasksDataArray(trashList)
        };

        localStorage.setItem('tasksData', JSON.stringify(tasksData));
    }

    function loadTasks() {
        const tasksDataString = localStorage.getItem('tasksData');
        if (tasksDataString) {
            const tasksData = JSON.parse(tasksDataString);
            tasksData.activeTasks.forEach(data => {
                const taskItem = createTaskItem(data.text, 'active');
                taskList.appendChild(taskItem);
            });
            tasksData.completedTasks.forEach(data => {
                const taskItem = createTaskItem(data.text, 'completed');
                completedList.appendChild(taskItem);
            });
            tasksData.deletedTasks.forEach(data => {
                const taskItem = createTaskItem(data.text, 'deleted');
                trashList.appendChild(taskItem);
            });
        }
    }

    function getTasksDataArray(taskListElement) {
        const tasksDataArray = [];
        const taskItems = taskListElement.querySelectorAll('li');

        taskItems.forEach(taskItem => {
            const taskText = taskItem.textContent.trim();
            tasksDataArray.push({ text: taskText });
        });

        return tasksDataArray;
    }
});
