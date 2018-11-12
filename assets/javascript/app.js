$(document).ready(function(){

  $("#start-button").on("click", gameState.startTimer);
});

var gameState = {

  timeRemaining : 60,

  startTimer: function() {
    $("#timer").text("Time remaining: " + gameState.timeRemaining);
    setInterval(gameState.countdown, 1000);
    $("#start-page").hide();
    trivia.displayQuestions();
  },

  countdown: function() {
    gameState.timeRemaining--;
    $("#timer").text("Time remaining: " + gameState.timeRemaining);
    if (gameState.timeRemaining === 0) {
      gameState.stopTimer();
      $("#timer").empty();
    }
  },

  stopTimer: function() {
    clearInterval();
    trivia.checkAnswers();
  },

  showEndPage: function(numCorrect, numIncorrect, numUnanswered) {
    $("#end-page").show();
    $("#questions-box").empty();
    $("#timer").empty();
    $("#timer").hide();
    $("#correct-answers").text("Correct: " + numCorrect);
    $("#incorrect-answers").text("Incorrect: " + numIncorrect);
    $("#unanswered").text("Skipped: " + numUnanswered);
  }
}

var trivia = {

  displayQuestions: function() {
    var divContainer = $("#questions-box");
    var answerGroup = $(".form-check");
    divContainer.append('<h2>Answer the following questions:</h2>');
            
    for (var i = 0; i < questionBank.length; i++) {

      divContainer.append('<div id="question">' + questionBank[i].question + '</div>');

      var answer1 = questionBank[i].answers[0];
      var answer2 = questionBank[i].answers[1];
      var answer3 = questionBank[i].answers[2];

      divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+i+'" id="radio'+i+'"><label class="form-check-label" id="radio'+i+'label" for="radio'+i+'">' + answer1 + '</label></div>');
      divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+i+'" id="radio'+i+'"><label class="form-check-label" id="radio'+i+'label" for="radio'+i+'">' + answer2 + '</label></div>');
      divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+i+'" id="radio'+i+'"><label class="form-check-label" id="radio'+i+'label" for="radio'+i+'">' + answer3 + '</label></div>');
    }

    var doneButton = '<button class="btn btn-primary" id="done-button" type="submit">Done</button>';
    divContainer.append(doneButton);
    $("#done-button").on("click", gameState.stopTimer);
  },

  checkAnswers: function() {
    var correctAnswer;
    var userAnswer;
    var numCorrect = 0;
    var numIncorrect = 0;
    var numUnanswered = 0;

    for (var i = 0; i < questionBank.length; i++) {
      correctAnswer = questionBank[i].correct;
      userAnswer = $('input[id=radio'+i+']:checked + label').text();

      if (userAnswer === correctAnswer) {
        numCorrect++;
      } else if (userAnswer === "") {
        numUnanswered++;
      } else if (userAnswer !== correctAnswer) {
        {
          numIncorrect++;
        }
      }
    }

    gameState.showEndPage(numCorrect, numIncorrect, numUnanswered);
  },
}

var questionBank =
[
  {
    question: "Which fictional city is the home of Batman?",
    answers: ["New York City", "Gotham City", "Metropilis"],
    correct: "Gotham City"
  },

  {
    question: "In which sport would you perform the Fosbury Flop?",
    answers: ["Wrestling", "Horseshoes", "The high jump"],
    correct: "The high jump"
  },
  {
    question: "What is a Geiger Counter used to detect?",
    answers: ["Radiation", "Geigers", "Gas Leaks"],
    correct: "Radiation"
  },
  {
    question: "Which Roman emperor supposedly fiddled while Rome burned?",
    answers: ["Claudias", "Nero", "Trump"],
    correct: "Nero"
  },
  {
    question: "What was the Hunchback of Notre Dame’s name?",
    answers: ["Refugio", "Quasimodo", "Charles Laughton"],
    correct: "Quasimodo"
  }]

