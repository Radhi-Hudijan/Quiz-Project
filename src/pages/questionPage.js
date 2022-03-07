'use strict';

import {
  ANSWERS_LIST_ID,
  NEXT_QUESTION_BUTTON_ID,
  USER_INTERFACE_ID,
} from '../constants.js';
import { createQuestionElement } from '../views/questionView.js';
import { createAnswerElement } from '../views/answerView.js';
import { quizData } from '../data.js';
export let newScore = 0;
let acceptingAnswers = false;


export const initQuestionPage = () => {
  const userInterface = document.getElementById(USER_INTERFACE_ID);
  userInterface.innerHTML = '';

  const currentQuestion = quizData.questions[quizData.currentQuestionIndex];

  //Creating the question HTML
  const questionElement = createQuestionElement(currentQuestion.text);

  userInterface.appendChild(questionElement);

  const answersListElement = document.getElementById(ANSWERS_LIST_ID);

  //Creating answer list and add Data key attribute
  for (const [key, answerText] of Object.entries(currentQuestion.answers)) {
    const answerElement = createAnswerElement(key, answerText);
    answerElement.setAttribute('data-key', key);
    answersListElement.appendChild(answerElement);
  }

  acceptingAnswers = true;
  // add click event to answer choices and select the correct one
  for (const option of answersListElement.children) {
    option.addEventListener('click', chooseAnswer);
  }

  function chooseAnswer() {
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
    .addEventListener('click', event => {
      if (!acceptingAnswers) {
        nextQuestion()
      } else { alert('ANSWER THE QUESTION') };
    });
};

const nextQuestion = () => {
  quizData.currentQuestionIndex++;

  initQuestionPage();
};

