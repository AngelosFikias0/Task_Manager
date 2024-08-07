'use strict';

const cur = document.getElementById('currentTasks');
const compl = document.getElementById('completedTasks');
const create = document.getElementById('createTask');
const done = document.getElementById('completeTask');
const taskForm = document.getElementById('taskForm');
const countershow = document.getElementById('compcountafter');
const countershow2 = document.getElementById('compcountafter2');
const lab1 = document.getElementById('la1');
const lab2 = document.getElementById('la2');

let countcomp=0;
let countcomp2=0;

taskForm.addEventListener('submit', function(evt) {
    evt.preventDefault();  
    lab1.innerHTML='Create task:';
    lab1.style.color='black';
    lab2.innerHTML='Completed task:';
    lab2.style.color='black';

    if (evt.submitter.name === 'create') {
        let task = create.value.trim();
        if (task) {
            task = ensureUniqueTask(task);
            if (cur.innerHTML === 'please insert task:') {
                cur.innerHTML = '';
            }
            cur.innerHTML += `<div class="task-item">${task}</div>`;
            create.value = ''; 
            countcomp2++;
            countershow2.innerHTML=countcomp2;
        }else{lab1.innerHTML='Task is empty!';lab1.style.color='red'}
    } else if (evt.submitter.name === 'done') {
        let task = done.value.trim();
        if (task) {
            if (searchTask(task, true)) {
                if (compl.innerHTML === 'please complete task:') {
                    compl.innerHTML = '';
                }
                compl.innerHTML += `<div>${task}</div>`;
                done.value = '';  
                countcomp++;
                countershow.innerHTML=countcomp;
                countcomp2--;
                countershow2.innerHTML=countcomp2;
            }else{lab2.innerHTML='Task not found in current tasks!';lab2.style.color='red';}
        }else{lab2.innerHTML='Please create task first!';lab2.style.color='red';}
    }
}, false);

function searchTask(task, remove = false) {
    const tasks = cur.getElementsByClassName('task-item');
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].textContent === task) {
            if (remove) {
                tasks[i].remove();
            }
            return true;
        }
    }
    return false;
}

function ensureUniqueTask(task) {
    let uniqueTask = task;
    let counter = 1;
    while (searchTask(uniqueTask)) {
        uniqueTask = `${task}${counter}`;
        counter++;
    }
    return uniqueTask;
}
