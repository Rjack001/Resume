//Libary construct
var Library;
(function () {
  var instance;
  Library = function (instanceKey) {
    if (!instance) {
      this.libraryKey = instanceKey; // to call when using localStorage functions
      this.myBookArray = [];
      this.d_table = {};
      instance = this;
    }
    return instance;
  };
})();

////////////////////remove books by author/////////////////////////////////


////////////////////init & bind events function//////////////////////////////
Library.prototype.init = function () {

  // this.$alertBtn = $("button.alert");
  // this.$changeBtn = $("button.change-text");
  // this.$logBtn = $("button.log-hello");
  // this.$addToLibrary = $(".add-book-to-library");
  // this.$addBook.on("click", $.proxy(this._handleAddBookBtn, this));
  this._findElements();
  this._bindEvents();
  this.getObject(this.libraryKey);

  this.d_table = this.$table.dataTable({
    data: this.myBookArray,
    columns: [
      {
        data: function (data, type, row) {
          return '<img src="' + data.cover + '" class="cover">';
        }
      },
      { data: 'title' },
      { data: 'author' },
      { data: 'numberOfPages' },
      { data: 'fullYear' },
      {
        data: function (data, type, row) {
          return '<button type="button" class="btn btn-primary deleteButton">Delete</button>';
        }
      }
    ]

  });

};

Library.prototype._bindEvents = function () {
  var self = this;
  // this.$alertBtn.on("click", $.proxy(this._handleAlert, this));
  // this.$changeBtn.on("click", $.proxy(this._handleText, this));
  // this.$logBtn.on("click", $.proxy(this._handleLog, this));
  // this.$addToLibrary.on("click",$.proxy(this._handleAddToLibrary,this));
  $("#random-book").on("click", $.proxy(this._handleRandomBookBtn, this));
  $("#allBooks").on("click", $.proxy(this._handleAllBooksBtn, this));
  $("#addButton").on("click", $.proxy(this._handleAddBookBtn, this));
  this.$table = $('#table_id');

  this.$table.on('click', 'tbody tr', function (e) {
    var title = $(this).children()[1].innerText;
    self.removeBookByTitle(title);
    self.d_table.fnDeleteRow(this);
  });

};

Library.prototype._handleAlert = function () {
  alert("fired!");

  return false;
};
/////////////////////add multiple books//////////////////////////////////




///////////////////random book (not working)///////////////////////////////
Library.prototype._handleRandomBookBtn = function () {
  var randomBook = this.getRandomBook();
  this.$randomCover.attr("src", randomBook.cover);
  this.$randomTitle.text(randomBook.title);
  this.$randomAuthor.text(randomBook.author);
  this.$randomPageNum.text(randomBook.numberOfPages);

  var c = randomBook.fullYear();
  this.$randomPubDate.text(randomBook.fullYear());
};

Library.prototype._findElements = function () {
  this.$randomCover = $(".bookCover");
  this.$randomTitle = $(".book-title");
  this.$randomAuthor = $(".book-author");
  this.$randomPageNum = $(".book-pageNum")
  this.$randomPubDate = $(".book-pubDate");
}

///////////////////add a new book button jQ (working)//////////////////////////////

Library.prototype._handleAddBookBtn = function () {
  //  var cover = $(".formCover").val();
  console.log("123");
  var cover = $(".formCover").val();
  var title = $(".formTitle").val();
  console.log(title);

  var author = $(".formAuthor").val();
  var pages = $(".formPages").val();
  var date = $(".formPubDate").val();
  var button = $(".formRemoveImage").val();

  var book = new Book({ cover: cover, title: title, author: author, numberOfPages: pages, publishDate: date })


  this.d_table.fnAddData(book)
  this.d_table.fnDraw();
  //$(".formCover, .formTitle, .formAuthor, .formPages, .formPubDate, .formRemoveImage").val("");
  // $("tbody").append("<tr><td>" + cover + "</td><td>" + title + "</td><td>" + author + "</td><td>" + pages + "</td><td>" + date + + "</td><td class='delete-button'>X</td></tr>");
  //$("tbody").append("<tr><td>" + title + "</td><td>" + author + "</td><td>" + pages + "</td><td>" + date + "</td><td class='delete-button'>X</td></tr>")


  // this.addBook(book);

  if (this.addBook(book)) {
    //check is true, execute this code
    console.log("returned true: " + newTitle);
    // this.setLib();
    document.getElementById("coverInput").value = "";
    document.getElementById("titleInput").value = "";
    document.getElementById("authorInput").value = "";
    document.getElementById("numPageInput").value = "";
    document.getElementById("pubDateInput").value = "";
  }
};

