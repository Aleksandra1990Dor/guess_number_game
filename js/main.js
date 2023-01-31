let num = Math.floor(Math.random() * 100) + 1;

const button = document.getElementById('submit');
const result = document.getElementById('result');
const guessCounter = document.getElementById('guess-counter');
const advice = document.getElementById('advice');
const reset = document.getElementById('reset');
const input = document.getElementById('guess');
const results = document.querySelectorAll('.game__results p');
let getNum;
let previousNum = '';
let counter = 1;
input.focus();
function reload() {
  location.reload();
  return false;
}
function gameOver() {
  button.disabled = true;
  reset.className = 'reset-loose btn';
  input.disabled = true;
  previousNum = '';
  counter = 1;
  advice.textContent = 'Игра окончена!';
}
function resetGame() {
  button.disabled = false;
  input.disabled = false;
  reset.className = 'game__btn_hidden ';
  for (let i = 0; i < results.length; i++) {
    results[i].className = '';
    results[i].textContent = '';
    results[i].innerHTML = '';
  }
  num = Math.floor(Math.random() * 100) + 1;
  input.focus();
}

function checkNumber() {
  event.preventDefault();
  getNum = Number(input.value);

  previousNum += getNum + ' ';
  guessCounter.innerHTML = `Вы вводили: <b>${previousNum}</b>`;
  if (getNum === num) {
    result.className = 'success';
    result.textContent = 'Поздравляю, вы справились с задачей!';
    gameOver();
  } else if (counter === 10) {
    result.textContent = 'Вы проиграли...';
    result.className = 'loose';
    gameOver();
  } else {
    counter++;
    result.className = 'failed';
    result.textContent = 'Не угадали... :( Попробуйте еще раз.';
    if (getNum < num) {
      advice.innerHTML = 'Ваше число <b>меньше</b> загаданного';
    } else {
      advice.innerHTML = 'Ваше число <b>больше</b> загаданного';
    }
  }
  input.value = '';

  input.focus();
}

button.addEventListener('click', checkNumber);
reset.addEventListener('click', resetGame);
