var textEl = document.getElementById('text');
var inputEl = document.getElementById('input');
var startBtn = document.getElementById('start-btn');
var timeLeftEl = document.getElementById('time-left');
var scoreEl = document.getElementById('score-value');
var timerId;

// テキストデータ
var textData = [
  '生麦生米生卵',
  '隣の客はよく柿食う客だ',
  '坊主が上手にびょうぶに坊主の絵をかいた',
  '赤巻紙青巻紙黄巻紙',
  '派出所で手術中',
  '東京特許許可局許可局長',
  'この杭の釘は引き抜きにくい',
  'アンドロメダ座だぞ',
  '孫がままごと',
  '竹垣に竹立てかけた',
  '除雪車除雪作業中',
  '魔術師魔術修行中',
  '商社の社長が調査書捜査中'
];

var currentText;
var timeLeft;
var score;
var usedTexts = [];

// ゲームスタート
startBtn.addEventListener('click', startGame);

function startGame() {
  // Reset game state
  timeLeft = 60;
  score = 0;
  scoreEl.innerHTML = score;

  // タイマースタート
  timerId = setInterval(updateTimer, 1000);

  startBtn.disabled = true;

  // テキストデータからランダムで表示
  currentText = generateRandomText();
  textEl.innerHTML = currentText;

  inputEl.disabled = false;
  inputEl.value = '';
  inputEl.focus();

  inputEl.addEventListener('input', checkInput);
}

function updateTimer() {
  timeLeft--;
  timeLeftEl.innerHTML = timeLeft;
  if (timeLeft === 0) {
    endGame();
  }
}

function checkInput() {
  if (inputEl.value === currentText) {
    score++;
    scoreEl.innerHTML = score;

    currentText = generateRandomText();
    textEl.innerHTML = currentText;

    inputEl.value = '';
    inputEl.focus();
  }
}

function endGame() {
  clearInterval(timerId);
  inputEl.removeEventListener('input', checkInput);
  inputEl.disabled = true;
  startBtn.disabled = false;
}

function generateRandomText() {
  var randomTextIndex;
  do {
    randomTextIndex = Math.floor(Math.random() * textData.length);
  } while (usedTexts.includes(randomTextIndex));

  usedTexts.push(randomTextIndex);
  if (usedTexts.length === textData.length) {
    usedTexts = [];
  }

  return textData[randomTextIndex];
}
