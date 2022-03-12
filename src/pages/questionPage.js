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
import { writeToLocal, getFromLocal, writeToLocalTimer, getFromLocalTimer, writeToLocalAnswer, getFromLocalAnswer, writeToLocalIsAnswered, getFromLocalIsAnswered } from '../localStorageService.js';
import { initResultPage } from './resultPage.js';
let myStorage;
export let newScore;
export let counter;

let questionElement;

let timerInterval;
let counterInterval;
export let currentIndex;

export const initQuestionPage = () => {
  // Reading values from local storage
  myStorage = getFromLocal();
  newScore = myStorage.newScore;
  currentIndex = myStorage.questionIndex;
  counter = getFromLocalTimer();

  // Selecting user interface
  const userInterface = document.getElementById(USER_INTERFACE_ID);
  userInterface.innerHTML = '';
  const currentQuestion = quizData.questions[currentIndex];

  //Getting the question text
  questionElement = createQuestionElement(currentQuestion.text);
  userInterface.appendChild(questionElement);

  // Selecting the answer list
  const answersListElement = document.getElementById(ANSWERS_LIST_ID);

  //Creating answer list and add Data key attribute
  for (const [key, answerText] of Object.entries(currentQuestion.answers)) {
    const answerElement = createAnswerElement(key, answerText);
    answerElement.setAttribute('data-key', key);
    answersListElement.appendChild(answerElement);
  }

  //Selecting the progress bar
  const progressBarFull = document.getElementById('progressBarFull');
  const progressBarIndicator = currentIndex + 1;
  progressBarFull.style.width = `${(progressBarIndicator / MAX_QUESTIONS) * 100}%`;

  // add click event to answer choices and select the correct one
  if (getFromLocalIsAnswered()) {
    const localAnswer = getFromLocalAnswer()[currentIndex];

    answersListElement.children[selectedAnswerToIndex(localAnswer)].addEventListener('click', chooseAnswer);
    writeToLocalIsAnswered(false);
    answersListElement.children[selectedAnswerToIndex(localAnswer)].click();

  } else {
    for (const option of answersListElement.children) {
      option.addEventListener('click', chooseAnswer);
    }
  }

  function chooseAnswer() {
    //STOP TIMER after answering last question
    isLastAnswer();

    // check if the question already loaded
    if (getFromLocalIsAnswered()) return;

    const answer = this.dataset.key;
    currentQuestion.selected = answer;
    writeToLocalAnswer(currentIndex, answer)
    writeToLocalIsAnswered(true);

    // Style the answer, add the class to the li
    const classToApply =
      currentQuestion.selected === currentQuestion.correct
        ? 'correct'
        : 'incorrect';

    // set the correct and incorrect class to the answer selection
    if (currentQuestion.selected == currentQuestion.correct) {
      this.classList.add(classToApply);
      newScore += 10;
    } else {
      // this wrong answer
      this.classList.add(classToApply);
      // show the correct answers
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
      if (getFromLocalIsAnswered()) {
        writeToLocalIsAnswered(false);
        nextQuestion();

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
  if (currentIndex < 10) {
    writeToLocal(newScore, currentIndex);
    initQuestionPage();
  }
  else {
    initResultPage();
  }
};

// CHECK IF IT IS LAST QUESTION THEN STOP TIMER WORKING
const isLastAnswer = () => {
  if (currentIndex == MAX_QUESTIONS - 1) {
    clearInterval(timerInterval);
    clearInterval(counterInterval);
    writeToLocalTimer(0);
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

// answer as a b c d to 0 1 2 3 indexes
const selectedAnswerToIndex = (answer) => {
  return answer === 'a' ? 0 : answer === 'b' ? 1 : answer === 'c' ? 2 : 3;
}