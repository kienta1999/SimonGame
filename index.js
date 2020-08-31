var allColor = ["green", "red", "yellow", "blue"];

var level = 0;
var computerChoice = [];
var countNumButtClicked = 0;
var isCorrect = true;

function getRandomColor(){
  var index = Math.floor(Math.random() * 4);
  return  allColor[index];
}

function addSound(color, isCorrect){
  if(isCorrect){
    var url = "sounds/" + color + ".mp3";
    var audio = new Audio(url);
    audio.play();
  }
  else{
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
  }
  
}

function addPressEffect(id){
  $("#" + id).addClass("pressed");
  setTimeout(function (){
    $("#" + id).removeClass("pressed");
  }, 100);
}

//user click the button
//use this in main
function buttonClickEffect(){

  $(".btn").click(function (event) {
    // console.log(event); 
    var id = this.getAttribute("id");
    isCorrect = (id === computerChoice[countNumButtClicked]);
    // console.log(isCorrect + " " + id + " " + countNumButtClicked);
    countNumButtClicked++;
    addSound(id, isCorrect);
    addPressEffect(id);

    if(countNumButtClicked === computerChoice.length)
        setTimeout(newLevel, 200);
    if(!isCorrect){
      $("#level-title2").text("You lost!");
      setTimeout(function () {
        location.reload()
      }, 700);
    }


  });
}

//computer
function computerChoiceDisplay(){
  var id = computerChoice[computerChoice.length - 1];
  console.log(id);
  addSound(id, true);
  addPressEffect(id);
}

function newLevel(){
  level++;
  countNumButtClicked = 0;
  computerChoice.push(getRandomColor());
  $("#level-title2").text("Level: " + level);
  setTimeout(computerChoiceDisplay, 200);
}







function main(){
  $(document).one("keypress", function (e) { 
    newLevel();
  });
  buttonClickEffect();

}

main();

