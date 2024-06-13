const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");

// Initialize game variables
let currentQuestion = {};
let acceptingAnswers = true;
let timeRemaining = 60;
let score = 0
let penalty = 5;
let questionCounter = 0;
let availableQuestions = [];

// Define quiz questions
let questions = [
  {
    question: "Terpenes are the largest and most diverse group of _________",
    choice1: "synthetic chemicals",
    choice2: "naturally occurring compunds",
    choice3: "vitamins and minerals",
    choice4: "inorganic substances",
    answer: 2,
  },
  {
    question:
      "Terpenes are responsible for________ , ________ & ________  associated with various types of plants.",
      choice1: "growth, structure, and stability",
      choice2: "photosynthesis, respiration, and transpiration",
      choice3: "texture, size, and shape",
      choice4: "aromas, flavors, and colors",
      answer: 4,
  },
  {
    question: "There's how many known terpenes in cannabis?",
    choice1: "200",
    choice2: "150",
    choice3: "500",
    choice4: "250",
    answer: 2,
  },
  {
    question:
      "Alpha-pinene smells like ______?",
    choice1: "pine needles",
    choice2: "dill",
    choice3: "basil",
    choice4: "hops",
    answer: 1,
  },
];

// Constants
const SCORE_POINTS = 100;
const MAX_QUESTIONS = 4;

// Function to start the game
startGame = () => {
  questionCounter = 0;
  timeRemaining = 60; // Reset the time
  availableQuestions = [...questions];
  getNewQuestion();
  // Start the countdown timer
  startTimer();
};

// Function to start the countdown timer
startTimer = () => {
  const timerInterval = setInterval(() => {
    timeRemaining--;
    scoreText.innerText = timeRemaining;

    if (timeRemaining <= 0) {
      clearInterval(timerInterval);
      endGame();
    }
  }, 1000);
};

// Function to get a new question
getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", timeRemaining);  //sets most recent score to time remaining

    return window.location.assign("end.html");
  }

  questionCounter++;
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionsIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionsIndex, 1);

  acceptingAnswers = true;
};

// Function to decrement the score (time remaining)
decrementScore = (num) => {
  timeRemaining -= num;
  if (timeRemaining < 0) {
    timeRemaining = 0;
  }
  scoreText.innerText = timeRemaining;
};

// Event listeners for user choices
choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    let classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(SCORE_POINTS);
    } else if (classToApply === "incorrect") {
      decrementScore(penalty);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

// Function to increment the score
incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startGame();
