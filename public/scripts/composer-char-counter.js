$(document).ready(function(){
  $("#myText").on("keyup", function(event) {
    // --- our code goes here ---
    let countNumber = 140 - $(this).val().length;
    if (countNumber >= 0) {
      $(".counter").text(countNumber).css("color", "#545149");
    } else if (countNumber < 0){
      $(".counter").text(countNumber).css("color", "red");
    }
  });
});

