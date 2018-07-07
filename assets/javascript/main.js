$(document).ready(function () {

    let clues = [];
    let categoryIds = [];
    let categoryQueryURL = "http://jservice.io/api/categories?count=6&offset=" + Math.floor(Math.random() * 10000);
    let isAnswer = false;
    let playerAnswer = "";
    let gameAnswer = "";
    $.ajax({
        url: categoryQueryURL,
        method: "GET"
    }).then(function (response) {
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
    });
    console.log(clues);
    let currentClue = $("#current-clue");
    $(".clue").on("click", function () {
        let pos = $(this).offset();
        currentClue.css({
            top: pos.top + 10,
            left: pos.left + 10,
            width: "148px",
            height: "106px",
            display: "block",
            padding: "20px",
        });
        let index = $(".clue").index($(this));
        let indexCat = (index % 6);
        let indexClue = Math.floor(index / 6);
        gameAnswer = clues[indexCat][indexClue].answer;
        currentClue.text(clues[indexCat][indexClue].question);




        let timerDiv = $("<div>00:10</div>");
        let clockTime = 2;
        currentClue.append(timerDiv);
        timer = function () {
            clockTime--;
            timerDiv.text("00:0" + clockTime);
            console.log(clockTime);
            if (clockTime <= 0) {
                clearInterval(ansClock);
                compareAns();
                isAnswer = true;
            }
        }
        let ansClock = setInterval(timer, 1000);
        let ansDiv = $("<div>")
        ansDiv.append("<input type='text' value='' id='clue-guess'>");
        ansDiv.append("<input type='button' value='?' id='make-guess'>");
        currentClue.append(ansDiv);
        $("#clue-guess").focus();
        $("#make-guess").click(function () {
            console.log($("#clue-guess").val());
        });
        currentClue.animate({
            height: "100%",
            width: "100%",
            top: 0,
            left: 0,
            fontSize: "60px",
            padding: "120px",
        }, 1000);
    });

    function compareAns() {
        playerAnswer = $("#clue-guess").val();
        if (playerAnswer === "") {
            return false;
        } else {
            re = new RegExp(gameAnswer, 'i');
            console.log(re);
            if (playerAnswer.match(re)) {
                alert("match");
                return true;
            } else {
                return false;
            }
        }

    };
    currentClue.on("click", function () {
        if (isAnswer) {
            currentClue.empty();
            currentClue.css({
                display: "none",
                height: 0,
                width: 0,
                fontSize: "10px",
                padding: 0,
            });
            isAnswer = false;
        }
    });










});