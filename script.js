
const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
const loader = document.getElementById("loader");
const game = document.getElementById("game");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

//Questions linked//
let questions = [
  {
  question: "What is the name of Thor's hammer?",
  choice1: "Mjolnir",
  choice2: "Stormbreaker",
  choice3: "Hammertime",
  choice4: "None of the above",
  answer: 1
  },
  {
  question: "Who were the original 6 Avengers?",
  choice1: "Iron Man, Black Widow, Thor, Hulk, Hawkeye, Captain America",
  choice2: "Hulk, Groot, Drax, Rocket, Star Lord, Vision",
  choice3: "Dr. Strange, Spider Man, Captain Marvel, Nick Fury, Loki, Thanos",
  choice4: "Black Panther, Falcon, Buckey, Mantis, Ant Man, Wasp",
  answer: 1
  },
  {
  question: "What is the name of Thor's home planet?",
  choice1: "Vormir",
  choice2: "Terra",
  choice3: "Asgard",
  choice4: "Midgard",
  answer: 3
  },
  {
  question: "What is Captain America's shield made out of?",
  choice1: "Steel",
  choice2: "Adamantium",
  choice3: "Vibranium",
  choice4: "Iron",
  answer: 3
  },
  {
  question: "What is Captain America's real name?",
  choice1: "Steve Rogers",
  choice2: "Clark Kent",
  choice3: "Tony Stark",
  choice4: "Clint Barton",
  answer: 1
  },
  {
  question: "What is the Hulk's real name?",
  choice1: "Just Hulk",
  choice2: "Bruce Banner",
  choice3: "Bruce Springsteen",
  choice4: "Bruce Willis",
  answer: 2
  },
  {
  question: "Which  Avenger is from Eastern Europe?",
  choice1: "Hawkeye",
  choice2: "Black Widow",
  choice3: "Nick Fury",
  choice4: "Ant Man",
  answer: 2
  },
  {
  question: "Bruce Banner became the Hulk after being exposed to what?",
  choice1: "A nuclear explosion",
  choice2: "Gamma Radiation",
  choice3: "Super Soldier Serum",
  choice4: "Human Growth Hormone",
  answer: 2
  },
  {
  question: "What is Iron Man's real name?",
  choice1: "Steven Strange",
  choice2: "Tony Stark",
  choice3: "Steve Rogers",
  choice4: "Peter Parker",
  answer: 2
  },
  {
  question: "Who originally created the Avengers?",
  choice1: "Marvel",
  choice2: "Stan Lee and George Perez",
  choice3: "Stan Lee and Jack Kirby",
  choice4: "Stan Lee and Josef Rubinstein",
  answer: 3
  }
];

//Constants 
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("end.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);

  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
  localStorage.setItem('score',score);
};

startGame();


