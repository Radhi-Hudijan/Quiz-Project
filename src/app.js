'use strict';

import { quizData } from './data.js';
import { initQuestionPage, newScore} from './pages/questionPage.js';
import { initWelcomePage } from './pages/welcomePage.js';
const localStorageObj =  JSON.parse(window.localStorage.getItem('saveToLocal'));
const loadApp = () => {
  reloadSamePage();
  reloadScore();
  
};

window.addEventListener('load', loadApp);

const reloadSamePage = () => {
  if (localStorageObj.questionIndex > 0 && localStorageObj.questionIndex < 10) {
    quizData.currentQuestionIndex = localStorageObj.questionIndex;
    initQuestionPage();
  } else {
    quizData.currentQuestionIndex = 0;
  initWelcomePage();}
}

const reloadScore = () => {
  if (localStorageObj.localScore > 0) { 
    newScore = localStorageObj.localScore;
  }
}

