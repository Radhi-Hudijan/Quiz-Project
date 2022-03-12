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
import { writeToLocal, getFromLocal, writeToLocalTimer, getFromLocalTimer, writeToLocalAnswer, getFromLocalAnswer, writeToLocalAnswerable, getFromLocalAnswerable } from '../localStorageService.js';

const myStorage = getFromLocal();
export let newScore = myStorage.newScore;
export let currentIndex = myStorage.questionIndex;

export let counter = getFromLocalTimer();


let acceptingAnswers = getFromLocalAnswerable(); //We must get this value from local storage

let questionElement;

let timerInterval;
let counterInterval;


export const initQuestionPage = () => {
  const userInterface = document.getElementById(USER_INTERFACE_ID);
  userInterface.innerHTML = '';

  const currentQuestion = quizData.questions[currentIndex];

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
  const progressBarIndicator = currentIndex + 1;
  progressBarFull.style.width = `${(progressBarIndicator / MAX_QUESTIONS) * 100}%`;

  // acceptingAnswers = true;
  // writeToLocalAnswerable(acceptingAnswers);

  // acceptingAnswers = true;
  // add click event to answer choices and select the correct one
  for (const option of answersListElement.children) {
    const localAnswers = getFromLocalAnswer();
    acceptingAnswers = getFromLocalAnswerable();
    option.addEventListener('click', function () {
      if (!acceptingAnswers) {
        currentQuestion.selected = localAnswers[currentIndex];
        const classToApply =
          currentQuestion.selected === currentQuestion.correct
            ? 'correct'
            : 'incorrect';
        if (currentQuestion.selected == currentQuestion.correct) {
          this.classList.add(classToApply);
        } else {
          this.classList.add(classToApply);
          const correctAnswer = document.querySelector(
            `li[data-key="${currentQuestion.correct}"]`
          );
          correctAnswer.classList.add('correct-answer');
        }
      } else {

        //Stop timer answering last question
        isLastAnswer();

        // check if the question already loaded
        acceptingAnswers = false;
        writeToLocalAnswerable(acceptingAnswers);
        console.log(this);
        const answer = this.dataset.key;
        currentQuestion.selected = answer;
        writeToLocalAnswer(currentIndex, answer)

        // set the correct and incorrect class to the answer selection
        const classToApply =
          currentQuestion.selected === currentQuestion.correct
            ? 'correct'
            : 'incorrect';

        if (classToApply === `correct`) newScore++;
        // set the correct and incorrect class to the answer selection
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
    });
  }

  // function chooseAnswer() {

  // }

  // Next question button 
  document
    .getElementById(NEXT_QUESTION_BUTTON_ID)
    .addEventListener('click', (event) => {
      if (!acceptingAnswers) {
        nextQuestion();
        acceptingAnswers = true;
        writeToLocalAnswerable(acceptingAnswers);
      } else {
        alert('PLEASE SELECT AN ANSWER');
      }
    });
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
  currentIndex++;
  writeToLocal(newScore, currentIndex);
  initQuestionPage();
};

// CHECK IF IT IS LAST QUESTION THEN STOP TIMER WORKING
const isLastAnswer = () => {
  if (currentIndex == MAX_QUESTIONS - 1) {
    clearInterval(timerInterval);
    clearInterval(counterInterval);
  }
};
// Call interval method
export const setUpQuizIntervals = () => {
  // TIMER INTERVALS
  timerInterval = setInterval(updateTimer, 50);
  counterInterval = setInterval(function () {
    counter++;
    writeToLocalTimer(counter);
  }, 1000);
}

