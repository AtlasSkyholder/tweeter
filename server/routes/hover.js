$(document).ready(function(){
  $(".post-tweet").hover(
    function(event) {
    $(this).css("box-shadow", "10px 10px 5px grey");
    $("#userID").css("opacity", "0.5");
  }, function () {
    $(this).css("box-shadow", "0px 0px 0px grey");
    $("#userID").css("opacity", "0");
  });
});