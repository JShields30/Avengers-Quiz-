const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

// Number of total high scores able to save//
const MAX_HIGH_SCORES = 20;

finalScore.innerText = mostRecentScore;

username.addEventListener("keyup", () => {
  saveScoreBtn.disabled = !username.value;
});

saveHighScore = e => {
  e.preventDefault();
  let savedScore = localStorage.getItem('score');

  const score = {
    score:savedScore,
    name: username.value
  };
  highScores.push(score);
  highScores.sort((a, b) => b.score - a.score);
  highScores.splice(20);

  localStorage.setItem("highScores", JSON.stringify(highScores));
  window.location.assign(href='index.html');
};