/////////////////////Add allBooks button (not working)///////////////////////////////////////
Library.prototype._handleAllBooksBtn = function () {
  //  var cover = $(".formCover").val();
  gLib1.addBooks(moreBooks);
  var cover = $(".formCover").val();
  var title = $(".formTitle").val();
  var author = $(".formAuthor").val();
  var pages = $(".formPages").val();
  var date = $(".formPubDate").val();
  var button = $(".formRemoveImage").val();

  var book = new Book({ cover: cover, title: title, author: author, numberOfPages: pages, publishDate: date })


  this.d_table.fnAddData(book)
  this.d_table.fnDraw();
};

/////////////////////////////////////////////////

// $(document).ready( function () {
//   window.Library = new Library("gLib1")
//   window.


//Book object constructor
var Book = function (arg) {
  this.cover = arg.cover;
  this.title = arg.title;
  this.author = arg.author;
  this.numberOfPages = arg.numberOfPages;
  this.publishDate = new Date(arg.publishDate);
};

Book.prototype.fullYear = function () {
  return this.publishDate.getFullYear();
}


//addBook to myBookArray function
Library.prototype.addBook = function (book) {
  for (var i = 0; i < this.myBookArray.length; i++) {
    if (this.myBookArray[i].title.toUpperCase() === book.title.toUpperCase()) {
      return false;
    }
  }
  this.myBookArray.push(book);
  if (this.$table.api) {
    this.$table.dataTable().fnDraw();
  }
  this.setObject("gLib1");

  return true;
}

//removeBookByTitle function
Library.prototype.removeBookByTitle = function (title) {
  for (var i = 0; i < this.myBookArray.length; i++) {
    if (this.myBookArray[i].title.toUpperCase() === title.toUpperCase()) {
      this.myBookArray.splice(i, 1);

      $('#table_id').dataTable().fnDraw();
      this.setObject("gLib1");

      return true;
    }
  }

  return false;
}

//removeBookByAuthor function
Library.prototype.removeBookByAuthor = function (author) {
  var result = false;
  for (var i = this.myBookArray.length - 1; i >= 0; i--) {
    if (this.myBookArray[i].author.toUpperCase() === author.toUpperCase()) {
      this.myBookArray.splice(i, 1);

      $('#table_id').dataTable().fnDraw();

      result = true;
    }
  }
  return result;
}


//getRandomBook function
Library.prototype.getRandomBook = function () {
  if (this.myBookArray.length == 0) {
    return null;
  }
  return this.myBookArray[Math.floor(Math.random() * this.myBookArray.length)];
}

//getBookByTitle(title)

Library.prototype.getBookByTitle = function (title) {
  var matchingTitles = [];
  for (var i = 0; i < this.myBookArray.length; i++) {
    if (RegExp(title.toUpperCase(), "i").test(this.myBookArray[i].title.toUpperCase())) {
      matchingTitles.push(this.myBookArray[i].title);
    }
  }
  return matchingTitles;
}

//getBookByAuthor(authorName)

Library.prototype.getBookByAuthor = function (authorName) {
  var matchingTitles = [];
  for (var i = 0; i < this.myBookArray.length; i++) {
    if (RegExp(authorName.toUpperCase(), "i").test(this.myBookArray[i].author.toUpperCase())) {
      matchingTitles.push(this.myBookArray[i].author)
    }
  }
  return matchingTitles;
}


//addBooks(books)
Library.prototype.addBooks = function (books) {
  var count = 0;
  for (var i = 0; i < books.length; i++) {
    if (this.addBook(books[i])) {
      count += 1;
    }
  }
  return count;
}


