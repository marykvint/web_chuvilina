// // function getCurrentTime() {
// //     const now = new Date();
// //     const hours = now.getHours().toString().padStart(2, '0'); // Добавляем ведущий ноль, если нужно
// //     const minutes = now.getMinutes().toString().padStart(2, '0'); // Добавляем ведущий ноль, если нужно
// //     return `${hours}:${minutes}`;
// // }
// //добавить задачу в список в зависимости от статуса
// // function addTaskToList(task) {
// //     let taskList;
// //     if (task.status === 'active') {
// //         taskList = document.getElementById('active-tasks');
// //     } else if (task.status === 'completed') {
// //         taskList = document.getElementById('completed-tasks');
// //         addDeleteButton(task, taskList);
// //     } else if (task.status === 'deleted') {
// //         taskList = document.getElementById('deleted-tasks');
// //     }

// //     let taskItem = document.createElement('li');
// //     taskItem.textContent = task.text;

// //     taskList.appendChild(taskItem);

// //     taskItem.addEventListener('click', function () {
// //         completeTask(task);
// //     });

// //     taskItem.addEventListener('contextmenu', function (event) {
// //         event.preventDefault();
// //         deleteTask(task);
// //     });
// // }

// function addTaskToList(task) {
//     let taskList;
//     if (task.status === 'active') {
//         taskList = document.getElementById('active-tasks');
//     } else if (task.status === 'completed') {
//         taskList = document.getElementById('completed-tasks');
//         addDeleteButton(task, taskList);
//     } else if (task.status === 'deleted') {
//         taskList = document.getElementById('deleted-tasks');
//     }

//     let taskItem = document.createElement('li');

//     let taskContainer = document.createElement('div');
//     taskContainer.textContent = task.text;


//     let deleteButton = document.createElement('button');
//     deleteButton.textContent = 'Delete';
//     deleteButton.style.position = 'absolute';  
//     deleteButton.style.right = '5px';  
//     deleteButton.addEventListener('click', function () {
//         deleteTask(task);
//     });
//     taskContainer.appendChild(deleteButton);
    
//     taskItem.appendChild(taskContainer);

//     taskList.appendChild(taskItem);

//     taskItem.addEventListener('click', function () {
//         completeTask(task);
//     });

//     taskItem.addEventListener('contextmenu', function (event) {
//         event.preventDefault();
//         deleteTask(task);
//     });
// }

// //обновление заголовка
// function toggleView(view) {
//     let activeTasks = document.getElementById('active-tasks');
//     let completedTasks = document.getElementById('completed-tasks');
//     let deletedTasks = document.getElementById('deleted-tasks');
//     let pageTitle = document.querySelector('.container h1');

//     activeTasks.style.display = view === 'active' ? 'block' : 'none';
//     completedTasks.style.display = view === 'completed' ? 'block' : 'none';
//     deletedTasks.style.display = view === 'deleted' ? 'block' : 'none';

//     switch (view) {
//         case 'active':
//             pageTitle.textContent = 'Active Tasks';
//             break;
//         case 'completed':
//             pageTitle.textContent = 'Completed Tasks';
//             break;
//         case 'deleted':
//             pageTitle.textContent = 'Deleted Tasks';
//             break;
//         default:
//             pageTitle.textContent = 'Planning App';
//     }

//     saveTasks();
// }

// document.addEventListener('DOMContentLoaded', function () { loadTasks(); } );

// // //добавление задачи
// // function addTask() {
// //     let newTaskInput = document.getElementById('newTaskInput');
// //     let taskText = newTaskInput.value.trim();

// //     if (taskText !== '') {
// //         let task = {
// //         id: new Date().getTime(),
// //         text: taskText,
// //         status: 'active' 
// //         };

// //         addTaskToList(task);
// //         saveTasks();
// //     }
// //     newTaskInput.addEventListener('keydown', function (event) {

// //         if (taskText !== '') {
// //             const taskItem = document.createElement('li');
// //             const timeString = getCurrentTime(); // Получаем текущее время
// //             taskItem.innerHTML = `${taskText} <span class="task-time">время ${timeString}</span>`;
// //             taskList.appendChild(taskItem);
    
// //             newTaskInput.value = ''; // Очищаем поле ввода после добавления задачи
// //         }
                
// //     if (event.key === 'Enter') {
// //         addTask();
// //     }
// //     });

// //     newTaskInput.value = '';
// // }

// function addTaskToList(task) {
//     let taskList;
//     if (task.status === 'active') {
//         taskList = document.getElementById('active-tasks');
//     } else if (task.status === 'completed') {
//         taskList = document.getElementById('completed-tasks');
//     } else if (task.status === 'deleted') {
//         taskList = document.getElementById('deleted-tasks');
//     }

//     let taskItem = document.createElement('li');
//     taskItem.textContent = task.text;

//     taskList.appendChild(taskItem);

//     taskItem.addEventListener('click', function () {
//         completeTask(task);
//     });

//     taskItem.addEventListener('contextmenu', function (event) {
//         event.preventDefault();
//         deleteTask(task);
//     });
// }

// //завершённая
// function completeTask(task) {
//     task.status = 'completed';
//     moveTaskToList(task, 'active', 'completed');
//     // saveTasks();
// }

