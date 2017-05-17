/* MOBILE MENU */
var menuSlide = function() {
    $('#nav-icon1').click(function(){
        $(this).toggleClass('open');
    });
    $('#nav-icon1').click(function() {
        $('.sidebar-nav').slideToggle(400);
    });
    $(window).resize(function(){
        var windowWidth = window.innerWidth;
        if (windowWidth > 991) {
            $(".sidebar-nav").slideDown();
        }
        else {
            $("#nav-icon1").removeClass('open');
            $(".sidebar-nav").slideUp();
        }
    });
};
$(document).ready(menuSlide);

/* MOBILE TABLES */
(function () {
    var headertext = [],
        headers = document.querySelectorAll("th"),
        tablerows = document.querySelectorAll("th"),
        tablebody = document.querySelector("tbody");
    if (document.querySelector("table")) {
        for(var i = 0; i < headers.length; i++) {
            var current = headers[i];
            headertext.push(current.textContent.replace(/\r?\n|\r/,""));
        }
        for (var i = 0, row; row = tablebody.rows[i]; i++) {
            for (var j = 0, col; col = row.cells[j]; j++) {
                col.setAttribute("data-th", headertext[j]);
            }
        }
    }
} ());

	