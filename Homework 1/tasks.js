/*task 1: Write a function to change the capitalization of all letters in a given string.*/
const changeCase = str => {
    let result = '';
    for(let el of str) {
        if(el === el.toUpperCase()) result += el.toLowerCase()
        else result += el.toUpperCase();
    }
    return result;
}
console.log('Task1: Write a function to change the capitalization of all letters in a given string.');
console.log(changeCase("21century")); // Output: 21CENTURY 
console.log(changeCase("Hybris")); // Output: hYBRIS 

/*task 2: Write a function to filter out non-unique values in an array.*/
const filterNonUnique = arr => {
    let result = [];
     for(let i = 0;i<arr.length;i++) {
        if(arr.filter(el => arr[i] === el).length === 1) {
            result.push(arr[i]);
        }
    }
return result; 
}
console.log('Task 2: Write a function to filter out non-unique values in an array.')
console.log(filterNonUnique([1, 2, 2, 3, 4, 4, 5])); // Output: [1,3,5] 
console.log(filterNonUnique([1, 2, 3, 4])); // Output: [1,2,3,4]


/*task 3: Write a function to convert the letters of a given string in alphabetical order.*/
const alphabetSort = str => {
    return str.split('').sort().join('');
}
console.log('Task 3: Write a function to convert the letters of a given string in alphabetical order.');
console.log(alphabetSort("Python")); // Output: ‘Phnoty’
console.log(alphabetSort("Something")); // Output: ‘Seghimnot’

/*task 4: Write function which gets array of integers and returns second minimum value*/
const getSecondMiminum = arr => arr.sort((a,b) => a-b)[1];
console.log('Task 4: Write function which gets array of integers and returns second minimum value.');
console.log(getSecondMiminum([5,0,7,3,8])); // Output: 3
console.log(getSecondMiminum([4,2,1,9,6])); // Output: 2

/*task 5: Write function which gets array of integers and returns another array of integers where every even number is doubled*/
const doubleEveryEven = arr => arr.map(el => el % 2 === 0 ? el * 2 : el);
console.log('Task 5: Write function which gets array of integers and returns another array of integers where every even number is doubled');
console.log(doubleEveryEven([2,0,7,3,8,4])); // Output: [4,0,7,3,16,8]
console.log(doubleEveryEven([3,6,9,12,5,2])); // Output: [3,12,9,24,5,4]

/*task 6: Write a JavaScript program to create a new array out of the two supplied by creating each possible pair from the arrays*/
const getArrayElementsPairs = (arr1, arr2) => {
    let result = [];
    for(el1 of arr1) {
        for(el2 of arr2) {
            result.push([el1, el2])
        }
    }
    return result;
}
console.log('Task 6: Write a JavaScript program to create a new array out of the two supplied by creating each possible pair from the arrays');
console.log(getArrayElementsPairs([1, 2], ['a', 'b'])); // Output: [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]
console.log(getArrayElementsPairs(['c', 4], [2, 'e'])); // Output: [['c', 2], ['c', 'e'], [4, 2], [4, 'e']]

/*task 7: Write a function deepEqual that takes two values and returns true only if they are the same value or are objects with the same properties, 
where the values of the properties are equal when compared with a recursive call to deepEqual*/
const deepEqual = (obj1, obj2) => {
    if (obj1 === obj2) return true;

    else if ((typeof obj1 === "object" && obj1 !== null) && (typeof obj2 === "object" && obj2 !== null)) {  
        if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;
        for (let key in obj1) {
            if (obj2.hasOwnProperty(key) && !deepEqual(obj1[key], obj2[key])) return false;
        }
        return true;
    } else return false;
}
console.log('Task 7: Write a function deepEqual that takes two values and returns true only if they are the same value or are objects with the same properties, where the values of the properties are equal when compared with a recursive call to deepEqual');
let obj = {here: {is: "an"}, object: 2}; 
console.log(deepEqual(obj, obj)); // Output: true 
console.log(deepEqual(obj, {here: 1, object: 2})); // Output: false 
console.log(deepEqual(obj, {here: {is: "an"}, object: 2})); // Output: true

/*task 8: Write function that takes parameter of different types and returns date in ‘dd.mm.yy’ format*/
const formatDate = d => {
    let result = '';
    if((typeof d === 'string' && isValidDate(d)) || typeof d === 'number' || d instanceof Date) {
        result = createResultDate(d);
    } else if(Array.isArray(d)) {
        let dateToStr = `${d[0]}, ${d[1]===0 ? `01` : d[1]}, ${d[2]}`;
        if(isValidDate(dateToStr)) result = createResultDate(dateToStr);
        else result = 'Can`t get date from input';
    } else {
        result = 'Can`t get date from input';
    }

    function createResultDate(value) {
        let date = new Date(value),
        day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate(),
        month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1,
        year = date.getFullYear().toString().substr(2, 2);
        return `${day}.${month}.${year}`
    }

    function isValidDate(value) {
        return !isNaN(new Date(value).getTime());
    }

    return result;
}
console.log('Task 8: Write function that takes parameter of different types and returns date in ‘dd.mm.yy’ format');
console.log( formatDate('2011-10-02') ); // 02.10.11 
console.log( formatDate(1234567890000) ); // 14.02.09 
console.log( formatDate([2014, 0, 1]) ); // 01.01.14 
console.log( formatDate(new Date(2014, 0, 1)) ); // 01.01.14