'use strict'
//used to fix Js errors to do with const and document not defined
/*eslint-env es6*/
/*eslint-env browser*/
//*eslint-disable-line no-unused-vars

const getSavedTodos = () => {
    const todosJSON = localStorage.getItem('todos');
    
    try
    {
        return todosJSON ? JSON.parse(todosJSON) : [];
    } 
    catch (e)
    {
        return [];
    } 
}

// Render applicatin todos
const generateTodoDOM = (todos) => {
    todos.forEach( (todo) => {

        const todoElement = document.createElement('label');
        const containerEl = document.createElement('div')
        const checkbox = document.createElement('input');
        const removeButton = document.createElement('button');
        const todoText = document.createElement('span');

        // Setup container
        containerEl.classList.add('list-item__container')
        todoElement.classList.add('list-item')
        todoElement.appendChild(containerEl)


        //create checkbox
        checkbox.setAttribute('type', 'checkbox');
        checkbox.checked = todo.completed;
        containerEl.appendChild(checkbox);
        checkbox.addEventListener('change', (e) => {
            todo.completed = e.target.checked;
            saveTodos(todos);
            renderTodos(todos, filters);
        })

        // Create text element for the Todo
        todoText.textContent = todo.text;
        containerEl.appendChild(todoText);

        // Create remove button
        removeButton.textContent = 'remove';
        removeButton.classList.add('button', 'button--text')
        todoElement.appendChild(removeButton);
        removeButton.addEventListener('click', () =>{
            todos = removeTodo(todo.id);
            saveTodos(todos);
            renderTodos(todos, filters);
        })
        
        document.querySelector('#todos').appendChild(todoElement);
    })
}

const getSummaryDOM = (todos) => {
    const summary = document.createElement('h2');
    const completedTodos = todos.filter( (todo) => !todo.completed);
    summary.classList.add('list-title')
    if (completedTodos.length > 1){
    summary.textContent = `You have ${completedTodos.length} todos left`;
    } else {
    summary.textContent = `You have ${completedTodos.length} todo left`;
    }
    document.querySelector('#todos').appendChild(summary);
}

const renderTodos = (todos, filters) => {
    
    document.querySelector('#todos').innerHTML = '';

    let filteredTodos = todos.filter( (todo) => todo.text.toLowerCase().includes(filters.searchText.toLowerCase()));

    if (filters.hideCompleted)
    {
         filteredTodos = todos.filter((todo) => todo.completed === !filters.hideCompleted);
    }
    getSummaryDOM(todos);
    generateTodoDOM(filteredTodos);
}

const todos = getSavedTodos();
const filters = {
    searchText: '',
    hideCompleted: false
}

renderTodos(todos, filters);

document.querySelector('#filter-todo').addEventListener('input', (e) => {
    filters.searchText = e.target.value;
    renderTodos(todos, filters);
})

document.querySelector('#todo-form').addEventListener('submit', (e) =>{
    e.preventDefault();
    const todoValue = e.target.elements.addTodo.value.trim();
    if (todoValue.length > 0){
        todos.push({
        id: uuidv4(),
        text: todoValue, 
        completed: false});
        saveTodos(todos);
        renderTodos(todos, filters);
        e.target.elements.addTodo.value='';
    }
})

document.querySelector('#hide-completed').addEventListener('change', (e) =>{
    filters.hideCompleted = e.target.checked;
    renderTodos(todos, filters);
})

// Save todos to localStorage
const saveTodos = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos))
}

const removeTodo = (id) => {
    const index = todos.findIndex((todo) => todo.id === id)

    if (index > -1)
    {
        todos.splice(index, 1);
    }
    return todos;
}

// Allows the app to save todo's in local storage as cookies which are encrypted, these todo's then can be loaded in from local storage to be displayed on the page
!function(r){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=r();else if("function"==typeof define&&define.amd)define([],r);else{var e;e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,e.uuidv4=r()}}(function(){return function r(e,n,t){function o(f,u){if(!n[f]){if(!e[f]){var a="function"==typeof require&&require;if(!u&&a)return a(f,!0);if(i)return i(f,!0);var d=new Error("Cannot find module '"+f+"'");throw d.code="MODULE_NOT_FOUND",d}var p=n[f]={exports:{}};e[f][0].call(p.exports,function(r){var n=e[f][1][r];return o(n?n:r)},p,p.exports,r,e,n,t)}return n[f].exports}for(var i="function"==typeof require&&require,f=0;f<t.length;f++)o(t[f]);return o}({1:[function(r,e,n){function t(r,e){var n=e||0,t=o;return t[r[n++]]+t[r[n++]]+t[r[n++]]+t[r[n++]]+"-"+t[r[n++]]+t[r[n++]]+"-"+t[r[n++]]+t[r[n++]]+"-"+t[r[n++]]+t[r[n++]]+"-"+t[r[n++]]+t[r[n++]]+t[r[n++]]+t[r[n++]]+t[r[n++]]+t[r[n++]]}for(var o=[],i=0;i<256;++i)o[i]=(i+256).toString(16).substr(1);e.exports=t},{}],2:[function(r,e,n){var t="undefined"!=typeof crypto&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&msCrypto.getRandomValues.bind(msCrypto);if(t){var o=new Uint8Array(16);e.exports=function(){return t(o),o}}else{var i=new Array(16);e.exports=function(){for(var r,e=0;e<16;e++)0===(3&e)&&(r=4294967296*Math.random()),i[e]=r>>>((3&e)<<3)&255;return i}}},{}],3:[function(r,e,n){function t(r,e,n){var t=e&&n||0;"string"==typeof r&&(e="binary"===r?new Array(16):null,r=null),r=r||{};var f=r.random||(r.rng||o)();if(f[6]=15&f[6]|64,f[8]=63&f[8]|128,e)for(var u=0;u<16;++u)e[t+u]=f[u];return e||i(f)}var o=r("./lib/rng"),i=r("./lib/bytesToUuid");e.exports=t},{"./lib/bytesToUuid":1,"./lib/rng":2}]},{},[3])(3)});