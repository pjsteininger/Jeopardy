$(document).ready(function () {

    let clues = [];
    let categoryIds = [];
    let categoryQueryURL = "http://jservice.io/api/categories?count=6&offset=" + Math.floor(Math.random() * 10000);
    $.ajax({
        url: categoryQueryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        console.log($(".category")[0]);
        for (key in response) {
            if (response[key].title.length > 25) {
                $($(".category")[key]).css("font-size", "1.25em");
            } else if (response[key].title.length > 16) {
                $($(".category")[key]).css("font-size", "1.5em");
            }
            $($(".category")[key]).text(response[key].title);
            if ($(".category")[key].offsetHeight > 170) {
                $($(".category")[key]).css("font-size", "1.5em");
                $($(".category")[key]).text(response[key].title);
            }
            if ($(".category")[key].offsetWidth > 180) {
                $($(".category")[key]).css("font-size", "1.25em");
                $($(".category")[key]).text(response[key].title);
            }
            $($(".category")[key]).attr("data-category-title", response[key].title);
            $($(".category")[key]).attr("data-category-id", response[key].id);
            categoryIds.push(response[key].id);
        }
        console.log(categoryIds);
        let clueQueryURL = "http://jservice.io/api/clues?category=";

        categoryIds.forEach(function (e) {
            $.ajax({
                url: clueQueryURL + e,
                method: "GET"
            }).then(function (response) {
                let index = 
                clues[categoryIds.indexOf(response[0].category_id)] = (response);
            });
        });
        console.log(clues);
        // $.ajax({
        //     url:
        // })
    });
    let currentClue = $("#current-clue");

    $(".clue").on("click", function () {
        console.log($(this).position());
        //style='width:180px; height:120px; background-color:black;'

        let pos = $(this).offset();
        currentClue.css({
            top: pos.top + 10,
            left: pos.left + 10,
            width: "148px",
            height: "106px",
            display: "block",
        });
        console.log($(".clue").index($(this)));
        let index = $(".clue").index($(this));
        let indexCat = (index % 6);
        let indexClue = Math.floor(index / 6);
        currentClue.text(clues[indexCat][indexClue].question);
        currentClue.animate({
            height: "100%",
            width: "100%",
            top: 0,
            left: 0,
            fontSize: "4em",
            padding: "auto",
        }, 1000);


        /*$(window).resize(function(){
            currentClue.css({
                top: $("#clue1").offset().top,
                left: $("#clue1").offset().left,
                width: $("#clue1").width()+40,
            });
        });*/


    });

    currentClue.on("click", function () {
        currentClue.css({
            display: "none",
            height: 0,
            width: 0,
            fontSize: "0.5em",
            padding: 0,
        });
    });

    //$(".category")
    //+Math.floor(1+Math.random()*100)
    //    http://jservice.io/api/clues









});