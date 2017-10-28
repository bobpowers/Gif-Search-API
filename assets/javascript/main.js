


$(document).ready(function(){
	var moodArray = ["laughter", "crying", "rage", "disappointed",
				"depressed", "creepy", "sneaky"];
	var wordSearch;
	var displayGif;


	var updateMoods = function(){
		$("#moodButtons").empty();
		for (var i = 0; i < moodArray.length; i++) {
			var newButton = $("<button>");
			newButton.addClass("buttonStyling btn btn-primary")
			newButton.text(moodArray[i]);
			$("#moodButtons").append(newButton);
			$("moodButtons").empty();
		}
	}
	updateMoods();

	$(document).on("click", ".buttonStyling", function(){
		$("#gifDisplay").empty();
		wordSearch = $(this).text();
		var replaced = wordSearch.replace(/ /g, '+');
        wordSearch = replaced;
		makeTheCall();
	});


var makeTheCall = function(){
	var queryURL = "http://api.giphy.com/v1/gifs/search?q="+wordSearch+"&limit=10&rating=pg&api_key=dc6zaTOxFJmzC";
	console.log(queryURL)
	$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(response){
			console.log(response);
			for (var i = 0; i < response.data.length; i++) {
				var newDiv = $("<div>");
				var ratingP = $("<p>");
				var newPicture = $("<img>");
				newPicture.addClass("gif");
				var ratingLocation = response.data[i].rating;
				ratingP.text("Rating: " + ratingLocation);
				var stillPicLocation = response.data[i].images.fixed_height_still.url;
				var animatePicLocation = response.data[i].images.fixed_height.url;
				newPicture.attr("src", stillPicLocation);
				newPicture.attr("data-still", stillPicLocation);
				newPicture.attr("data-animate", animatePicLocation);
				newPicture.attr("data-state", "still")
				newDiv.append(newPicture, ratingP);
				$("#gifDisplay").append(newDiv);
			}
		});
}

	$("#searchButton").on("click", function(event){
		if ($("#searchField").val() === ""){
			return false;
		}
		else {
			event.preventDefault();
			var newMood = $("#searchField").val();
			$("#searchField").val("");
			moodArray.push(newMood);
			updateMoods();
			var replaced = newMood.replace(/ /g, '+');
        	newMood = replaced;
			wordSearch = newMood;
			$("#gifDisplay").empty();
			makeTheCall();
		}
	});
	
	$(document).on("click", ".gif", function(){
		var state = $(this).attr("data-state");
		if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        }
        else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }

	});






}); // Document Ready END







