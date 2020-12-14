export function checkedToDelete(arr, openListData, id) {
    let itemToDelete, index;
    openListData.map((el,i) => {
        if(el.id === Number(id)) {
            itemToDelete = el;
            index = i;
        }
    });
    arr.splice(arr.indexOf(itemToDelete), 1);
    openListData.splice(index, 1);
}

export function buildListItem(list, item, time, finishTime = '', listType = '') {
    list.insertAdjacentHTML('beforeend', `
        <div class="app__main-tasks--item" data-marker="${item.id}">
            <input type="checkbox" ${listType === 'done' ? 'checked' : ''} class="app__main-tasks--item-checkbox open-checkbox">
            <div class="app__main-tasks--item-text" data-id="text">${item.text}</div>
            <div class="app__main-tasks--item-time">${time}<br><span class="due-time">${finishTime}</span></div>
            <div class="app__main-tasks--item-trash" data-id="trash">&#128465;</div>
            </div>
        `);
}