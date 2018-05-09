//import $ from "jquery"
///////////////////////// location class ///////////////////

class Locations {
    constructor(oArgs) {
        this.meetUpUrl = "https://api.meetup.com/2/cities?key=26534b6361477d2d7d627d58652f713c&";

    }

    //////////////////////// init /////////////////////////

    init() {
        this.bindEvents();

    };

    /////////////////////// bind events ////////////////////

    bindEvents() {
        $("#btnGetLocation").on('click', $.proxy(this.makeRequest, this));
        //$("#btnGetLocation").on('click', $.proxy(this.returnResults, this));
    }

    //////////////////////// AJAX request ///////////////////////////

    makeRequest() {
        let inputSearch = $("form").serialize();
        $.ajax({
            dataType: 'jsonp',
            type: "GET",
            url: this.meetUpUrl + inputSearch
          
        }
        ).done(this.returnResults)

        
    .fail(function() {
        console.log("fail")
    })
};


 
    returnResults(response) {
        var responseArray = "";
        for (var i = 0; i < response.results.length; i++) {
            responseArray += "<ul class='list-group'>" +
            "<li class='list' >ZIP: " + response.results[i].zip + "</li>" +
            "<li class='list' >COUNTRY: " + response.results[i].localized_country_name + "</li>" +
            "<li class='list' >CITY: " + response.results[i].city + "</li>" +
            "<li class='list' >RANKING: " + response.results[i].ranking + "</li>" +
            "<li class='list' >STATE: " + response.results[i].state + "</li>" +
            "<li class='list' >MEMBERS: " + response.results[i].member_count + "</li></ul>";
        }
        //console.log(responseArray);
        $("#location").empty();
        $("#location").append(responseArray);
 
    }
 };   
    





//////////////////// FIXME: addLocation /////////////////////

// addLocations(location) {
//     for (var i = 0; i < this.locationArray.length; i++) {
//       if (this.locationArray[i].title.toUpperCase() === book.title.toUpperCase()) {
//         return false;
//       }
//     }
//     this.myBookArray.push(book);
//     if (this.$table.api) {
//       this.$table.dataTable().fnDraw();
//     }
//     this.setObject("gLib1");
//     return true;
//   };



///////////////////////// local storage /////////////////////////

// setObject(instanceKey) {
//     localStorage.setItem(instanceKey, JSON.stringify(this.locationKey));
//     return instanceKey;
//   }
//   getObject(instanceKey) {
//     var localLocation = localStorage.getItem(instanceKey);
//     if (localLocation !== null) {
//       var parsedLocation = JSON.parse(localLocation);
//       for (var index = 0; index < parsedLocation.length; index++) {
//         this.addBook(new Book(parsedBooks[index]));
//       }
//     }
//   }

////////////////////// location constructor /////////////////

// class location{
//     constructor(arg) {
//       this.zip = arg.zip;
//       this.country = arg.country;
//       this.city = arg.city;
//       this.ranking = arg.ranking;
//       this.state = arg.state;
//       this.member_count = arg.member_count
//     }
//   }

////////////////////// document ready //////////////////////////

$(document).ready(function () {

    meetUp.init();
});
var meetUp = new Locations();