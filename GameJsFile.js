var gamePattern = [];
var buttonColors = ["red", "green", "blue", "yellow"];
var userClickedPattern = [];
var level = 0;
var curr = 0;

$("body").keydown(function(){
    if(level === 0)
    {
        curr = 0;
        nextSeq();
    }
});

function nextSeq()
{
    $("h1").text("Level " + level);
    level++;
    
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    
    // console.log(gamePattern);
    
    // Next level button indicator
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
}

$(".btn").click(function(){
    
    if(curr === 0)
    {
        userClickedPattern = [];
    }

    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    
    playSound(userChosenColor);
    animatePress(userChosenColor);
    console.log(userClickedPattern);
 
    checkAns(curr);
    curr++;
    if(curr === level)
    {
        curr = 0;
        setTimeout(nextSeq, 1000);
    }
});

function checkAns(i)
{
    if(userClickedPattern[i] !== gamePattern[i])
    {
        startOver();
        playSound("wrong");
        
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        
        $("h1").text("Game Over, Press Any Key to Restart");
    }
}

function startOver()
{
    level = 0;
    gamePattern = [];
}

function playSound(sample)
{
    var audio = new Audio("sounds/" + sample + ".mp3");
    audio.play();
}

function animatePress(pressedBtn)
{
    $("#" + pressedBtn).addClass("pressed");
    setTimeout(function(){
        $("#" + pressedBtn).removeClass("pressed");
    }, 100);
}



