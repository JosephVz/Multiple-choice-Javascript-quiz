var questions = [
  {
    question: "Commonly used data types do not include...",
    answers: [
      {text: "Arrays", correct: false},
      {text: "Strings", correct: false},
      {text: "Alerts", correct: true},
      {text: "Booleans", correct: false},
    ]
  },
  {
    question: "What is the css file called?",
    answers: [
      {text: "style.css", correct: true},
      {text: "css.style", correct: false},
      {text: "css", correct: false},
      {text: "style", correct: false},
    ]
  },
  {
    question: "What is the HTML file called?",
    answers: [
      {text: "index", correct: false},
      {text: "html", correct: false},
      {text: "index.html", correct: true},
      {text: "html.index", correct: false},
    ]
  },
  {
    question: "What is the JavaScript file called?",
    answers: [
      {text: "script.java", correct: false},
      {text: "script.js", correct: true},
      {text: "java.script", correct: false},
      {text: "js.script", correct: false},
    ]
  }
];

var questionElement = document.getElementById("question");
var answerButtons = document.getElementById("answer-buttons");
var nextButton = document.getElementById("next-btn");
var score = document.getElementById("high-score");

let currentQuestionIndex = 0;

function startQuiz() {
  updateTimer();
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

let time = 60;

function updateTimer() {
  const timerElement = document.getElementById('timer');
  time--;
  
  if (time > 0) {
  timerElement.textContent = (time + " seconds remaining.");
  } else { (time <= 0)
  timerElement.textContent = ("Times Up!");
  }
}

const timerInterval = setInterval(updateTimer, 1000);

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.
  question;

  currentQuestion.answers.forEach(answer => {
    var button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    
    if(answer.correct) {
      button.dataset.correct = answer.correct;
    }

    button.addEventListener("click", selectAnswer)
  });
}

function resetState(){
  nextButton.style.display = "none";
  while(answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  var selectedBtn = e.target;
  var isCorrect = selectedBtn.dataset.correct === "true";
  if(isCorrect) {
    selectedBtn.classList.add("correct");
  }else{
    selectedBtn.classList.add("incorrect");
    time-=15;
  }
  Array.from(answerButtons.children).forEach(button => {
    if(button.dataset.correct === "true"){
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore(){
  resetState();
  
  if (time > 0) {
    questionElement.innerHTML = "You did It! You scored " + time + " second(s).";
    } else { (time <= 0) 
    questionElement.innerHTML = "Try again.";
    }

  

  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton(){
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length){
    showQuestion();
  }else{
    showScore();
  }
}

nextButton.addEventListener("click", ()=>{
  if(currentQuestionIndex < questions.length){
    handleNextButton();
  }else{
    startQuiz();
  }
});




startQuiz();


//To do
//reset timer on play again