// //удаление
// function deleteTask(task) {
//     if (confirm('Are you sure you want to delete this task?')) {
//         moveTaskToList(task, 'active', 'deleted');
//         moveTaskToList(task, 'completed', 'deleted');
//         // saveTasks();
//     }
// }

// //перемещение в другой список
// function moveTaskToList(task, fromListId, toListId) {
//     let fromList = document.getElementById(fromListId + '-tasks');
//     let toList = document.getElementById(toListId + '-tasks');

//     let taskItem = findTaskItem(task, fromList);
//     if (taskItem) {
//         fromList.removeChild(taskItem);
//         task.status = toListId.replace('-tasks', '');
//         addTaskToList(task); 
//         saveTasks();
//     }
// }


// // function findTaskItem(task, list) {
// //     let taskItems = list.getElementsByTagName('li');
// //     for (let i = 0; i < taskItems.length; i++) {
// //         if (taskItems[i].textContent === task.text) {
// //         return taskItems[i];
// //         }
// //     }
// //     return null;
// // }
// function findTaskItem(task, list) {
//     let taskItems = list.getElementsByTagName('li');
//     for (let i = 0; i < taskItems.length; i++) {
//         let taskDiv = taskItems[i].querySelector('div'); // Получаем div внутри li
//         if (taskDiv.textContent.trim() === task.text) { // Сравниваем текст div с текстом задачи
//             return taskItems[i];
//         }
//     }
//     return null;
// }

// //фильтр
// function updateView() {
//     let selectedFilter = document.getElementById('taskFilter').value;
//     toggleView(selectedFilter);
//     saveTasks();
// }

// //сахронение 
// function saveTasks() {
//     let tasks = {
//         active: getTasksFromList('active-tasks'),
//         completed: getTasksFromList('completed-tasks'),
//         deleted: getTasksFromList('deleted-tasks')
//     };

//     localStorage.setItem('tasks', JSON.stringify(tasks));
// }

// function loadTasks() {
//     let tasksString = localStorage.getItem('tasks');
//     if (tasksString) {
//         let tasks = JSON.parse(tasksString);
//         tasks.active.forEach(task => addTaskToList(task));
//         tasks.completed.forEach(task => addTaskToList(task));
//         tasks.deleted.forEach(task => addTaskToList(task));
//     }
// }

// function getTasksFromList(listId) {
//     let taskItems = document.getElementById(listId).getElementsByTagName('li');
//     let tasks = [];
//     for (let i = 0; i < taskItems.length; i++) {
//         let task = {
//         text: taskItems[i].textContent,
//         status: listId.replace('-tasks', '') 
//         };
//         tasks.push(task);
//     }
//     return tasks;
// }

function addTask() {
    var newTaskInput = document.getElementById("newTaskInput");
    var activeTasksList = document.getElementById("active-tasks");
    
    var listItem = document.createElement("li");
    var date = new Date().toISOString().slice(0, 10);
    var dateSup = document.createElement("sup");
    dateSup.textContent = date;
    
    listItem.textContent = newTaskInput.value;
    listItem.insertBefore(dateSup, listItem.firstChild);
    
    var completeButton = document.createElement("button");
    completeButton.textContent = "Выполнено";
    completeButton.addEventListener("click", function() {
      completeTask(listItem);
    });
    
    listItem.appendChild(completeButton);
    
    activeTasksList.appendChild(listItem);
    newTaskInput.value = "";
  }
  
  function completeTask(task) {
    var completedTasksList = document.getElementById("completed-tasks");
    task.querySelector("sup").remove(); // Удаляем дату
    task.querySelector("button").remove(); // Удаляем кнопку "Выполнено"
    
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Корзина";
    deleteButton.addEventListener("click", function() {
      deleteTask(task);
    });
    
    task.appendChild(deleteButton); // Добавляем кнопку "Корзина" в задачу
    
    document.getElementById('active-tasks').removeChild(task); // Удаляем задачу из списка активных задач
    completedTasksList.appendChild(task); // Добавляем задачу в список выполненных задач
    //document.getElementById('taskFilter').value = 'completed'; // Автоматически переключаем фильтр на "Completed"
    updateView(); // Обновляем вид страницы
  }
  
  function deleteTask(task) {
  var deletedTasksList = document.getElementById("deleted-tasks");
  task.querySelector("button").remove(); // Удаляем кнопку "Корзина"
  
  document.getElementById('completed-tasks').removeChild(task); // Удаляем задачу из списка выполненных задач
  deletedTasksList.appendChild(task); // Добавляем задачу в список удаленных задач
  updateView(); // Обновляем вид страницы
  }


  function updateView() {
  var selectedFilter = document.getElementById('taskFilter').value;
  var activeTasks = document.getElementById('active-tasks');
  var completedTasks = document.getElementById('completed-tasks');
  var deletedTasks = document.getElementById('deleted-tasks');
  
  activeTasks.style.display = selectedFilter === 'active' ? 'block' : 'none';
  completedTasks.style.display = selectedFilter === 'completed' ? 'block' : 'none';
  deletedTasks.style.display = selectedFilter === 'deleted' ? 'block' : 'none';
}
