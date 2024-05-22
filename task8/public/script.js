document.addEventListener('DOMContentLoaded', function() {
    displayTasks();
});

document.getElementById('taskForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const taskInput = document.getElementById('taskInput').value;
    
    fetch('/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ task: taskInput })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        displayTasks();
        document.getElementById('taskInput').value = '';  
    })
    .catch(error => console.error('Error:', error));
});

function displayTasks() {
    fetch('/tasks')
    .then(response => response.json())
    .then(tasks => {
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = '';  
        
        tasks.forEach(task => {
            const taskItem = document.createElement('div');
            taskItem.className = 'task-item';
            taskItem.textContent = task;
            taskList.appendChild(taskItem);
        });
    })
    .catch(error => console.error('Error:', error));
}
