'use strict';

import { ANSWERS_LIST_ID, MAX_QUESTIONS } from '../constants.js';
import { NEXT_QUESTION_BUTTON_ID } from '../constants.js';
import { quizData } from '../data.js';
import { counter } from '../pages/questionPage.js';

/**
 * Create a full question element
 * @returns {Element}*/
export const createQuestionElement = (question) => {
  const element = document.createElement('div');
  element.classList.add('flex-center', 'flex-column');
  // I use String.raw just to get fancy colors for the HTML in VS Code.
  element.innerHTML = String.raw`
  <div id="hud">
  <div id="hud-item">
    <p id="progressText" class="hud-prefix">
      Question 
    </p>
    <h3 class="hud-main-text">
    ${quizData.currentQuestionIndex + 1} / ${MAX_QUESTIONS}
    </h3>
    </div>
    <div id="hud-item">
    <p class="hud-prefix">
      Timer 
    </p>
    <h3 id="chronometer" class="hud-main-text">
    </h3>
    </div>
  <div id="hud-item">
    <p class="hud-prefix">
      Score
    </p>
    <h3 class="hud-main-text">
    0
    </h3>
  </div>
</div>

<h2 class="question-text">${question}</h2>

<ul id="${ANSWERS_LIST_ID}" class="choices-list">
</ul>

<button id="${NEXT_QUESTION_BUTTON_ID}" class="btn">
Next question
</button>
`;

  return element;
};
