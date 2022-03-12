'use strict';

import { START_QUIZ_BUTTON_ID } from '../constants.js';
import { newScore, counter } from '../pages/questionPage.js';

/**
 * Create the welcome screen
 * @returns {Element}
 */
export const createResultElement = () => {
  let sec = parseInt(counter % 60).toFixed(0);
  let min = parseInt(counter / 60).toFixed(0);
  if (sec < 10) {
    sec = `0${sec}`;
  }
  if (min < 10) {
    min = `0${min}`;
  }
  const element = document.createElement('div');
  element.classList.add('flex-center', 'flex-column');
  element.innerHTML = String.raw`
    <h1>Your score is ${newScore}!</h1>
    <h1>You've finished the quiz in ${min}:${sec}!</h1>
    <button id="${START_QUIZ_BUTTON_ID}" class="btn">Restart quiz</button>
  `;
  return element;
};
