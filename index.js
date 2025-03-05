const frontendQuiz = [
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "Hyper Text Markup Language", correct: true },
      { text: "Home Tool Markup Language", correct: false },
      { text: "Hyperlinks and Text Markup Language", correct: false },
      { text: "Hyper Text Machine Language", correct: false },
    ],
  },
  {
    question: "Which HTML attribute is used to define inline styles?",
    answers: [
      { text: "class", correct: false },
      { text: "style", correct: true },
      { text: "font", correct: false },
      { text: "styles", correct: false },
    ],
  },
  {
    question: "Which property is used to change the background color in CSS?",
    answers: [
      { text: "color", correct: false },
      { text: "background-color", correct: true },
      { text: "bg-color", correct: false },
      { text: "background", correct: false },
    ],
  },
  {
    question: "What does CSS stand for?",
    answers: [
      { text: "Creative Style Sheets", correct: false },
      { text: "Cascading Style Sheets", correct: true },
      { text: "Colorful Style Sheets", correct: false },
      { text: "Computer Style Sheets", correct: false },
    ],
  },
  {
    question:
      "Which HTML element is used to specify a footer for a document or section?",
    answers: [
      { text: "<footer>", correct: true },
      { text: "<bottom>", correct: false },
      { text: "<section>", correct: false },
      { text: "<footered>", correct: false },
    ],
  },
  {
    question: "Which CSS property controls the text size?",
    answers: [
      { text: "font-style", correct: false },
      { text: "text-style", correct: false },
      { text: "font-size", correct: true },
      { text: "text-size", correct: false },
    ],
  },
  {
    question: "Inside which HTML element do we put the JavaScript?",
    answers: [
      { text: "<script>", correct: true },
      { text: "<js>", correct: false },
      { text: "<javascript>", correct: false },
      { text: "<scripting>", correct: false },
    ],
  },
  {
    question: "How do you write 'Hello World' in an alert box?",
    answers: [
      { text: "msgBox('Hello World');", correct: false },
      { text: "alertBox('Hello World');", correct: false },
      { text: "msg('Hello World');", correct: false },
      { text: "alert('Hello World');", correct: true },
    ],
  },
  {
    question: "Which HTML attribute is used to define the internal stylesheet?",
    answers: [
      { text: "script", correct: false },
      { text: "inline", correct: false },
      { text: "type", correct: false },
      { text: "style", correct: true },
    ],
  },
  {
    question: "How can you make a list that lists the items with numbers?",
    answers: [
      { text: "<ul>", correct: false },
      { text: "<ol>", correct: true },
      { text: "<li>", correct: false },
      { text: "<list>", correct: false },
    ],
  },
];

const questionElement = document.querySelector(".question");
const answersElement = document.querySelector(".answers");
const nextElement = document.querySelector(".next");

let currentQuestionIndex = 0;

let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;

  score = 0;

  showQuestionAndAnswer();

  nextElement.innerHTML = "Next";
}

function resetState() {
  answersElement.innerHTML = "";

  nextElement.style.display = "none";
}

// displaying both the questions and the answers
function showQuestionAndAnswer() {
  resetState();
  // displaying the questions
  let currentQuestion = frontendQuiz[currentQuestionIndex];

  let questionNumber = currentQuestionIndex + 1;

  questionElement.innerHTML = `${questionNumber}. ${currentQuestion.question}`;

  // displaying the answer and clicking the answer
  currentQuestion.answers.forEach((answer) => {
    let answerBtn = document.createElement("button");

    answerBtn.innerText = answer.text;

    answerBtn.classList.add("btn");

    if (answer.correct) {
      answerBtn.dataset.correct = answer.correct;
    }

    answersElement.appendChild(answerBtn);

    answersElement.addEventListener("click", selectAnswer);
  });
}

// styling the answer btns whether correct or wrong when the btn is clicked
function selectAnswer(e) {
  e.stopPropagation();

  let btnClick = e.target;

  if (btnClick.tagName === "BUTTON") {
    let dataSetCorrect = btnClick.dataset.correct;

    if (dataSetCorrect === "true") {
      btnClick.classList.add("correct");

      score++;
    } else {
      btnClick.classList.add("wrong");
    }

    // Disable all buttons and show the correct answer
    Array.from(answersElement.children).forEach((btn) => {
      if (btn.dataset.correct === "true") {
        btn.classList.add("correct");
      }
      btn.disabled = true;
    });
  }

  nextElement.style.display = "block";

  nextElement.addEventListener("click", nextBtn);
}

function playAgain() {
  startQuiz();
}

function showScore() {
  resetState();
  questionElement.innerHTML = `you score ${score} out of ${frontendQuiz.length}`;

  nextElement.style.display = "block";

  nextElement.innerHTML = "play again";
}

function handleNextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex < frontendQuiz.length) {
    showQuestionAndAnswer();

    nextElement.style.display = "block";
  } else {
    showScore();
  }
}

function nextBtn() {
  if (currentQuestionIndex < frontendQuiz.length) {
    handleNextQuestion();
  } else {
    startQuiz();
  }
}

startQuiz();
