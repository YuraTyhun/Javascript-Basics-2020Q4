/*task 1: Write a function arrayToList that creates a linked list from an array, and listToArray that creates array from list */
const arrayToList = arr => {
    let result = null;
    for(let i = arr.length-1; i>=0; i--) {
        result = {value: arr[i], rest: result}
    }
    return result;
}

arrayToList([10, 20]); // {value: 10, rest: {value: 20, rest: null}}

let listToArray = list => {
    let result = [];
    for(let i = list; i; i = i.rest) {
        result.push(i.value);
    }
    return result;
}

listToArray(arrayToList([10, 20, 30])); // [10, 20, 30]

/*task 2: Write a function to convert an object into a list of '[key, value]' pairs.*/
const getKeyValuePairs = list => Object.entries(list);

getKeyValuePairs({red: "#FF0000", green: "#00FF00", white: "#FFFFFF"}); // [["red","#FF0000"],["green","#00FF00"],["white","#FFFFFF"]] 

/*task 3: Write a function to get a copy of the object where the keys have become the values and the values the keys.*/
const invertKeyValue = obj => {
    let result = [];
    for(let key in obj) {
        result.push([obj[key], key])
    }
    return Object.fromEntries(result)
}

invertKeyValue({red: "#FF0000", green: "#00FF00", white: "#FFFFFF"});  // {"#FF0000":"red","#00FF00":"green","#FFFFFF":"white"}

/*task 4: Write a function to get all methods from an object*/
const getAllMethods = obj => Object.getOwnPropertyNames(obj).filter(el => typeof obj[el] === 'function');

getAllMethods(Math); // → ["abs", "acos", "acosh", "asin", ...]

/*task 5: Write a JS class with two methods run and stop. First methods starts displaying current time in console 
in format ‘hh:mm:ss’ every second starting from now. Second method stops it. 
In order to complete the task, you should create a class with methods in ES5 style.*/
class Clock {
    timerId;
    run = function() {
        this.timerId = setInterval(() => { 
            let date = new Date();
            let hours = date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`;
            let minutes = date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`;
            let seconds = date.getSeconds() > 9 ? date.getSeconds() : `0${date.getSeconds()}`;
            console.log(`${hours}:${minutes}:${seconds}`);
        }, 1000);
    };
    stop = function() {
        clearInterval(this.timerId);
    };
}

const clock = new Clock(); 
clock.run(); 
// → 
// 19:55:11 
// 19:55:12 
// 19:55:13 
// … 

clock.stop(); 
// → timer stops

/*task 6: Write a class called Group, which has add, delete and has methods. Its constructor creates an empty group, add adds a value to the group 
(but only if it isn’t already a member), delete removes its argument from the group (if it was a member), and has returns a Boolean value indicating whether its argument is a member of the group.
Use the === operator, or something equivalent such as indexOf, to determine whether two values are the same.
Give the class a static from method that takes an iterable object as argument and creates a group that contains all the values produced by iterating over it.*/

class Group {
    group;
    static from(arr) {
        this.group = new Set(arr)
        return this.group;
    }
    
    add(value) {
        return this.group.add(value);
    }

    delete(value) {
        return this.group.delete(value);
    }

    has(value) {
        return this.group.has(value);
    }
}

let group = Group.from([10, 20]); 
console.log(group.has(10)); // → true 
console.log(group.has(30)); // → false 
group.add(10); 
group.delete(10); 
console.log(group.has(10)); // → false 

