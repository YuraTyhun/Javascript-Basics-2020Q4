import '../scss/index.scss';
import { 
    addBtn, 
    newTaskText, 
    openList, 
    clearOpenList, 
    openSortDropdown, 
    doneList, 
    doneSortDropdown,
    clearDoneList,
    search,
} from './constants';

import {checkedToDelete, buildListItem} from './helper-functions';

let openListData = [];
let doneArr = [];
let openArr = [];
let counter;


document.addEventListener("DOMContentLoaded", () => {
    let storageOpenListData = JSON.parse(localStorage.getItem('openList'));
    let sortingTypeOpen = JSON.parse(localStorage.getItem('sortingTypeOpen'));
    let sortingTypeDone = JSON.parse(localStorage.getItem('sortingTypeDone'));
    let maxCounter;
    
    if(storageOpenListData && storageOpenListData.length > 0) {
        let sortById = [...storageOpenListData].sort((a,b) => b.id - a.id);
        maxCounter = sortById[0].id + 1;
    }

    counter = storageOpenListData && maxCounter ? maxCounter : 0;

    if(!sortingTypeOpen) {
        sortingTypeOpen = 'date-desc';
    }

    if(!sortingTypeDone) {
        sortingTypeDone = 'due-date-desc';
    }

    if(storageOpenListData !== null) {
        openListData = storageOpenListData;
        for(let item of openListData) {
            if(item.isDone) {
                doneArr.push(item);
            } else {
                openArr.push(item);
            }
        }

        listSort(openArr, sortingTypeOpen, 'open')
        listSort(doneArr, sortingTypeDone, 'done')
    }

    openSortDropdown.value = sortingTypeOpen;
    doneSortDropdown.value = sortingTypeDone;
    
});

openList.addEventListener('click', (event) => {
    let id = event.target.parentNode.getAttribute('data-marker');
    if(event.target.type === 'checkbox') {
        let idToDelete, index;
        openListData.map(el => {
            if(el.id === Number(id)) {
                idToDelete = el.id;
                el.isDone = true;
                el.finishTime = new Date().toLocaleString('en');
                doneArr.push(el);
            }
        });

        index = openArr.findIndex(el => el.id === idToDelete);
        openArr.splice(index, 1);

        listSort(openArr, openSortDropdown.value, 'open');
        listSort(doneArr, doneSortDropdown.value, 'done');
    } 

    if(event.target.getAttribute('data-id') === 'trash') {
        checkedToDelete(openArr, openListData, id);
        listSort(openArr, openSortDropdown.value, 'open');
    }

    localStorage.setItem('openList', JSON.stringify(openListData));
});

doneList.addEventListener('click', (event) => {
    let id = event.target.parentNode.getAttribute('data-marker');

    if(event.target.type === 'checkbox') {
        openListData.map(el => {
            if(el.id === Number(id)) {
                el.isDone = false;
                el.finishTime = '';
                openArr.push(el);
                doneArr.splice(doneArr.indexOf(el), 1);
            }
        });

        listSort(doneArr, doneSortDropdown.value, 'done');
        listSort(openArr, openSortDropdown.value, 'open');
    }

    if(event.target.getAttribute('data-id') === 'trash') {
        checkedToDelete(doneArr, openListData, id);
        listSort(doneArr, doneSortDropdown.value, 'done');
    }

    localStorage.setItem('openList', JSON.stringify(openListData));
});

openList.addEventListener('dblclick', (event) => {
    let id = event.target.parentNode.getAttribute('data-marker');

    if(event.target.getAttribute('data-id') === 'text') {
        let text = event.target.innerText;
        event.target.innerHTML = `<input class="input" value="${text}"></input>`;
        let input = document.querySelector('.input');
        input.focus();

        window.addEventListener('keydown', (e) => {
            if(e.key === 'Enter') {
                let text = input.value;
                input.remove();

                openListData.map(el => {
                    if(el.id === Number(id)) {
                        el.text = text;
                    }
                });
                openArr.map(openEl => {
                    if(openEl.id === Number(id)) {
                        openEl.text = text;
                    }
                });
                
                listSort(openArr, openSortDropdown.value, 'open');

                localStorage.setItem('openList', JSON.stringify(openListData));
            }

            if(e.key === 'Escape') {
                event.target.innerText = text;
                input.remove();
            }
        });
    }
});

doneList.addEventListener('dblclick', (event) => {
    let id = event.target.parentNode.getAttribute('data-marker');

    if(event.target.getAttribute('data-id') === 'text') {
        let text = event.target.innerText;
        event.target.innerHTML = `<input class="input" value="${text}"></input>`;
        let input = document.querySelector('.input');
        input.focus();

        window.addEventListener('keydown', (e) => {
            if(e.key === 'Enter') {
                let text = input.value;
                input.remove();

                openListData.map(el => {
                    if(el.id === Number(id)) {
                        el.text = text;
                    }
                });
                doneArr.map(doneEl => {
                    if(doneEl.id === Number(id)) {
                        doneEl.text = text;
                    }
                });
                
                listSort(doneArr, doneSortDropdown.value, 'done');

                localStorage.setItem('openList', JSON.stringify(openListData));
            }

            if(e.key === 'Escape') {
                event.target.innerText = text;
                input.remove();
            }
        });
    }
});

