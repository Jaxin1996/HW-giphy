var title = ['cats', 'Game of Thrones', 'dogs', 'Destiny 2', 'Parks and Recreation', 'Bobs Burger'];
var currentGif; var pausedGif; var animatedGif; var stillGif;

//creates buttons
function createButtons(){
	$('#buttons').empty();
	for(var i = 0; i < title.length; i++){
		var gifBtn = $('<button>').text(title[i]).addClass('gifBtn').attr({'data-name': title[i]});
		$('#buttons').append(gifBtn);
	}

	//displays gifs on click
	$('.gifBtn').on('click', function(){
		$('.display').empty();

		var thisGif = $(this).data('name');
		var giphyURL = "http://api.giphy.com/v1/gifs/search?q=tv+show+" + thisGif + "&limit=10&api_key=dc6zaTOxFJmzC";
		$.ajax({url: giphyURL, method: 'GET'}).done(function(giphy){
			currentGif = giphy.data;
			$.each(currentGif, function(index,value){
				animatedGif= value.images.original.url;
				pausedGif = value.images.original_still.url;
				var thisRating = value.rating;
				//gives blank ratings 'unrated' text
				if(thisRating == ''){
					thisRating = 'unrated';
				}
				var rating = $('<h5>').html('Rated: '+thisRating).addClass('ratingStyle');
				stillGif= $('<img>').attr('data-animated', animatedGif).attr('data-paused', pausedGif).attr('src', pausedGif).addClass('playOnHover');
				var fullGifDisplay = $('<button>').append(rating, stillGif);
				$('.display').append(fullGifDisplay);
			});
		});
	});
}

//animates and pauses gif on hover
$(document).on('mouseover','.playOnHover', function(){
 	   	$(this).attr('src', $(this).data('animated'));
 });
 $(document).on('mouseleave','.playOnHover', function(){
 	   	$(this).attr('src', $(this).data('paused'));
 });

//sets a button from input
$('#add').on('click', function(){
	var newGIF = $('#newInput').val().trim();
	title.push(newGIF);
	createButtons();
	return false;
});

createButtons();