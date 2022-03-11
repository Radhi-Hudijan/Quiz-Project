'use strict';

// import { newScore} from './pages/questionPage.js';
import { START_QUIZ_BUTTON_ID } from '../constants.js';
import { HIGH_SCORE_BUTTON_ID } from '../constants.js';
import { newScore } from '../pages/questionPage.js';
/**
 * Create the welcome screen
 * @returns {Element}
 */
export const createResultElement = () => {
  const element = document.createElement('div');
  element.classList.add('flex-center', 'flex-column');
  element.innerHTML = String.raw`
    <h1>Your point is ${newScore}</h1>
    <button id="${START_QUIZ_BUTTON_ID}" class="btn">Restart quiz</button>
    <button id="${HIGH_SCORE_BUTTON_ID}" class="btn">High Scores</button>
  `;
  return element;
};
