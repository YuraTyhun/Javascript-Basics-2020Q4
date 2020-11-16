/*task 1: Write a class called Point, which represents a point in two-dimensional space. 
A point has x and y properties, given as arguments to its constructor.
It also has a single method plus, which takes another point and returns the sum of the two points, 
that is, a new point whose x is the sum of the x properties of the two original points, and whose y is the sum of their y properties.*/

class Point {
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }
    
    plus(point) {
        return new Point(this.x + point.x, this.y + point.y)
    }
}

new Point(1, 2).plus(new Point(2, 1)) // → Point{x: 3, y: 3}


/*task 2: Write two classes, which are called Speaker and Screamer. Speaker is a simple type 
that exposes a speak method which, when called, logs the given text along with the speaker's name. 
Shouter is a subtype of Speaker which shouts its text and makes it uppercase.
You will need to complete this task in ES5 first and then rewrite in ES6.*/

function Speaker(speakerName) {
    this.speakerName = speakerName;
    this.speak = function(text) {
        console.log(`${this.speakerName} says ${text}`);
    }
}
        
function Screamer(speakerName) {
    Speaker.call(this, speakerName);
    this.speak = function(text) {
        console.log(`${this.speakerName} shouts ${text.toUpperCase()}`);
    }
}

new Speaker("Mr. Calm").speak("easy, man"); // → “Mr. Calm says easy, man” 

new Screamer("Mr. Loud").speak("hell yeah"); // → “Mr. Loud shouts HELL YEAH” 

class Speaker {
    constructor(speakerName) {
        this.speakerName = speakerName;
    }
    speak(text) {
        console.log(`${this.speakerName} says ${text}`);
    }
}
        
class Screamer extends Speaker {
    speak(text) {
        console.log(`${this.speakerName} says ${text.toUpperCase()}`);
    }
}

/*task 3: Create a class BookList. Create another class called Book.*/

class BookList {
    constructor() {
        this.booksReaded = 0;
        this.booksNotReaded = 0;
        this.nextBookToRead = null;
        this.currentBookRead = null;
        this.lastBookRead = null;
        this.books = [];
    }

    addBook(book) {
        this.books.push(book);
        this.booksNotReaded = this.books.length - this.booksReaded;
        this.currentBookRead = this.books[this.booksReaded];
        this.nextBookToRead = this.books[this.booksReaded + 1];
    }

    finishCurrentBook() {
        this.lastBookRead = this.currentBookRead;
        this.booksReaded++;
        this.booksNotReaded--;
        this.nextBookToRead = this.books[this.booksReaded + 1];
        this.currentBookRead = this.books[this.booksReaded];
    }
    
}

class Book {
    constructor(title, genre, author) {
        this.title = title;
        this.genre = genre;
        this.author = author;
        this.isBookRead = false;
        this.readDate = null;
    }

    markAsRead() {
        this.isBookRead = true;
        this.readDate = new Date();
    }
}

let newBook = new Book('Кобзар', 'Лірика', 'Шевченко')
let newBook2 = new Book('Енеїда', 'Сатира', 'Котляревський')

let bookList = new BookList()

bookList.addBook(newBook)
bookList.addBook(newBook2)

newBook.markAsRead()
bookList.finishCurrentBook()

newBook2.markAsRead()
bookList.finishCurrentBook()

bookList
