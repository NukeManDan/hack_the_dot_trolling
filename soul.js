var gifs=["Soul", "Sole", "Soul Train",];

function renderButtons(){

  $("#giphyViews").empty();

  for (var i = 0; i < gifs.length; i++) {

    var button = $('<button>');
    console.log(button);

    button.addClass("giphys");
    button.attr("gifData", gifs[i]);
    button.attr('value')
    button.text(gifs[i]);
    $('#giphyViews').append(button);
    // console.log(renderButtons); 
  }
}
// function that handles the button click 
 $("#addGifphy").on('click', function(event){
  //  keeps form from trying to submit itself with event.preventDefault()
   event.preventDefault();

   var gifinput = $("#giphyInput").val().trim();

   gifs.push(gifinput);

   renderButtons();
   $("#giphyInput").val("");
 });
  renderButtons();

$("#giphyViews").on('click', "button", function(){
  var query = $(this).attr("gifData");
  console.log(query);
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=rqdIOvDZO5c5DHasPG1FNpP45S1Rn7s1&q= "+ query + "&limit=10&offset=0&rating=R&lang=en";
    $.ajax({
      url: queryURL,
      method: "GET"
    })
    
    .then(function(response) {
      console.log(response);
      var results = response.data;
      console.log(results);

      for (var i = 0; i < results.length; i++) {
        var gifDiv = $('<div>');
        var rating = results[i].rating;
        console.log(rating);
        var p = $("<p>").text("Rating: " + rating);
        var still = $('<img>');
        still.attr("src", results[i].images.fixed_height_still.url);
        still.attr('data-still', results[i].images.fixed_height_still.url);
        still.attr('data-animate', results[i].images.fixed_height.url);
        gifDiv.append(p);
        gifDiv.append(still);
        $('.giphy').prepend(gifDiv);
        console.log(results);
    }
    });
  });

  $(".giphy").on('click',"img", function() {
    var state = $(this).attr('src');
    console.log(state);
  if(state === $(this).data('still')){
    $(this).attr("src",$(this).data("animate"));
  } else {
     $(this).attr("src",$(this).data("still"));
   }    
  });
