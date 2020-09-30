/* -------------------------------- VARIABLES ------------------------------- */
var started = false
var gamePattern = []
var userClickedPattern = []
var colors = ["green", "red", "yellow", "blue"]
var level = 0


/* -------------------------------- FUNCTIONS ------------------------------- */
function checkAnswer(index) {
    if (userClickedPattern[index] === gamePattern[index]) {
        console.log("success")
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => { nextSequence() }, 1000);
        }
    }
    else {
        console.log("wrong")
        playSound("wrong")
        $("body").addClass("game-over")
        setTimeout(() => { $("body").removeClass("game-over") }, 200);
        $("#level-title").text("Game Over! Press Any Key to Restart.")
        startOver()
    }
}

function nextSequence() {
    level++
    $("#level-title").text(`Level ${level}`)
    userClickedPattern = []
    var randomNumber = Math.floor(Math.random() * 4)
    var randomColorSelected = colors[randomNumber]
    gamePattern.push(randomColorSelected)
    animatePress(randomColorSelected)
    playSound(randomColorSelected)


}

function handleClick() {
    var colorPressed = $(this).attr("id")
    userClickedPattern.push(colorPressed)
    // animating the pressing of button
    animatePress(colorPressed)
    // playing sound on clicking the button
    playSound(colorPressed)
    // check for the answer
    checkAnswer(userClickedPattern.length - 1)

}
function startOver() {
    userClickedPattern = []
    gamePattern = []
    level = 0
    started = false
}

function animatePress(currentColorPressed) {
    $(`#${currentColorPressed}`).addClass("pressed")
    setTimeout(() => $(`#${currentColorPressed}`).removeClass("pressed"), 100);
}

function playSound(name) {
    var audio = new Audio(`./sounds/${name}.mp3`)
    audio.play()
}


/* ----------------------------- EVENT LISTENERS ---------------------------- */
$(".btn").click(handleClick)
$(document).keypress(function () {
    if (!started) {
        $("#level-title").text(`Level ${level}`)
        nextSequence()
        started = true
    }
})