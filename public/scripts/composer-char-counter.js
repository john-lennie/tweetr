$(function() {
  $( ".new-tweet form textarea" ).keypress(function() {
    var value = $(this).val();
    var remainingCharacters = 139 - value.length;
    $(this).parent().find(".counter").text(remainingCharacters);
    if (value.length > 139) {
      $(this).parent().find(".counter").css( "color", "red" );
    } else {
      $(this).parent().find(".counter").css( "color", "black" );
    }
  });
});
