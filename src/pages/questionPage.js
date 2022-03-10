'use strict';

import {
  ANSWERS_LIST_ID,
  NEXT_QUESTION_BUTTON_ID,
  USER_INTERFACE_ID,
  MAX_QUESTIONS,
} from '../constants.js';
import { createQuestionElement } from '../views/questionView.js';
import { createAnswerElement } from '../views/answerView.js';
import { quizData } from '../data.js';
export let newScore = 0;
let acceptingAnswers = false;

let questionElement;
export let counter = 0;
let timerInterval;
let counterInterval;
export const initQuestionPage = () => {
  const userInterface = document.getElementById(USER_INTERFACE_ID);
  userInterface.innerHTML = '';
  const currentQuestion = quizData.questions[quizData.currentQuestionIndex];

  //Creating the question HTML
  questionElement = createQuestionElement(currentQuestion.text);

  userInterface.appendChild(questionElement);

  const answersListElement = document.getElementById(ANSWERS_LIST_ID);

  //Creating answer list and add Data key attribute
  for (const [key, answerText] of Object.entries(currentQuestion.answers)) {
    const answerElement = createAnswerElement(key, answerText);
    answerElement.setAttribute('data-key', key);
    answersListElement.appendChild(answerElement);
  }

  //Update the progress bar
  const progressBarFull = document.getElementById('progressBarFull');
  const progressBarIndicator = quizData.currentQuestionIndex + 1;
  progressBarFull.style.width = `${(progressBarIndicator / MAX_QUESTIONS) * 100
    }%`;

  acceptingAnswers = true;
  // add click event to answer choices and select the correct one
  for (const option of answersListElement.children) {
    option.addEventListener('click', chooseAnswer);
  }

  function chooseAnswer() {
    //STOP TIMER after answering last question
    isLastAnswer();
    //STOP TIMER
    // check if the question already loaded
    if (!acceptingAnswers) return;
    acceptingAnswers = false;

    currentQuestion.selected = this.dataset.key;

    // set the correct and incorrect class to the answer selection
    const classToApply =
      currentQuestion.selected === currentQuestion.correct
        ? 'correct'
        : 'incorrect';

    if (classToApply === `correct`) newScore++;

    if (currentQuestion.selected == currentQuestion.correct) {
      this.classList.add(classToApply);
    } else {
      this.classList.add(classToApply);
      const correctAnswer = document.querySelector(
        `li[data-key="${currentQuestion.correct}"]`
      );
      correctAnswer.classList.add('correct-answer');
    }
  }

  // Next question button
  document
    .getElementById(NEXT_QUESTION_BUTTON_ID)
    .addEventListener('click', (event) => {
      if (!acceptingAnswers) {
        nextQuestion();
      } else {
        alert('PLEASE SELECT AN ANSWER');
      }
    });
  // TIMER INTERVALS
  timerInterval = setInterval(updateTimer, 50);
  counterInterval = setInterval(function () {
    counter++;
  }, 1000);
};

// ***************** UPDATE TIMER
export const updateTimer = () => {
  let sec = parseInt(counter % 60).toFixed(0);
  let min = parseInt(counter / 60).toFixed(0);
  if (sec < 10) {
    sec = `0${sec}`;
  }
  if (min < 10) {
    min = `0${min}`;
  }
  questionElement
    ? (questionElement.querySelector(
      '#chronometer'
    ).textContent = `${min}:${sec}`)
    : '';
};

const nextQuestion = () => {
  quizData.currentQuestionIndex = quizData.currentQuestionIndex + 1;
  initQuestionPage();
};

// CHECK IF IT IS LAST QUESTION THEN STOP TIMER WORKING
const isLastAnswer = () => {
  if (quizData.currentQuestionIndex == MAX_QUESTIONS - 1) {
    clearInterval(timerInterval);
    clearInterval(counterInterval);
  }
};
