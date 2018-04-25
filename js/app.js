//Libary construct
var Library;
(function(){
  var instance;
  Library = function(instanceKey){
    if (!instance) {
      this.libraryKey = instanceKey; // to call when using localStorage functions
      this.myBookArray = [];
      instance = this;
    }
    return instance;
  };
})();
/////////////////populates table with array////////////////////////////////
$(document).ready( function () {
  var gLib1 = new Library("gLib1");
  gLib1.addBooks(moreBooks);

  
  $('#table_id').dataTable( {
    data: gLib1.myBookArray,
    columns: [
        { data: 'cover'},
        { data: 'title' },
        { data: 'author' },
        { data: 'numberOfPages' },
        { data: 'fullYear' },
        { data: function (data, type, row){
          
          return '<button type="button" onclick="gLib1.removeBookByTitle(\''+ data.title +'\')" class="btn btn-primary deleteButton">Delete</button>';
        }}
    ]
} );
} );
////////////////////delete function/////////////////////////////////
// var $delete = $(".table .delete")//init

// $delete.on("click", funciton(){
//   if(confirmation("want to delete"))
//   {
//   $(this).parent().remove();
//   }
// });

////////////////////init & bind events function//////////////////////////////
Library.prototype.init = function () {

  this.$alertBtn = $("button.alert");
  this.$changeBtn = $("button.change-text");
  this.$logBtn = $("button.log-hello");
  this.$addToLibrary = $(".add-book-to-library");

  this._bindEvents();
  return false; 
};

Library.prototype._bindEvents = function () {
  this.$alertBtn.on("click", $.proxy(this._handleAlert, this));
  this.$changeBtn.on("click", $.proxy(this._handleText, this));
  this.$logBtn.on("click", $.proxy(this._handleLog, this));
  this.$addToLibrary.on("click",$.proxy(this._handleAddToLibrary,this));
  this.$addBook.on("click", $.proxy(this._handleAddBookBtn, this));
  return false;
};

Library.prototype._handleAlert = function () {
  alert("fired!");

  return false;
};
//////////////////////add a new book function jQ//////////////////////////////////

// Library.prototype._handleAddToLibrary = function() {
//   var 
//       title = $(".book-title").val();
//       author = $(".book-author").val();
//       pages = $(".book-pages").val();
//       date = $(".book-date").val();
//   var book = new Book(title, author, pages, date).val("");
//   this.addBook(book);
//     $("book.title, book.author, book.numberOfPages, book.publishDate")
//     $("tbody").append("<tr><td>" + title + "</td><td>" + author + "</td><td>" + pages + "</td><td>" + date + "</td><td class='delete-button'>X</td></tr>")
// };


///////////////////add a new book function js///////////////////////////////
// Library.prototype.newBook = function () {
//   var myTitle = document.getElementById("titleInput").value;
//   var myAuth = document.getElementById("authorInput").value;
//   var myPages = document.getElementById("numPageInput").value;
//   var myDate = document.getElementById("pubDateInput").value;
//   var newTitle = new Book(myTitle, myAuth, myPages, myDate);
// // when
//   if (this.addBook(newTitle)  )
//       //check is true, execute this code
//       console.log("returned true: " + newTitle);
//       // this.setLib();
//       document.getElementById("titleInput").value = "";
//       document.getElementById("authorInput").value = "";
//       document.getElementById("numPageInput").value = "";
//       document.getElementById("pubDateInput").value = "";
// };


///////////////////add a new book button jQ//////////////////////////////
//one step:
Library.prototype.initializationMethod = function(){
 this.$addBookBtn = $("#addButton");

 this._bindEvents();
 return false;
};

