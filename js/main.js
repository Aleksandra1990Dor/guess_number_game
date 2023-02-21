let num = Math.floor(Math.random() * 100) + 1;
const button = document.getElementById('submit');
const result = document.getElementById('result');
const guessCounter = document.getElementById('guess-counter');
const advice = document.getElementById('advice');
const reset = document.getElementById('reset');
const input = document.getElementById('guess');
const results = document.querySelectorAll('.game__results p');
const congrats = document.querySelector('.congrats_animation');
let getNum;
let previousNum = '';
let counter = 1;
input.focus();
function gameOver() {
  button.disabled = true;
  reset.className = 'reset-loose btn';
  input.disabled = true;
  previousNum = '';
  counter = 1;
  advice.textContent = 'Игра окончена!';
  return false;
}
function resetGame() {
  button.disabled = false;
  input.disabled = false;
  reset.className = 'game__btn_hidden ';
  congrats.className = 'congrats';
  document.querySelector('body').style.backgroundColor = '';
  for (let i = 0; i < results.length; i++) {
    results[i].className = '';
    results[i].textContent = '';
    results[i].innerHTML = '';
  }
  num = Math.floor(Math.random() * 100) + 1;
  input.focus();
}
function warning(textContent) {
  advice.textContent = textContent;
  advice.style.color = 'red';
  advice.className = 'warning';
  setTimeout(() => {
    advice.className = '';
  }, 500);
  input.value = '';
  input.focus();
}
function checkNumber(event) {
  event.preventDefault();
  getNum = Number(input.value);
  if (!Number.isInteger(getNum)) {
    warning('Ваше число должно быть целым!');
    return false;
  }
  if (Number.isInteger(getNum) && (getNum <= 0 || getNum > 100)) {
    warning('Ваше число должно быть от 1 до 100!');
    return false;
  }
  advice.style.color = '';
  previousNum += getNum + ' ';
  guessCounter.innerHTML = `Вы вводили: <b>${previousNum}</b>`;
  if (getNum === num) {
    document.querySelector('body').style.overflow = 'hidden';
    congrats.className = 'game__congrats';
    result.className = 'success';
    setTimeout(() => {
      document.querySelector('body').style.overflow = '';
    }, 500);
    document.querySelector('body').style.backgroundColor = 'lightgreen';
    result.textContent = 'Поздравляю, вы справились с задачей!';
    gameOver();
  } else if (counter === 10) {
    result.textContent = 'Вы проиграли...';
    result.className = 'loose';
    document.querySelector('body').style.backgroundColor = 'gray';
    gameOver();
  } else {
    counter++;
    result.className = 'failed failed_animated';
    result.textContent = 'Не угадали... :( Попробуйте еще раз.';
    counter < 9
      ? setTimeout(() => {
          result.className = 'failed';
        }, 500)
      : false;

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
