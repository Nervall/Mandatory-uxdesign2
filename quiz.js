const main = document.querySelector('main');
const navIcon = document.querySelector('.quiz__header--icon');

let quizData = {
  rightAnswer: [],
  question: [],
  category: [],
}

let stats = {
  gamesPlayed: [0],
  correctAnswers: [0],
  incorrectAnswers: [0],
  correctPercentage: 0
};

function getSum(total, num) {
  return total + num;
}

/* ========== START GAME ========== */
function startGame() {
  const startButton = document.createElement('button');
  setNavToTabIndex1();
  navIcon.focus();
  navIcon.addEventListener('keydown', (e) => {
    if (e.keyCode === 13 || e.keyCode === 32) {
      openNav();
    }
  });
  startButton.setAttribute('class', 'quiz-startbutton');
  startButton.setAttribute('tabindex', '0');
  startButton.textContent = 'Start Quiz';
  main.appendChild(startButton);
  startButton.addEventListener('click', function() {
  getData();
  });
}

/* ========== GET DATA FROM API ========== */
function getData() {
  axios.get("https://opentdb.com/api.php?amount=10&type=multiple")
    .then(function (response) {
      let data = response.data.results;
      return data;
    })
    .catch(function (error) {
      alert('Something went wrong with the network. Please try again in a little while.')
      console.log(error);
    })
    .then(function (data) {
      randomize(data);
    });
}
 
/* ========== RANDOMIZE QUESTION ========== */
function randomize(data) {
  let answerArr = [];
  let dataArr = [];
  for (let que of data) {
    answerArr = que.incorrect_answers;
    answerArr.push(que.correct_answer);
    answerArr.sort(() => Math.random() - 0.5);
    quizData.question.push(que.question);
    quizData.category.push(que.category);
    quizData.rightAnswer.push(que.correct_answer);
    dataArr.push(answerArr);
  }  
  quiz(dataArr)
}

function getHtml(input) {
  const parser = new DOMParser().parseFromString(input, 'text/html');
  return parser.documentElement.textContent;
}

