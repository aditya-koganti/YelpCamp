// $("input").keypress(function (event) {
//     if (event.which === 13) {
//         var collected = $("input").val();
//         $("ul").append("<li><span><i class='fa fa-trash'></i></span> " + collected + "</li>");
//         $("input").val("");
//     }
// })

$("ul").on("click", "li", function () {
    $(this).toggleClass("cancel");
})

// $("ul").on("click", "span", function (event) {
//     $(this).parent().fadeOut(function () {
//         $(this).remove();
//     });
//     event.stopPropagation();
// })

$(".fa-plus").on("click", function () {
    $("input").slideToggle();
})
