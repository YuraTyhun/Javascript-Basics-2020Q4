/*task 1: Write a function that merges words into sentence */
const curry = () => {
    function calcValue(args) { 
       let res = '';
        if(args.length > 1) {
            for (let i = 0; i<args.length; i++) {
                if(i === args.length - 1) {
                    res += args[i];
                } else {
                    res += args[i] + ' ';
                }
            }
        } else {
            return args;
        }
        return res;
    }
     function nextParam(...params) {
        return function(...args) {
            if(!args.length) {
                return calcValue (params);
            }
            return nextParam(...params, calcValue(args));
        };

    };
    return nextParam();
}

let mergeWords = curry();
mergeWords('GNU')('is')('not')('Unix.')();

/*task 2: */
const checkUsersValid = validUsers => {
    return needToCheck => needToCheck.every(userToCheck => {
        return validUsers.some(valid => valid.id === userToCheck.id)})
}

let testAllValid = checkUsersValid([ 
    { id: 1 }, 
    { id: 2 }, 
    { id: 3 } 
]);

testAllValid([ 
    { id: 2 }, 
    { id: 1 } 
]); //true

testAllValid([ 
    { id: 2 }, 
    { id: 4 }, 
    { id: 1 } 
]); //false

/*task 3: Write a function that returns an object which contains the number of times each string occured in the array. */
const countWords = words => {
    let result = {};
    for(let word of words) {
        if(result[word]) {
            result[word]++;
        } else {
            result[word] = 1;
        }
    }
    return result;
}

const inputWords = ['Apple', 'Banana', 'Apple', 'Durian', 'Durian', 'Durian']; 
countWords(inputWords);//{Apple: 2, Banana: 1, Durian: 3}

/*task 4: Write a function that checks whether a passed string is palindrome or not?*/
const isPalindrome = str => str === [...str].reverse().join('') ? 'The entry is a palindrome' : 'Entry is not a palindrome';
isPalindrome('madam'); // Output: ‘The entry is a palindrome’ 
isPalindrome('fox'); // Output: ‘Entry is not a palindrome’ 


/*Recursion*/
/*task 1: Write a factorial function that takes a positive integer N as a parameter and prints the result of N! (factorial)*/
const factorial = n => n >= 1 ? n * factorial(n-1) : 1;
factorial(5);//120

/*task 2: Write a function to convert an amount to coins*/
let amountToCoins = (amount, coins, result = []) => { 
   if(amount === 0) return result;
   for(let elem of coins) {
      let count = amount - elem;
      if(count >= elem) {
       result.push(elem);
       return amountToCoins(count, coins, result)
      } else if(count < 0) {
        coins.splice(0, 1);
        return amountToCoins(amount, coins, result);
      } else {
       result.push(elem);
       coins.splice(0, 1);
       return amountToCoins(count, coins, result); 
      }
   } 
}

amountToCoins(46, [25, 10, 5, 2, 1]); // Output: [25, 10, 10, 1] 

/*task 3: Write a function using recursion that takes a function as its first argument, 
a number num as its second argument, then executes the passed in function num times.*/
const repeat = (fn, n) => {
    if(n >= 1) {
        fn();
        return repeat(fn, n-1)
    }
    return;
}

repeat(() => console.log('Wassup'), 5) //'Wassup' 5 times

/*task 4: Implement Array reduce function. For simplicity, your implementation of reduce doesn't need to replicate the 
behaviour of a reduce missing an initial value. You may assume the initial value will always be supplied.*/
const reduce = (arr, callback, acc=0) => {
    arr.map((el, index) => {
        acc = callback(acc, el, index, arr)
    });
    return acc;
}

reduce([1,2,3], (prev, curr, index, arr) =>  prev + curr, 0); //6
reduce([2,3,4], (prev, curr, index, arr) =>  prev * curr, 1);//24