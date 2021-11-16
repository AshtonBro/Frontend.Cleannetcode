'use strict';

import ApplicationTodo from "./todo-list/todoList.js";

const app = new ApplicationTodo({
    todoList: '.todo__list',
    issueInput: '.issue__input',
    form: '#form'
});

app.eventListeners();
app.init();