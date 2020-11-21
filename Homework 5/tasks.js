/*task 1: Write a function that returns a promise, which becomes resolved in some milliseconds*/
const delay = ms => new Promise((resolve, reject) => {
    setTimeout(() => resolve(), ms)
})

delay(1000).then(() => console.log('Hey!')); // → ‘Hey!’ in 1 second 

/*task 2: Write a function to run an given array of promises in series, without using async/await syntax */
const runPromisesInSeries = arrOfPromises => arrOfPromises.forEach(promise => promise())

runPromisesInSeries([ 
  () => delay(1000).then(() => { 
    console.log('message in 1 second') 
  }), 
  () => delay(2000).then(() => { 
    console.log('message in 3 seconds') 
  }) 
]);
 
// → ‘message in 1 second’ 
// → ‘message in 3 seconds’

/*task 3: Building Promise.all*/
const Promise_all = promises => {
  return new Promise((resolve, reject) => {
    let result = [];
    if(promises.length > 0) {
        for(let [index,promise] of Object(promises).entries()) {
            promise.then(res => result[index] = res, reject)
                .then(() => {
                    if(--promises.length === 0) {
                        resolve(result);
                    }
                });
        }
    } else {
        resolve([]);
    }
  }); 
}

Promise_all([]).then(array => { 
  console.log("This should be []:", array); 
}); 

function soon(val) { 
  return new Promise(resolve => { 
    setTimeout(() => resolve(val), Math.random() * 500); 
  }); 
} 

Promise_all([soon(1), soon(2), soon(3)]).then(array => { 
  console.log("This should be [1, 2, 3]:", array); 
}); 

Promise_all([soon(1), Promise.reject("X"), soon(3)]) 
  .then(array => { 
    console.log("We should not get here"); 
  }) 
  .catch(error => { 
    if (error != "X") { 
      console.log("Unexpected failure:", error); 
    } 
  });

/*task 4: Write a generator function that returns fibonacci sequence*/
function* fibonacci(n) {
    let a, b, temp;
    for (let i = 0; i < n; i++) {
        if (i === 0) {
            a = i;
            yield a;
        } else if (i === 1) {
            b = i;
            yield b;
        } else {
            yield a + b;
            temp = a + b;
            a = b;
            b = temp;
        }
    }
}

let [...first10] = fibonacci(10); 
console.log(first10); // → [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]

/*task 5: Write a helper function that takes a generator function and invokes it step by step*/
const helper = generator => {
    const invokeGenerator = generator();
    iterator(invokeGenerator.next());

    function iterator(iterationItem) { 
        return iterationItem.value
            .then(val => iterator(invokeGenerator.next(val)))
            .catch(error => invokeGenerator.throw(error))
    }
}

const asyncTask1 = () => new Promise((resolve, reject) => setTimeout(() => resolve('first resolved'), 1000)); 
const asyncTask2 = () => new Promise((resolve, reject) => setTimeout(() => resolve('second resolved'), 1000)); 
const asyncTask3 = () => new Promise((resolve, reject) => setTimeout(() => reject('third rejected'), 1000)); 
console.log('invoke helper') 

helper(function* main() { 
 try { 
   const a = yield asyncTask1(); 
   console.log(a); 
   const b = yield asyncTask2(); 
   console.log(b); 
   const c = yield asyncTask3(); 
 } catch(e) { 
   console.error('error happened', e); 
 } 
}); 

// → ‘invoke helper’ 
// 1000ms after helper invoked → ‘first resolved’ 
// 2000ms after helper invoked → ‘second resolved’ 
// 3000ms after helper invoked → ‘error happened third rejected’

/*task 6: Use fetch to work with fake json api server (optional)*/
const fetchApi = async () => {
    let fetchComments = await fetch('https://jsonplaceholder.typicode.com/comments')
    let jsonComments = await fetchComments.json();

    let randomPostId = jsonComments[Math.round(Math.random() * jsonComments.length)].postId;
    let fetchPost = await fetch(`https://jsonplaceholder.typicode.com/posts/${randomPostId}`);
    let jsonPost = await fetchPost.json();
    console.log(jsonPost.userId);

    let fetchUser = await fetch(`https://jsonplaceholder.typicode.com/users/${jsonPost.userId}`);
    let jsonUser = await fetchUser.json();
    console.log(jsonUser);

    let deletePost = await fetch(`https://jsonplaceholder.typicode.com/posts/${jsonPost.postId}`, {method: 'DELETE'});
    
    let putUsername = await fetch(
        `https://jsonplaceholder.typicode.com/users/${jsonUser.id}`, {
            method: 'PUT',
            body: JSON.stringify({...jsonUser, username: 'Barry Allen'})
         });
}

/*task 7: Write your own promise implementation*/
class MyPromise {
    state = 'Pending';
    
    constructor(callback) {
        this.chain = [];
        this.handler = () => {};

        try {
            callback(this.resolve.bind(this), this.reject.bind(this));
        } catch (error) {
            this.handler(error);
        }
    }
    
    then(result) {
        this.chain.push(result);
        return this;
    }

    catch(errorHandler) {
        this.handler = errorHandler;
        return this;
    }

    resolve(value) {
        for(let elem of this.chain) {
            value = elem(value);
        }
        this.state = 'Fulfilled';
    }

    reject(error) {
        this.handler(error);
        this.state = 'Rejected';
    }
}

const myPromise1 = new MyPromise((resolve, reject) => { 
    setTimeout(() => reject(new Error('Time is up')), 5000); 
});  

const myPromise2 = new MyPromise((resolve, reject) => { 
    setTimeout(() => resolve('successful!!'),5000); 
}); 

myPromise1 
    .then((res) => console.log(res)) 
    .catch((error) => console.log(error));

myPromise2
    .then((res) => console.log(res)) 
    .catch((error) => console.log(error));