search.addEventListener('input', (event) => {
    let str = event.target.value;
    let filterOpenArray = openArr.filter(el => el.text.includes(str));
    let filterDoneArray = doneArr.filter(el => el.text.includes(str));
    buildList(filterOpenArray, 'open');
    buildList(filterDoneArray, 'done');
})

addBtn.addEventListener('click', () => {
    let time = new Date().toLocaleTimeString('en', {
            hour:'2-digit',
            minute: '2-digit'
        }) 
    if(newTaskText.value.length > 0) {
        openList.insertAdjacentHTML('afterbegin', `
        <div class="app__main-tasks--item" data-marker="${counter}">
            <input type="checkbox" class="app__main-tasks--item-checkbox open-checkbox">
            <div class="app__main-tasks--item-text" data-id="text">${newTaskText.value}</div>
            <div class="app__main-tasks--item-time">${time}<br><span class="due-time"></span></div>
            <div class="app__main-tasks--item-trash" data-id="trash">&#128465;</div>
          </div>
        `);

        openListData.unshift({id: counter, time: new Date().toLocaleString('en'), text: newTaskText.value});
        openArr.push({id: counter, time: new Date().toLocaleString('en'), text: newTaskText.value});

        localStorage.setItem('openList', JSON.stringify(openListData));
        newTaskText.value = '';
        counter++;
    }
});

clearOpenList.addEventListener('click', () => {
    if(openArr.length > 0) {
        for(let elOpen of openArr) {
            for(let el of openListData) {
                if(elOpen.id === el.id) {
                    openListData.splice(openListData.indexOf(elOpen), 1)
                }
            }
        }    
        openArr = [];
        openList.innerHTML = '';
        localStorage.setItem('openList', JSON.stringify(openListData));
    }
});

clearDoneList.addEventListener('click', () => { 
    if(doneArr.length > 0) {
        for(let elDone of doneArr) {
            for(let el of openListData) {
                if(elDone.id === el.id) {
                    openListData.splice(openListData.indexOf(elDone), 1)
                }
            }
        }    
        doneArr = [];
        doneList.innerHTML = '';
        localStorage.setItem('openList', JSON.stringify(openListData));
    }
});

openSortDropdown.addEventListener('change', () => {
    localStorage.setItem('sortingTypeOpen', JSON.stringify(openSortDropdown.value));
    if(openSortDropdown.value === 'date-desc') {
        listSort(openArr, 'date-desc', 'open');
    } else if(openSortDropdown.value === 'date-asc') {
        listSort(openArr, 'date-asc', 'open');
    } else if(openSortDropdown.value === 'text-desc') {
        listSort(openArr, 'text-desc', 'open');
    } else if(openSortDropdown.value === 'text-asc') {
        listSort(openArr, 'text-asc', 'open');
    }
});

doneSortDropdown.addEventListener('change', () => {
    localStorage.setItem('sortingTypeDone', JSON.stringify(doneSortDropdown.value));
    if(doneSortDropdown.value === 'due-date-desc') {
        listSort(doneArr, 'due-date-desc', 'done');
    } else if(doneSortDropdown.value === 'due-date-asc') {
        listSort(doneArr, 'due-date-asc', 'done');
    } else if(doneSortDropdown.value === 'text-desc') {
        listSort(doneArr, 'text-desc', 'done');
    } else if(doneSortDropdown.value === 'text-asc') {
        listSort(doneArr, 'text-asc', 'done');
    }
})

function listSort(arr, sortingType, listType = null) {
    let newArr = [];
    if(listType === 'open') {
        if(sortingType === 'date-desc') {
            newArr = [...arr].sort((a,b) => new Date(b.time).getTime() - new Date(a.time).getTime());
        } else if(sortingType === 'date-asc') {
            newArr = [...arr].sort((a,b) => new Date(a.time).getTime() - new Date(b.time).getTime());
        }
    } else if(listType === 'done') {
        if(sortingType === 'due-date-desc') {
            newArr = [...arr].sort((a,b) => new Date(b.finishTime).getTime() - new Date(a.finishTime).getTime());
        } else if(sortingType === 'due-date-asc') {
            newArr = [...arr].sort((a,b) => new Date(a.finishTime).getTime() - new Date(b.finishTime).getTime());
        }
    }
    
    if(sortingType === 'text-desc') {
        newArr = [...arr].sort((a,b) => b.text.localeCompare(a.text));
    } else if(sortingType === 'text-asc') {
        newArr = [...arr].sort((a,b) => a.text.localeCompare(b.text));
    }

    buildList(newArr, listType);
}

function buildList(arr, list) {
    list === 'open' ? openList.innerHTML = '' : doneList.innerHTML = '';
    for(let item of arr) {
        let time = new Date(item.time).toLocaleTimeString('en', {
            hour:'2-digit',
            minute: '2-digit'
        }); 
        if(list === 'open') {
            buildListItem(openList, item, time);
        } else if(list === 'done') {
            let finishTime = new Date(item.finishTime).toLocaleTimeString('en', {
                hour:'2-digit',
                minute: '2-digit'
            });
            buildListItem(doneList, item, time, finishTime, 'done');
        }
    }
}