/* ========== RENDER QUIZ ========== */
function quiz(dataArr) {
  main.innerHTML = ''; 
  const number = 1;
  stats.gamesPlayed.push(number);
  navIcon.focus();
  console.log(quizData.rightAnswer);
  let quizNumber = 1;
  let count = 0
  const mainWrap = document.createElement('div');
  for (let i = 0; i < dataArr.length; i++) {
    mainWrap.setAttribute('class', 'quiz-main-wrapper');
    const questionWrap = document.createElement('div');
    questionWrap.setAttribute('class', 'quiz-question-wrapper')
    const questionNumber = document.createElement('h2');
    questionNumber.setAttribute('class', 'quiz-main__question');
    questionNumber.textContent = 'Question ' + quizNumber; 
    questionNumber.setAttribute('tabindex', '0');
    const category = document.createElement('p');
    category.setAttribute('class', 'quiz-main__category');
    category.textContent = 'Category: ' + getHtml(quizData.category[count]);
    const question = document.createElement('p');
    question.setAttribute('class', 'quiz-main__question');
    question.setAttribute('tabindex', '0');
    question.textContent = getHtml(quizData.question[count]);
    

    const questionDiv1 = document.createElement('div');
    const radioLabel1 = document.createElement('label');
    const radioInput1 = document.createElement('input');
    const radioSpan1 = document.createElement('span');
    radioLabel1.setAttribute('class', 'mds-radio');
    radioLabel1.textContent = getHtml(dataArr[i][0]);
    radioInput1.setAttribute('type', 'radio');
    radioInput1.setAttribute('class', 'mds-radio__input');
    radioInput1.setAttribute('name', 'quiz'+ quizNumber);
    radioInput1.setAttribute('value', dataArr[i][0]);
    radioSpan1.setAttribute('class', 'mds-radio__span');

    const questionDiv2 = document.createElement('div');
    const radioLabel2 = document.createElement('label');
    const radioInput2 = document.createElement('input');
    const radioSpan2 = document.createElement('span');
    radioLabel2.setAttribute('class', 'mds-radio');
    radioLabel2.textContent = getHtml(dataArr[i][1]);
    radioInput2.setAttribute('type', 'radio');
    radioInput2.setAttribute('class', 'mds-radio__input');
    radioInput2.setAttribute('name', 'quiz'+ quizNumber);
    radioInput2.setAttribute('value', dataArr[i][1]);
    radioSpan2.setAttribute('class', 'mds-radio__span');

    const questionDiv3 = document.createElement('div');
    const radioLabel3 = document.createElement('label');
    const radioInput3 = document.createElement('input');
    const radioSpan3 = document.createElement('span');
    radioLabel3.setAttribute('class', 'mds-radio');
    radioLabel3.textContent = getHtml(dataArr[i][2]);
    radioInput3.setAttribute('type', 'radio');
    radioInput3.setAttribute('class', 'mds-radio__input');
    radioInput3.setAttribute('name', 'quiz'+ quizNumber);
    radioInput3.setAttribute('value', dataArr[i][2]);
    radioSpan3.setAttribute('class', 'mds-radio__span');

    const questionDiv4 = document.createElement('div');
    const radioLabel4 = document.createElement('label');
    const radioInput4 = document.createElement('input');
    const radioSpan4 = document.createElement('span');
    radioLabel4.setAttribute('class', 'mds-radio');
    radioLabel4.textContent = getHtml(dataArr[i][3]);
    radioInput4.setAttribute('type', 'radio');
    radioInput4.setAttribute('class', 'mds-radio__input');
    radioInput4.setAttribute('name', 'quiz'+ quizNumber);
    radioInput4.setAttribute('value', dataArr[i][3]);
    radioSpan4.setAttribute('class', 'mds-radio__span');

    main.appendChild(mainWrap);
    
    mainWrap.appendChild(questionWrap);
    questionWrap.appendChild(questionNumber);
    questionWrap.appendChild(category);
    questionWrap.appendChild(question);

    questionWrap.appendChild(questionDiv1);
    questionDiv1.appendChild(radioLabel1);
    radioLabel1.appendChild(radioInput1);
    radioLabel1.appendChild(radioSpan1);

    questionWrap.appendChild(questionDiv2);
    questionDiv2.appendChild(radioLabel2);
    radioLabel2.appendChild(radioInput2);
    radioLabel2.appendChild(radioSpan2);

    questionWrap.appendChild(questionDiv3);
    questionDiv3.appendChild(radioLabel3);
    radioLabel3.appendChild(radioInput3);
    radioLabel3.appendChild(radioSpan3);

    questionWrap.appendChild(questionDiv4);
    questionDiv4.appendChild(radioLabel4);
    radioLabel4.appendChild(radioInput4);
    radioLabel4.appendChild(radioSpan4);

    count ++;
    quizNumber ++;
  }
  const wrapperEndButton = document.createElement('div');
  const quizEndButton = document.createElement('button');
  wrapperEndButton.setAttribute('class', 'quiz-main__button-wrapper');
  quizEndButton.textContent = 'Submit Quiz';
  quizEndButton.setAttribute('class', 'quiz-endbutton');
  quizEndButton.setAttribute('tabindex', '0');
  quizEndButton.addEventListener('click', function() {
    checkAnswer();
  });
  mainWrap.appendChild(wrapperEndButton);
  wrapperEndButton.appendChild(quizEndButton);
  quizNumber = 1;
}
    
/* ========== CHECK ANSWER ========== */
function checkAnswer() {
  let inputs = []
  let answerResult = 0;
  let answerArray = [];
  let radio = document.querySelectorAll('input');
  for (let i = 0; i < radio.length; i++) {
    if (radio[i].checked === true) {
      inputs.push(radio[i].checked);
      answerArray.push(radio[i].value);
    }
  } 
  if (inputs.length < 10) {
    openModalAnswer();    
  } else {
    for (let i = 0; i < answerArray.length; i++) { 
      //console.log(answerArray[i]);
      //console.log(quizData.rightAnswer[i]);
      if (answerArray[i] === quizData.rightAnswer[i]) {
        answerResult ++;
      }
    }
  stats.correctAnswers.push(answerResult);
  let answerWrong = 10 - answerResult;
  stats.incorrectAnswers.push(answerWrong);
  openModalGreat(answerResult);
  }
}

/* ========== MODAL DIALOG ========== */
const modalContent = document.querySelector('.modal-content');
const modalHeader = document.querySelector('.modal-header')
const modalfooter = document.querySelector('.modal-footer');
const modal = document.querySelector('.quiz-background');
const modalButtonClose = document.createElement('button');
modalButtonClose.setAttribute('class', 'modal-button modal-button__close');
modalButtonClose.textContent = 'Close';
const modalButtonNew = document.createElement('button');
modalButtonNew.setAttribute('class', 'modal-button modal-button__new');
modalButtonNew.textContent = 'New Game';

