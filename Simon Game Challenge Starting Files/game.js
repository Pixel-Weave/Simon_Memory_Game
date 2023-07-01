var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;

$(document).keypress(function () {

    if (!started) {

        $("h1").text("Level " + level);
        nextSequence();
        started = true;

    }

});

$(".btn").on("click", function () {

    var userChosenColor = $(this).attr("id");
    animatePress(userChosenColor);
    playSound(userChosenColor);
    userClickedPattern.push(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
         
});

function nextSequence () {

    userClickedPattern = [];

    

    level++;
    $("h1").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4) ;
    var randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);
    console.log(gamePattern);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor); 

    

    

}

function playSound(name) {

    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();

}

function animatePress (currentColor) {

    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);

}

function checkAnswer (currentLevel) {

    if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
        if (gamePattern.length == userClickedPattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }

    else {

        $("body").addClass("game-over");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        var sound = new Audio("./sounds/wrong.mp3");
        sound.play();

        $("h1").text("Game Over, Press Any Key to Restart Again.")

        startOver();

    }

}

function startOver () {
    level = 0;
    started = false;
    gamePattern = [];
}
