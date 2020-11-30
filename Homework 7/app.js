//task 1
let pW = document.querySelector('.width');
let pH = document.querySelector('.height');
let isThrottled = false;

windowSize();

window.addEventListener('resize', () => {
    if(!isThrottled) {
        windowSize();
        isThrottled = true;
        
        setTimeout(() => {
            isThrottled = false;
        }, 500);
    }
});

function windowSize() {
    pW.innerText = `Width: ${window.innerWidth}`;
    pH.innerText = `Height: ${window.innerHeight}`;
}    

//task 2
let p = document.querySelector('.task2__result-paragraph');
let input = document.querySelector('.task2__search');
let textarea = document.querySelector('.task2__text-block');
textarea.value = 'some text for task number two';
p.innerHTML = textarea.value;

input.addEventListener('input', event => {
    p.innerHTML = textarea.value;
    let str = event.target.value;
    let reg = new RegExp(str, 'g');
    p.innerHTML = p.innerHTML.replace(reg, `<b>${str}</b>`);
    
});

textarea.addEventListener('input', event => {
    p.innerHTML = event.target.value;
});

//task 3
let images = [
    'https://i1.wp.com/itc.ua/wp-content/uploads/2020/08/flash.jpg',
    'https://cdn.theatlantic.com/thumbor/4Nh7zbLcd03yLmKgGI0G0Ulp87o=/720x405/media/img/mt/2015/05/man/original.jpg',
    'https://www.esquireme.com/public/images/2019/07/17/thor.jpg'
];

let img = document.querySelector('.task3__image');
let imgUrl = document.querySelector('.task3__input-block [type=text]');
let time = document.querySelector('.task3__input-block [type=number]');
let leftArrow = document.querySelector('.task3__arrow-left');
let rightArrow = document.querySelector('.task3__arrow-right');

img.src = images[0];

let delay = 2000;

let counter = 0;

let timer = null;

let repeater = ms => {
    timer = setInterval(() => {
        if(counter === images.length) {
            counter = 0;
        } else {
            img.src = images[counter];
            ++counter === images.length ? counter = 0 : counter;
        }
    }, ms);
}

repeater(delay);

time.addEventListener('input', event => {
    clearInterval(timer);
    delay = event.target.value * 1000;
    repeater(delay);
});

onAddImage = () => {
    if(imgUrl.value) {
        images.push(imgUrl.value);
    }
    imgUrl.value = '';
}

leftArrow.addEventListener('click', onLeftArrowClick);

rightArrow.addEventListener('click', onRightArrowClick);

function onLeftArrowClick() {
    clearInterval(timer);
    counter = images.indexOf(img.src);
    console.log(counter);
    if(counter === 0) {
        counter = images.length - 1;
    } else {
        counter--;
    }
    img.src = images[counter];
}

function onRightArrowClick() {
    clearInterval(timer);
    counter = images.indexOf(img.src);
    if(counter === images.length - 1) {
        counter = 0;
    } else {
        counter++;
    }
    img.src = images[counter];
}

img.addEventListener('dblclick', event => {
    counter = images.indexOf(event.target.src);
    clearInterval(timer);
    if(images.length === 0) {
        alert('Sorry, images list is empty!!!');
    } else {
        let answer = confirm('Do you really want to delete an image?');
        if(answer) {
            images.splice(counter, 1);
            images.length === 0 ? img.src='' : repeater(delay); 
            
            if(images.length < 2) {
                leftArrow.removeEventListener('click', onLeftArrowClick);
                rightArrow.removeEventListener('click', onRightArrowClick);
                leftArrow.style = `color: lightgray; cursor: default`;
                rightArrow.style = `color: lightgray; cursor: default`;
            }
        }
    }
});

/*task 4: */

let btn = document.querySelector('.task4__button-add');
let table = document.querySelector('.task4__table');
let rowNumber = 1;
let cellNumber = 1;

btn.addEventListener('click', () => {
    let row = document.createElement('div');
    let col1 = document.createElement('div');
    let col2 = document.createElement('div');
    let col3 = document.createElement('div');

    
    col1.innerHTML = `Cell ${cellNumber}`;
    col2.innerHTML = `Cell ${++cellNumber}`;

    if(rowNumber % 2 !== 0) {
        row.style = 'background-color: #ffffff';
    }

    col3.addEventListener('click', (event) => {
        table.removeChild(event.target.parentNode);
        let arr = Array.from(document.querySelectorAll('div.task4__row'));
        arr.map((row, index) => {
            if(index % 2 === 0) {
                row.style = `background-color: lightgray`;
            } else {
                row.style = `background-color: #ffffff`;
            }
        });
        rowNumber--;
        cellNumber -= 2;
    });

    col1.addEventListener('dblclick', () => {
        addInput(col1);
    });
    col2.addEventListener('dblclick', () => {
        addInput(col2);
    });
    
    col3.innerHTML = '&#128465;';
    col3.className = 'task4__bin';
    
    col1.classList = 'task4__column-left task4__column';
    col2.classList = 'task4__column';
    row.className = 'task4__row';

    row.append(col1, col2, col3);
    table.appendChild(row);

    rowNumber++;
    cellNumber += 2;
});

function addInput(column) {
    let colText = column.innerText;
    column.innerHTML = `<input class="input" value="${colText}" placeholder="Enter text..."></input>`;
    let input = document.querySelector('.input');

    input.focus();
    input.addEventListener('keydown', (event) => {
        if(event.keyCode === 13) {
            let text = input.value;
            column.removeChild(input);
            column.innerHTML = text;
        }
    });
}



