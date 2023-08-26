// Get a reference to the highScoresList element in the DOM
const highScoresList = document.querySelector('#highScoresList');

// Retrieve high scores from local storage, or initialize an empty array if none exist
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

// Sort the highScores array in descending order based on the score
highScores.sort((a, b) => b.score - a.score);

// Update the HTML content of the highScoresList element with a list of high scores
highScoresList.innerHTML = highScores.map(score => {
    // Create a list item for each high score, displaying the name and score
    return `<li class="high-score">${score.name} - ${score.score}</li>`;
}).join('');