//getAuthor()
Library.prototype.getAuthors = function () {
  var authorsArray = [];
  for (var i = 0; i < this.myBookArray.length; i++) {
    if (authorsArray.indexOf(this.myBookArray[i].author) === -1) {
      authorsArray.push(this.myBookArray[i].author);
    }
  }
  return authorsArray;
}


//getRandomAuthorName function
Library.prototype.getRandomAuthorName = function () {
  if (this.myBookArray.length == 0) {
    return null;
  }
  return this.myBookArray[Math.floor(Math.random() * this.myBookArray.length)].author;

}

//betterSearch
Library.prototype.betterSearch = function (string) {
  var matchingItems = [];
  matchingItems.push(this.getBookByTitle(string));
  matchingItems.push(this.getBookByAuthor(string));
  return matchingItems;
}


//localstorage
Library.prototype.setObject = function (instanceKey) {
  localStorage.setItem(instanceKey, JSON.stringify(this.myBookArray));
  return instanceKey;
}

Library.prototype.getObject = function (instanceKey) {
  var localBooks = localStorage.getItem(instanceKey);
  if (localBooks !== null) {
    var parsedBooks = JSON.parse(localBooks);
    for (var index = 0; index < parsedBooks.length; index++) {
      this.addBook(new Book(parsedBooks[index]));
    }
  }
}

/////////////////document ready////////////////////////////////
$(document).ready(function () {
  window.gLib1 = new Library("gLib1");
  gLib1.init();
  // gLib1.addBooks(moreBooks);

});

//Lib Instance
// var gLib1 = new Library("gLib1");
// var gLib2 = new Library("gLib2");

//Book Instances
var gIt = new Book({ cover: "images/it-image.jpg", title: "IT", author: "Stephen King", numberOfPages: 800, publishDate: "December 17, 1995" });
var gCatcherInTheRye = new Book({ cover: "images/catcher-image.jpg", title: "Catcher In The Rye", author: "JD Salinger", numberOfPages: 200, publishDate: "December 25, 1987" });
var gGoodBook = new Book({ cover: "images/good-book.jpg", title: "A Good Book", author: "Someone Good", numberOfPages: 200, publishDate: "Jan 1, 2001" });
var gGoodToGreat = new Book({ cover: "images/good-great.jpg", title: "Good To Great", author: "Jim Collins", numberOfPages: 320, publishDate: "October 16, 2001" });
var gPapillon = new Book({ cover: "images/papillon-image.jpg", title: "Papillon", author: "Henri Charriere", numberOfPages: "500", publishDate: "December, 1970" })
var g1984 = new Book({ cover: "images/image-1984.jpg", title: "Ninteen Eighty-Four", author: "George Orwell", numberOfPages: "500", publishDate: "1949" })
var gHitchhikersGuide = new Book({ cover: "images/hitchhikers-image.jpg", title: "Hitchhiker's Guide to the Galaxy", author: "Douglas Adams", numberOfPages: "500", publishDate: "October 12, 1979" })
var gRobinsonCrusoe = new Book({ cover: "images/crusoe-image.jpg", title: "Robinson Crusoe", author: "Daniel Defoe", numberOfPages: "500", publishDate: "April 25, 1719" })
var gJourneyToTheCenterOfTheEarth = new Book({ cover: "images/journey-image.jpg", title: "Journey to the Center of the Earth", author: "Jules Verne", numberOfPages: "500", publishDate: "November 25, 1864" })
var gMereChristianity = new Book({ cover: "images/mere-image.jpg", title: "Mere Christianity", author: "C.S. Lewis", numberOfPages: "500", publishDate: "1952" })
var gBeowulf = new Book({ cover: "images/beowulf-image.jpg", title: "Beowulf", author: "Unknown", numberOfPages: "500", publishDate: "1000" })
var gBandOfBrothers = new Book({ cover: "images/band-bros.jpg", title: "Band of Brothers", author: "Stephen E. Ambrose", numberOfPages: "336", publishDate: "1992" })

//array of addBooks
var moreBooks = ([gIt, gCatcherInTheRye, gGoodBook, gGoodToGreat, gPapillon, g1984, gHitchhikersGuide, gRobinsonCrusoe, gJourneyToTheCenterOfTheEarth, gMereChristianity, gBeowulf, gBandOfBrothers]);
