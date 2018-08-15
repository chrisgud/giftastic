//declare string array for generating buttons
var animals = [
    'dog', 'cat', 'rabbit', 'hamster', 'skunk', 'goldfish', 'bird', 'ferret', 'turtle',
    'sugar glider', 'chinchilla', 'hedgehog', 'hermit crab', 'gerbil', 'pygmy goat',
    'chicken', 'capybara', 'teacup pig', 'serval', 'salamander', 'frog' ];

function makeButtons(arr) {
    $('#buttonSpace').empty();
    for(i=0;i<arr.length;i++) {
        var button = $('<button>');
        button.text(arr[i]);
        button.addClass('animalButton');
        button.attr('data-animal', arr[i]);
        $('#buttonSpace').append(button);
    };
}

makeButtons(animals);



// Adding click event listen listener to all buttons
$(document).on("click", ".animalButton", function () {
    // Grabbing and storing the data-animal property value from the button
    var animal = $(this).attr("data-animal");

    // Constructing a queryURL using the animal name
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=FHgoVg2BPCGC1qffvNOwPFKvdgoYDXsW&limit=10&rating=pg-13";

    // Performing an AJAX request with the queryURL
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // After data comes back from the request
        .then(function (response) {
            console.log(queryURL);

            console.log(response);
            // storing the data from the AJAX request in the results variable
            var results = response.data;

            // Looping through each result item
            for (var i = 0; i < results.length; i++) {

                // Creating and storing a div tag
                var animalDiv = $("<div>");

                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rating: " + results[i].rating);

                // Creating and storing an image tag
                var animalImage = $("<img>");

                // Setting the src attribute of the image to a property pulled off the result item
                animalImage.attr("data-state", 'still');
                animalImage.attr("data-animate", results[i].images.fixed_height.url);
                animalImage.attr("data-still", results[i].images.fixed_height_still.url);
                animalImage.attr("src", results[i].images.fixed_height_still.url);
                animalImage.addClass("image");

                // Appending the paragraph and image tag to the animalDiv
                animalDiv.append(p);
                animalDiv.append(animalImage);

                // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
                $("#gifSpace").prepend(animalDiv);
            }
        });
});

$(document).on("click", ".image", function () {
    console.log('this');
    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

$("#submitButton").on("click", function (event) {
    event.preventDefault();

    animals.push($('#input').val().trim());

    makeButtons(animals);
});
