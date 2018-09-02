$(document).ready(function() {

var buttons = ["phil dunphy", "homer simpson", "walter white", "peter griffin", "fred flinstone", "andy dwyer",];
var gifSearch = "";

createButtons();



$(".character-btn").on("click", function() {
    var gifSearch = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=x0zNBsY4UorG3vRmgC7fwpuwdzDAb8PV&q=" + gifSearch + "&limit=10&offset=0&rating=PG&lang=en";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        var results = response.data;

        for(g=0; g < results.length; g++) {

            if(results[g].rating !== "r" && results[g].rating !== "pg-13") {
                var characterDiv = $("<div class='character'>");

                var rating = results[g].rating;

                var p = $("<p>").text("Rating: " + rating);

                var characterImage = $("<img>");
                characterImage.addClass("gif");
                characterImage.attr("src", results[g].images.fixed_height_still.url);
                characterImage.attr("data-still", results[g].images.fixed_height_still.url);
                characterImage.attr("data-active", results[g].images.fixed_height.url);
                characterImage.attr("data-state", "still");



                characterDiv.append(p);
                characterDiv.append(characterImage);

                $("#gifArea").prepend(characterDiv);


            }
        }

    });
});

function changeGif() {
    var state = $(this).attr("data-state");
    var still = $(this).attr("data-still");
    var active = $(this).attr("data-active");

    if(state === 'still') {
        $(this).attr("src", active);
        $(this).attr("data-state", "active");
    } else {
        $(this).attr("src", still);
        $(this).attr("data-state", "still");
    }

};


function createButtons() {
    // clear the button area before making new buttons
    $("#buttonArea").empty();

    for(i=0; i < buttons.length; i++) {
        var a = $("<button>").addClass("character-btn").attr("data-name", buttons[i]).text(buttons[i]);

        $("#buttonArea").append(a);
    }
};

$(document).on("click", ".gif", changeGif);
















});