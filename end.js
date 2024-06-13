// Wait for the DOM content to be fully loaded before executing the code
document.addEventListener("DOMContentLoaded", function () {
  // Get references to DOM elements
  const username = document.querySelector("#username");
  const saveScoreBtn = document.querySelector("#saveScoreBtn");
  const scoreEl = document.querySelector("#score");

  // Retrieve the most recent score from local storage
  const mostRecentScore = localStorage.getItem("mostRecentScore");

  // Display the most recent score on the page
  scoreEl.textContent = mostRecentScore;

  // Retrieve high scores from local storage, or initialize an empty array if none exist
  const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

  // Define the maximum number of high scores to display
  const MAX_HIGH_SCORES = 5;

  // Enable the save button when the user enters a username
  username.addEventListener("keyup", () => {
    saveScoreBtn.disabled = !username.value;
  });

  // Function to save the high score
  saveHighScore = (e) => {
    e.preventDefault();

    // Create an object representing the current score and username
    const score = {
      score: mostRecentScore,
      name: username.value,
    };

    // Add the score to the highScores array
    highScores.push(score);

    // Sort the highScores array in descending order based on score
    highScores.sort((a, b) => {
      return b.score - a.score;
    });

    // Keep only the top 5 high scores
    highScores.splice(5);

    // Store the updated high scores in local storage
    localStorage.setItem("highScores", JSON.stringify(highScores));

    // Redirect the user back to the main page (index.html)
    window.location.assign("index.html");
  };

  // Attach the saveHighScore function to the saveScoreBtn click event
  saveScoreBtn.addEventListener("click", saveHighScore);
});

