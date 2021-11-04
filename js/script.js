'use strict';

const generateId = () => `id${Math.round(Math.random() * 1e8).toString(16)}`;

const todoList = document.querySelector('.todo__list'),
    form = document.querySelector('#form'),
    noteName = document.querySelector('.note__name');

let dbNotes = JSON.parse(localStorage.getItem('todoList')) || [];

const renderNote = (note) => {
    const listItem = document.createElement('li');

    if (note.isDone) {
        listItem.classList.add('todo__item', 'todo__item-done');

        listItem.innerHTML = `<span class="todo-item-text text-done">${note.description}</span>
         <div class="buttons">
            <button class="todo_done visible" data-id="${note.id}">Сделано</button>
            <button class="todo_delete" data-id="${note.id}">x</button>
         </div>
        `;
    } else {
        listItem.classList.add('todo__item');

        listItem.innerHTML = `<span class="todo-item-text">${note.description}</span>
         <div class="buttons">
            <button class="todo_done" data-id="${note.id}">Сделано</button>
            <button class="todo_delete" data-id="${note.id}">x</button>
         </div>
        `;
    }

    todoList.append(listItem);
};

const addNote = (event) => {
    event.preventDefault();
    const noteNameValue = noteName.value;

    if (noteNameValue) {
        const note = {
            id: generateId(),
            description: noteNameValue,
            isDone: false
        };

        dbNotes.push(note);
        init();

    } else {
        if (!noteNameValue) { noteName.style.borderColor = 'red' };

        setTimeout(() => {
            noteName.style.borderColor = ''
        }, 1000);
    }

    noteName.value = '';
};

const deleteNote = (event) => {
    const target = event.target;

    if (target.classList.contains('todo_delete')) {
        dbNotes = dbNotes
            .filter(note => note.id !== target.dataset.id);

        init();
    }
};

const toggleDone = (event) => {
    const target = event.target;

    if (target.classList.contains('todo_done')) {
        dbNotes.forEach(note => {
            if (note.id == target.dataset.id) {
                note.isDone = !note.isDone;

                init();
            }
        });
    }
}

const init = () => {
    todoList.textContent = '';
    dbNotes.forEach(renderNote);
    localStorage.setItem('todoList', JSON.stringify(dbNotes));
};

form.addEventListener('submit', addNote);
todoList.addEventListener('click', deleteNote);
todoList.addEventListener('click', toggleDone);

init();