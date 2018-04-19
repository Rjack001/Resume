//Libary construct
var Library = function(instanceKey){
  this.libraryKey = instanceKey;   // to call when using localStorage functions
  this.myBookArray = [];
};

//Book object constructor
var Book = function(arg){
  this.title = arg.title;
  this.author = arg.author;
  this.numberOfPages = arg.numberOfPages;
  this.publishDate = new Date(arg.publishDate);
};

//addBook to myBookArray function
Library.prototype.addBook = function(book){
  for (var i = 0; i < this.myBookArray.length; i++) {
    if (this.myBookArray[i].title.toUpperCase() === book.title.toUpperCase()) {
      return false;
    }
  }
  this.myBookArray.push(book);
  return true;
}

//removeBookByTitle function
Library.prototype.removeBookByTitle = function(title){
  for (var i = 0; i < this.myBookArray.length; i++) {
    if (this.myBookArray[i].title.toUpperCase() === title.toUpperCase()) {
      this.myBookArray.splice(i,1);
      return true;
    }
  }

  return false;
}

//removeBookByAuthor function
Library.prototype.removeBookByAuthor = function(author){
  var result = false;
  for (var i = this.myBookArray.length -1; i >= 0; i--) {
    if (this.myBookArray[i].author.toUpperCase() === author.toUpperCase()) {
      this.myBookArray.splice(i,1);
      result = true;
    }
  }
  return result;
}


//getRandomBook function
Library.prototype.getRandomBook = function(){
    if (this.myBookArray.length == 0) {
      return null;
    }
  return this.myBookArray[Math.floor(Math.random()*this.myBookArray.length)];
}

//getBookByTitle(title)

Library.prototype.getBookByTitle = function(title) {
  var matchingTitles = [];
  for(var i = 0; i < this.myBookArray.length; i++) {
    if(RegExp(title.toUpperCase(), "i").test(this.myBookArray[i].title.toUpperCase())) {
      matchingTitles.push(this.myBookArray[i].title);
    }
  }
    return matchingTitles;
}

//getBookByAuthor(authorName)

Library.prototype.getBookByAuthor = function(authorName) {
  var matchingTitles = [];
  for (var i = 0; i < this.myBookArray.length; i++) {
    if(RegExp(authorName.toUpperCase(), "i").test(this.myBookArray[i].author.toUpperCase())){
      matchingTitles.push(this.myBookArray[i].author)
    }
  }
  return matchingTitles;
}


//addBooks(books)
Library.prototype.addBooks = function(books){
  var count = 0;
  for (var i = 0; i < books.length; i++) {
    if (this.addBook(books[i])) {
      count += 1;
    }
  }
  return count;
}


//getAuthor()
Library.prototype.getAuthors = function() {
  var authorsArray = [];
  for (var i = 0; i < this.myBookArray.length; i++) {
    if(authorsArray.indexOf(this.myBookArray[i].author) === -1){
      authorsArray.push(this.myBookArray[i].author);
    }
  }
  return authorsArray;
}


//getRandomAuthorName function
Library.prototype.getRandomAuthorName = function(){
    if (this.myBookArray.length == 0) {
      return null;
    }
  return this.myBookArray[Math.floor(Math.random()*this.myBookArray.length)].author;

}

//betterSearch
Library.prototype.betterSearch = function (string) {
  var matchingItems = [];
    matchingItems.push(this.getBookByTitle(string));
    matchingItems.push(this.getBookByAuthor(string));
    return matchingItems;
}


//localstorage
Library.prototype.setObject = function(instanceKey) {
    localStorage.setItem(instanceKey, JSON.stringify(this.myBookArray));
    return instanceKey;
}

Library.prototype.getObject = function(instanceKey) {
    return this.myBookArray = JSON.parse(localStorage.getItem(instanceKey));
}


//Lib Instance
var gLib1 = new Library("gLib1");

//Book Instances
var gIt = new Book({title: "IT", author: "Stephen King", numberOfPages: 800, publishDate: "December 17, 1995"});
var gCatcherInTheRye = new Book({title: "Catcher In The Rye", author: "JD Salinger", numberOfPages: 200, publishDate: "December 25, 1987"});
var gGoodStuff = new Book({title: "Something Good", author: "Someone", numPages: 200, publishDate: "Jan 1, 2001"});
var gBetterStuff = new Book({title: "Something Better", author: "Someone", numPages: 201, publishDate: "Jan 2, 2001"});
var gHuckleberryFinn = new Book ({title: "The Adventures of Huckleberry Finn", author: "Mark Twain", numPages: "500", publishDate: "December, 1884"})
var g1984 = new Book ({title: "Ninteen Eighty-Four", author: "George Orwell", numPages: "500", publishDate: "1949"})
var gGulliversTravels = new Book ({title: "Gullivers Travels", author: "Johnathan Swift", numPages: "500", publishDate: "October 28, 1726"})
var gRobinsonCrusoe = new Book ({title: "Robinson Crusoe", author: "Daniel Defoe", numPages: "500", publishDate: "April 25, 1719"})
var gJourneyToTheCenterOfTheEarth = new Book ({title: "Journey to the Center of the Earth", author: "Jules Verne", numPages: "500", publishDate: "November 25, 1864"})
var gMereChristianity = new Book ({title: "Mere Christianity", author: "C.S. Lewis", numPages: "500", publishDate: "1952"})
var gTomSawyer = new Book ({title: "The Adventures of Tom Sawyer", author: "Mark Twain", numPages: "500", publishDate: "1876"})
var gCallOfTheWild = new Book ({title: "The Call of the Wild", author: "Jack London", numPages: "500", publishDate: "1903"})

//array of addBooks
var moreBooks = ([gIt, gGoodStuff, gBetterStuff, gCatcherInTheRye, g1984, gGulliversTravels, gHuckleberryFinn, gRobinsonCrusoe, gJourneyToTheCenterOfTheEarth, gMereChristianity, gTomSawyer, gCallOfTheWild]);