function openModalGreat(answerResult) {
  modalContent.innerHTML = '';
  modalfooter.innerHTML = '';
  const p = document.createElement('p');
  const pHeader = document.createElement('p');
  p.setAttribute('tabindex', '0');
  pHeader.setAttribute('tabindex', '0');
  pHeader.setAttribute('class', 'modal-header__title');
  modalButtonClose.setAttribute('class', 'modal-button modal-button__close');
  closeAllTabIndex(); 
  modal.style.display = "block";
  pHeader.textContent = 'Good Work!'
  p.textContent = 'You answered '+ answerResult +'/10 correct';
  modalHeader.appendChild(pHeader);
  modalContent.appendChild(p);
  modalfooter.appendChild(modalButtonClose);
  modalfooter.appendChild(modalButtonNew); 
  modalButtonNew.addEventListener('click', function() {
    main.innerHTML = '';
    modal.style.display = "none";
    modalHeader.innerHTML = '';
    modalContent.innerHTML = ''; 
    modalfooter.innerHTML = '';
    emptyArrays();
    emptyQuizData();
    getData();
  });
  modalButtonClose.addEventListener('click', function() {
    modal.style.display = "none";
    modalHeader.innerHTML = '';
    modalContent.innerHTML = ''; 
    modalfooter.innerHTML = '';
  });
}

function openModalAnswer() {
  modalContent.innerHTML = '';
  const p = document.createElement('p');
  const pHeader = document.createElement('p');
  p.setAttribute('tabindex', '0');
  pHeader.setAttribute('tabindex', '0');
  pHeader.setAttribute('class', 'modal-header__title');
  closeAllTabIndex(); 
  modal.style.display = "block";
  modalButtonClose.focus();
  pHeader.textContent = 'Not Finished!';
  p.textContent = 'You need to answer all questions.'
  modalHeader.appendChild(pHeader);
  modalContent.appendChild(p);
  modalfooter.appendChild(modalButtonClose);
  modalButtonClose.removeAttribute('class', 'modal-button__close');
  modalButtonClose.setAttribute('class','modal-button modal-button__close--singel');
  window.addEventListener('click', function(event) {
    if (event.target === modal) {
      modal.style.display = "none";
      modalButtonClose.removeAttribute('class', 'modal-button__close--singel');
      openAllTabIndex();
      modalHeader.innerHTML = '';
      modalContent.innerHTML = ''; 
      modalfooter.innerHTML = '';
    }
  });
  modalButtonClose.onclick = function() {
    modal.style.display = "none";
    openAllTabIndex();
    modalHeader.innerHTML = '';
    modalContent.innerHTML = ''; 
    modalfooter.innerHTML = '';
  }
}

/* ========== EMPTY ARRAYS ========== */
function emptyArrays() {
  inputs = []
  answerResult = 0;
  answerArray = [];
  rightAnswer = [];
}

function emptyQuizData() {
  quizData.rightAnswer = [];
  quizData.question = [];
  quizData.category = [];
}

/* ========== MODIFYING TABINDEX ========== */
function closeAllTabIndex() {
  const allBackgroundElements = document.querySelectorAll('[tabindex="0"]');
  for (const element of allBackgroundElements) {
    element.setAttribute('tabindex', "-1");
  }
}

function openAllTabIndex() {
  const allBackgroundElements = document.querySelectorAll('[tabindex="-1"]');
  for (const element of allBackgroundElements) {
     element.setAttribute('tabindex', "0");
  }
}

/* ========== NAVIGATION ========== */
const mySideNav = document.querySelector("#mySidenav");
const quizLink = document.querySelector('.quiz__link--quiz');
const quizStats = document.querySelector('.quiz__link--stats');
const quizAbout = document.querySelector('.quiz__link--about');
const quizTitle = document.querySelector('.quiz-sidenav__header');
const sidenavBackground = document.querySelector('.quiz-sidenav-background');

function setNavToTabIndex1() {
  quizLink.setAttribute('tabindex', '-1');
  quizStats.setAttribute('tabindex', '-1');
  quizAbout.setAttribute('tabindex', '-1');
  quizTitle.setAttribute('tabindex', '-1');
}

function openNav() {  
  mySideNav.style.width = "320px";
  sidenavBackground.style.display = "block";
  closeAllTabIndex();
  document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
  document.body.style.zIndex = "2";
  quizTitle.setAttribute('tabindex', '0');
  quizLink.setAttribute('tabindex', '0');
  quizStats.setAttribute('tabindex', '0');
  quizAbout.setAttribute('tabindex', '0');
  quizTitle.focus();
}

