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
            responseArray += "<ul class='list-group ml-5'> " +
            "<li class='list'><h6 class='d-inline'>ZIP:</h6> " + response.results[i].zip + "</li>" +
            "<li class='list'><h6 class='d-inline'>COUNTRY:</h6> " + response.results[i].localized_country_name + "</li>" +
            "<li class='list'><h6 class='d-inline'>CITY:</h6> " + response.results[i].city + "</li>" +
            "<li class='list'><h6 class='d-inline'>RANKING:</h6> " + response.results[i].ranking + "</li>" +
            "<li class='list'><h6 class='d-inline'>STATE:</h6> " + response.results[i].state + "</li>" +
            "<li class='list mb-4'><h6 class='d-inline'>MEMBERS:</h6> " + response.results[i].member_count + "</li></ul>";
        }
        //console.log(responseArray);
        $("#location").empty();
        $("#location").append(responseArray);
 
    }
 };   
    








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
    $("button").css("color", "blue");
    $("body").css("background", "url('css/images/night-earth3.gif') no-repeat");
    $("body").css("background-size", "cover");
    $("body").css("color","red")
    $("input").css("background-color", "gray");
    $("input").css("color", "white");
});
var meetUp = new Locations();