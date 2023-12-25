
var gamePattern = [];
var buttonCol = ["red","blue","green","yellow"];
var userClickedPattern = [];

var count=0;
var level=0;

$(document).keypress(function() {
    if(count===0)
    {
        console.log("k");
        setTimeout(function(){
            nextSequence();
        },1000);
        count=count+1;
    }
});

function nextSequence()
{
    userClickedPattern = [];
    level++ ;
    $("h1").text("Level "+level);

    var randomNum = Math.floor(Math.random()*4);
    var randomCol =  buttonCol[randomNum];
    gamePattern.push(randomCol);

    $("#"+randomCol).fadeOut(100).fadeIn(100);

    var audio = new Audio("/Simon Game Challenge Starting Files\\sounds\\"+randomCol+".mp3");
    audio.play();

}

$(".btn").click(function() {

    var userChosenCol = this.id;
    userClickedPattern.push(userChosenCol);

    playSound(userChosenCol);

    animatePress(userChosenCol);

    checkAns((userClickedPattern.length-1));

});

function playSound(name)
{ 
    var audio2 = new Audio("/Simon Game Challenge Starting Files\\sounds\\"+name+".mp3");
    audio2.play();
}

function animatePress(currentCol)
{
    $("#"+currentCol).addClass("pressed");

    setTimeout(function() {
        $("#"+currentCol).removeClass("pressed");
    }, 100);
}

function checkAns(currentLevel)
{
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel])
    {
        if(userClickedPattern.length===gamePattern.length)
        {
            setTimeout(function()
            {
                nextSequence();
            }, 1000);
        }
    }
    else
    {
        var sound = new Audio("/Simon Game Challenge Starting Files\\sounds\\wrong.mp3");
        sound.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart ");

        startOver();
    }
}


function startOver()
{
    level=0;
    gamePattern = [];
    count = 0;
}