window.onclick = function(event) {
  if (event.target === sidenavBackground || event.target === mySideNav) {
    mySideNav.style.width = "0";
    document.body.style.backgroundColor = "white";
    document.body.style.zIndex = "0";
    sidenavBackground.style.display = "none";
    setNavToTabIndex1();
    openAllTabIndex();
  }
}

function closeNav() {
  const mySideNav = document.querySelector("#mySidenav");
  mySideNav.style.width = "0";
  document.body.style.backgroundColor = "white";
  document.body.style.zIndex = "0";
  sidenavBackground.style.display = "none";
  setNavToTabIndex1();
  openAllTabIndex();
}

function sideNav() {
  quizLink.addEventListener('click', function() { 
    main.innerHTML = '';
    closeNav();
    getData();
    emptyQuizData();
    emptyArrays();
  });
  quizStats.addEventListener('click', function() { 
    closeNav();
    emptyQuizData();
    emptyArrays();
    showStats();
  });
  quizAbout.addEventListener('click', function() { 
    closeNav();
    emptyQuizData();
    emptyArrays();
    showAbout();
  });
}

/* ========== SHOW STATS ========== */
function showStats() {
  main.innerHTML = '';
  navIcon.focus();
  const h2 = document.createElement('h2');
  h2.setAttribute('class', 'quiz-stats__title')
  h2.setAttribute('tabindex', '0');
  h2.textContent = 'Stats';
  const gp = document.createElement('p');
  gp.setAttribute('class', 'quiz-stats__heading');
  gp.setAttribute('tabindex', '0');
  const gpCount = document.createElement('p');
  gpCount.setAttribute('class', 'quiz-stats__numbers');
  gpCount.setAttribute('tabindex', '0');
  gp.textContent = 'Games played' 
  gpCount.textContent = stats.gamesPlayed.reduce(getSum);
  const ca = document.createElement('p');
  ca.setAttribute('class', 'quiz-stats__heading');
  ca.setAttribute('tabindex', '0');
  const caCount = document.createElement('p');
  caCount.setAttribute('class', 'quiz-stats__numbers');
  caCount.setAttribute('tabindex', '0');
  ca.innerHTML = 'Correct Answers' 
  caCount.textContent = stats.correctAnswers.reduce(getSum);
  const ia = document.createElement('p');
  ia.setAttribute('class', 'quiz-stats__heading');
  ia.setAttribute('tabindex', '0');
  const iaCount = document.createElement('p');
  iaCount.setAttribute('class', 'quiz-stats__numbers');
  iaCount.setAttribute('tabindex', '0');
  ia.textContent = 'Incorrect Answers' 
  iaCount.textContent = stats.incorrectAnswers.reduce(getSum);
  const cp = document.createElement('p');
  cp.setAttribute('class', 'quiz-stats__heading');
  cp.setAttribute('tabindex', '0');
  const cpCount = document.createElement('p');
  cpCount.setAttribute('tabindex', '0');
  cpCount.setAttribute('class', 'quiz-stats__numbers');
  let sum = stats.correctAnswers.reduce(getSum) + stats.incorrectAnswers.reduce(getSum);
  if (sum === 0) {
    cp.textContent = 'Correct percentage';
    cpCount.textContent = sum + ' %';
  } else {
    let percent = (stats.correctAnswers.reduce(getSum) / sum) * 100;
    stats.correctPercentage = Math.floor(percent);
    cp.textContent = 'Correct percentage';
    cpCount.textContent = stats.correctPercentage + ' %'; 
  }
  main.appendChild(h2);
  main.appendChild(gp);
  main.appendChild(gpCount);
  main.appendChild(ca);
  main.appendChild(caCount);
  main.appendChild(ia);
  main.appendChild(iaCount);
  main.appendChild(cp);
  main.appendChild(cpCount);
}

/* ========== SHOW ABOUT ========== */
function showAbout() {
  main.innerHTML = '';
  navIcon.focus();
  const h2 = document.createElement('h2');
  h2.setAttribute('class', 'quiz-about__title');
  h2.setAttribute('tabindex', '0');
  h2.textContent = 'About this quiz';
  const p = document.createElement('p');
  p.setAttribute('class', 'quiz-about__text')
  p.setAttribute('tabindex', '0');
  p.innerHTML = 'This application is made to work for people who needs screenreader, ' +
   'and for advanced users who prefer to only use the keyboard. The questions is from the api "Open Trivia Database". ' +
   'I hope you enjoy the quiz. <br><br> <span class="quiz-about__name">- Jim Nervall, Frontend Developer.<span>';
  main.appendChild(h2);
  main.appendChild(p);
}

sideNav();
startGame();


