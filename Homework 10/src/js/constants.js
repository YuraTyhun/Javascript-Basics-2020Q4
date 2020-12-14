const addBtn = document.querySelector('.app__main-add--btn');
const newTaskText = document.querySelector('.new-task');
const openList = document.querySelector('.open-list');
const doneList = document.querySelector('.done-list');
const clearOpenList = document.querySelector('.app__main-tasks--clear-open-btn');
const clearDoneList = document.querySelector('.app__main-tasks--clear-done-btn');
const openSortDropdown = document.querySelector('#open-list-sort');
const doneSortDropdown = document.querySelector('#done-list-sort');
const search = document.querySelector('.search');

export {
    addBtn, 
    newTaskText, 
    openList, 
    clearOpenList, 
    openSortDropdown, 
    doneList, 
    doneSortDropdown,
    clearDoneList,
    search
};