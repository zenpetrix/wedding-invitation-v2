$(document).ready(function() {
  $("body").addClass("preloader-site");
});

$(window).on("load", function () {
  $(".preloader-wrapper").fadeOut("slow");
  $("body").removeClass("preloader-site");
});