const buttonColors = ['red', 'blue', 'green', 'yellow'];
let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;

$(document).keydown(function() {
    if (!started) {
        $('#level-title').text(`Level ${level}`);
        nextSequence();
        started = true;
    }
});

$('.btn').click(function() {
    const userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatedPress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
    userClickedPattern = [];

    level++;

    $('#level-title').text(`Level ${level}`);

    const randomNumber = Math.floor(Math.random() * 4);
    
    const randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    const selectedButton = $(`#${randomChosenColor}`);

    selectedButton.fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);
}

function playSound(name) {
    const audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

function animatedPress(currentColor) {
    $(`#${currentColor}`).addClass('pressed');

    setTimeout(function() {
        $(`#${currentColor}`).removeClass('pressed');
    }, 100);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        // Check if the user has finished their sequence
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound('wrong');
        $('body').addClass('game-over');
        setTimeout(function() {
            $('body').removeClass('game-over');
        }, 200);
        $('#level-title').text(`Game Over, Press Any Key to Restart`);
        starOver();
    }
}

function starOver() {
    level = 0;
    gamePattern = [];
    started = false;
}