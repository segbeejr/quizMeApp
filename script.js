
const questions = [
    {
      question: 'Which of the following is a synonym for "exquisite"?',
      options: ["Beautiful", "Ordinary", "Ugly", "Plain"],
      answer: 0,
    },
    {
      question: 'Identify the sentence with correct subject-verb agreement:',
      options: ["The dog barks loudly in the morning.", "The dog bark loudly in the morning.", "The dogs barks loudly in the morning.", "The dogs bark loudly in the morning."],
      answer: 0,
    },
    {
      question: 'Select the correct form of the pronoun to complete the sentence: "_______ went to the store to buy groceries."',
      options: ["His", "Him", "He", "They"],
      answer: 2,
    },
    {
      question: 'Identify the sentence with correct capitalization:',
      options: ["she enjoys playing tennis.", "She enjoys playing tennis.", "She enjoys playing Tennis.", "She enjoys playing TENNIS."],
      answer: 1,
    },
    {
      question: 'Choose the correct form of the adjective to complete the sentence: "It was _______ day at the beach.',
      options: ["Sunny", "Sunnier", "Sunniest", "Sunnily"],
      answer: 0,
    },
    {
      question: 'Which of the following is an example of a compound sentence?',
      options: ["The cat sleeps on the couch.", "I like ice cream and cake.", "It was raining heavily outside.", "She danced gracefully."],
      answer: 1,
    },
    {
      question: 'Identify the correct spelling:',
      options: ["Accomodate", "Acommodate", "Accommodate", "Acomodate"],
      answer: 2,
    },
    {
      question: 'Choose the correct form of the verb to complete the sentence: "They _______ to the concert last night."',
      options: ["Go", "Goes", "Gone", "Went"],
      answer: 3,
    },
    {
      question: 'What is the comparative form of the adverb "quickly"?',
      options: ["Quicklier", "Quickliest", "More quickly", "Quick"],
      answer: 2,
    },
    {
      question: 'Identify the correct plural form of "mouse":',
      options: ["Mouses", "Mouse", "Mice", "Mices"],
      answer: 2,
    },
    {
      question: 'Choose the correct form of the pronoun to complete the sentence: "_______ is my favorite color."',
      options: ["They", "Them", "Their", "It"],
      answer: 3,
    },
    {
      question: 'Which of the following is a conjunction?',
      options: ["Quickly", "And", "Happy", "Jumped"],
      answer: 1,
    },
    {
      question: 'Identify the sentence with correct verb tense:',
      options: ["She will eat lunch tomorrow.", "She ate lunch tomorrow.", "She eats lunch tomorrow.", "She eating lunch tomorrow."],
      answer: 0,
    },
    {
      question: 'Choose the correct spelling:',
      options: ["Recieve", "Reiceve", "Receive", "Receve"],
      answer: 2,
    },
    {
      question: 'What is the superlative form of the adjective "good"?',
      options: ["Best", "Gooder", "Better", "Goodest"],
      answer: 0,
    },
    {
      question: 'Select the correct sentence that uses the subjunctive mood:',
      options: ["If I were rich, I would travel the world.", "If I was rich, I would travel the world.", "If I am rich, I will travel the world.", "If I be rich, I would travel the world."],
      answer: 0,
    },
    {
      question: 'Identify the correct homophone for the word "their":',
      options: ["There", "They're", "Thier", "Thare"],
      answer: 0,
    },
    {
      question: 'Which of the following sentences is written in passive voice?',
      options: ["She ate the cake.", "The cake was eaten by her.", "They will make dinner.", "The flowers are blooming."],
      answer: 1,
    },
    {
      question: 'Choose the correct comparative form of the adjective "tall":',
      options: ["Taller", "Talliest", "Tallerer", "Tallest"],
      answer: 0,
    },
    {
      question: 'Which word is the antonym of "generous"?',
      options: ["Kind", "Greedy", "Friendly", "Helpful"],
      answer: 0,
    },
];
  
  
  
 
let currentQuestionIndex = 0;
let score = 0;
let numCorrect = 0;
let numWrong = 0;
let percentComplete = 0;
let timerInterval;

function shuffleQuestions() {
    for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
    }
}

function displayQuestion() {
    const questionDiv = document.querySelector(".question-div");
    const answerDiv = document.querySelector(".answer-div");

    const currentQuestion = questions[currentQuestionIndex];

    questionDiv.textContent = currentQuestion.question;

    let optionsHTML = "";
    for (let i = 0; i < currentQuestion.options.length; i++) {
        optionsHTML += `
            <div class="option">
                <input type="radio" id="option${i}" name="option" value="${i}">
                <label for="option${i}">${currentQuestion.options[i]}</label>
            </div>
        `;
    }
    answerDiv.innerHTML = optionsHTML;
}

function handleAnswerSubmission() {
    const selectedOption = document.querySelector('input[name="option"]:checked');

    if (!selectedOption) {
        return;
    }

    const selectedOptionIndex = parseInt(selectedOption.value);
    const currentQuestion = questions[currentQuestionIndex];

    if (selectedOptionIndex === currentQuestion.answer) {
        score += 5;
        numCorrect++;
    } else {
        numWrong++;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        clearInterval(timerInterval);
        endGame();
    }
}

function updateScore() {
    const scoreElement = document.getElementById("score");
    scoreElement.textContent = `${score}pt`;
}

function updatePercentComplete() {
    percentComplete = (currentQuestionIndex / questions.length) * 100;
    const percentCompleteElement = document.getElementById("percentComplete");
    percentCompleteElement.textContent = `${percentComplete}%`;
}

function updateNumberCorrect() {
    const numberCorrectElement = document.getElementById("numberCorrect");
    numberCorrectElement.textContent = numCorrect;
}

function updateTotalQuestions() {
    const totalQuestionElement = document.getElementById("totalQuestion");
    totalQuestionElement.textContent = questions.length;
}

function updateWrongQuestions() {
    const wrongQuestionElement = document.getElementById("wrongQuestion");
    wrongQuestionElement.textContent = numWrong;
}

function endGame() {
    const congratsElement = document.querySelector(".congrats");
    const sorryElement = document.querySelector(".sorry");

    if (currentQuestionIndex === questions.length) {
        congratsElement.classList.remove("show");
        congratsElement.textContent = "Congratulations!";
        congratsElement.classList.add("show");
    } else {
        sorryElement.classList.remove("show");
        sorryElement.textContent = "Sorry!! Please try again";
        sorryElement.classList.add("show");
    }

    updateScore();

    setTimeout(() => {
        window.location.reload();
    }, 3000);
}

function startGame() {
    shuffleQuestions();
    displayQuestion();
    updateScore();
    updatePercentComplete();
    updateNumberCorrect();
    updateTotalQuestions();
    updateWrongQuestions();

    let secondsLeft = 360;
    const timerElement = document.getElementById("timer");

    function updateTimer() {
        const minutes = Math.floor(secondsLeft / 60);
        const seconds = secondsLeft % 60;
        timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;

        if (secondsLeft === 0) {
            clearInterval(timerInterval);
            endGame();
        } else {
            secondsLeft--;
        }
    }

    updateTimer();
    timerInterval = setInterval(updateTimer, 1000);
}

const submitButton = document.getElementById("submit-button");
submitButton.addEventListener("click", handleAnswerSubmission);

const restartButton = document.querySelector(".ri-restart-line");
restartButton.addEventListener("click", () => {
    window.location.reload();
});

window.addEventListener("load", startGame);
  