//that's another step
Library.prototype._handleAddBookBtn = function(){
      //  var cover = $(".formCover").val();
       var cover = "";
       var title = $(".formTitle").val();
       var author = $(".formAuthor").val();
       var pages = $(".formPages").val();
       var date = $(".formPubDate").val();
       var button = $(".formRemoveImage").val();
       $(".formCover, .formTitle, .formAuthor, .formPages, .formPubDate, .formRemoveImage").val("");
       $("tbody").append("<tr><td>" + cover + "</td><td>" + title + "</td><td>" + author + "</td><td>" + pages + "</td><td>" + date + + "</td><td class='delete-button'>X</td></tr>");
//     $("tbody").append("<tr><td>" + title + "</td><td>" + author + "</td><td>" + pages + "</td><td>" + date + "</td><td class='delete-button'>X</td></tr>")

        var book = new Book({cover:cover, title:title, author:author, numberOfPages:pages, publishDate:date,removeButtonImg:button});

         gLib1.addBook(book);
         };


/////////////////////////////////////////////////

// $(document).ready( function () {
//   window.Library = new Library("gLib1")
//   window.


//Book object constructor
var Book = function(arg){
  this.cover = arg.cover;
  this.title = arg.title;
  this.author = arg.author;
  this.numberOfPages = arg.numberOfPages;
  this.publishDate = new Date(arg.publishDate);
};

Book.prototype.fullYear = function(){
  return this.publishDate.getFullYear();
}


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
    var localBooks = JSON.parse(localStorage.getItem(instanceKey));
    for(var i = 0; i < localBooks.length; i++) {
      var book = localBooks[i];
      this.addBook(new Book(book.cover, book.title, book.author, book.numberOfPages, book.publishDate));
    }
}


//Lib Instance
var gLib1 = new Library("gLib1");
var gLib2 = new Library("gLib2");

//Book Instances
var gIt = new Book({cover:"", title: "IT", author: "Stephen King", numberOfPages: 800, publishDate: "December 17, 1995"});
var gCatcherInTheRye = new Book({cover:"", title: "Catcher In The Rye", author: "JD Salinger", numberOfPages: 200, publishDate: "December 25, 1987"});
var gGoodStuff = new Book({cover:"", title: "Something Good", author: "Someone", numberOfPages: 200, publishDate: "Jan 1, 2001"});
var gBetterStuff = new Book({cover:"", title: "Something Better", author: "Someone", numberOfPages: 201, publishDate: "Jan 2, 2001"});
var gHuckleberryFinn = new Book ({cover:"", title: "The Adventures of Huckleberry Finn", author: "Mark Twain", numberOfPages: "500", publishDate: "December, 1884"})
var g1984 = new Book ({cover:"", title: "Ninteen Eighty-Four", author: "George Orwell", numberOfPages: "500", publishDate: "1949"})
var gHitchhikersGuide = new Book ({cover:"", title: "Hitchhiker's Guide to the Galaxy", author: "Douglas Adams", numberOfPages: "500", publishDate: "October 12, 1979"})
var gRobinsonCrusoe = new Book ({cover:"", title: "Robinson Crusoe", author: "Daniel Defoe", numberOfPages: "500", publishDate: "April 25, 1719"})
var gJourneyToTheCenterOfTheEarth = new Book ({cover:"", title: "Journey to the Center of the Earth", author: "Jules Verne", numberOfPages: "500", publishDate: "November 25, 1864"})
var gMereChristianity = new Book ({cover:"", title: "Mere Christianity", author: "C.S. Lewis", numberOfPages: "500", publishDate: "1952"})
var gBeowulf = new Book ({cover:"", title: "Beowulf", author: "Unknown", numberOfPages: "500", publishDate: "1000"})
var gBandOfBrothers = new Book ({cover:"", title: "Band of Brothers", author: "Stephen E. Ambrose", numberOfPages: "336", publishDate: "1992"})

//array of addBooks
var moreBooks = ([gIt, gGoodStuff, gBetterStuff, gCatcherInTheRye, g1984, gHitchhikersGuide, gHuckleberryFinn, gRobinsonCrusoe, gJourneyToTheCenterOfTheEarth, gMereChristianity, gBeowulf, gBandOfBrothers]);
