'use strict';

import { quizData } from './data.js';
import { initQuestionPage, reloadScore} from './pages/questionPage.js';
import { initWelcomePage } from './pages/welcomePage.js';
export const localStorageObj =  JSON.parse(window.localStorage.getItem('saveToLocal'));
const loadApp = () => {
  if (localStorageObj) {
    reloadSamePage(); 
  } else {
    initWelcomePage();
  }
};

window.addEventListener('load', loadApp);

const reloadSamePage = () => { 
  if (localStorageObj.questionIndex > 0 && localStorageObj.questionIndex < 10) {
    quizData.currentQuestionIndex = localStorageObj.questionIndex;
    reloadScore();
    initQuestionPage();
  } else {
    quizData.currentQuestionIndex = 0;
    initWelcomePage();}
}



