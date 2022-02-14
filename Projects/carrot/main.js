const playButton = document.querySelector('.play_button');
const redoButton = document.querySelector('.button_redo');
const countDown = document.querySelector('.count_down');
const playGround = document.querySelector('.play_ground');
const remainingCarrot = document.querySelector('.remaining_carrot');
const resultMessage = document.querySelector('.result_message');
const resultContainer = document.querySelector('.result_container');
let groundWidth;
let groundHeight;
window.addEventListener('load', () => {
  groundWidth = playGround.getBoundingClientRect().width;
  groundHeight = playGround.getBoundingClientRect().height;
});

let countInterval;
let numOfCarrots;
let isPlaying = false;
const bgSound = new Audio('./sound/bg.mp3');
const carrotSound = new Audio('./sound/carrot_pull.mp3');
const bugSound = new Audio('./sound/bug_pull.mp3');
const winSound = new Audio('./sound/game_win.mp3');
const alertSound = new Audio('./sound/alert.wav');
const carrotSize = 80;

// EventListener
playButton.addEventListener('click', gameStart);
redoButton.addEventListener('click', gameStart);
playGround.addEventListener('click', handleClicked);

// 카운트 다운 시간 설정, 시작
function startCountDown(sec) {
  countDown.innerText = `00:${sec}`;
  countInterval = setInterval(() => {
    countDown.innerText = `00:0${--sec}`;
    if (sec === 0) {
      gameOver();
      playButton.innerHTML = `<i class="fas fa-play"></i>`;
    }
  }, 1000);
}

// 카운트 다운 시간 설정
function setCountDownTime(sec) {
  countDown.innerText = `00:${sec}`;
}
// 게임 시작하면 카운트 다운
function handleCountDown() {
  if (!isPlaying) {
    isPlaying = true;
    playSound(bgSound);
    // 게임 시작 시 카운트다운 시작, 아이콘 변화
    playButton.innerHTML = `<i class="fas fa-square"></i>`;
    startCountDown(10);
  } else {
    // 게임 진행중일때 버튼 다시누르면 카운트다운, 아이콘 초기화
    isPlaying = false;
    clearInterval(countInterval);
    setCountDownTime(10);
    playButton.innerHTML = `<i class="fas fa-play"></i>`;
    stopSound(bgSound);
  }
}

// 벌레, 당근 추가
function addCarrotAndBugs() {
  const carrot = `
    <div class='item carrot'>
      <img src='./img/carrot.png' data-id='carrot'>
    </div>
  `;
  const bug = `
    <div class='item bug'>
      <img src='./img/bug.png' data-id='bug'>
    </div>
  `;
  playGround.innerHTML = `${carrot.repeat(10)}${bug.repeat(10)}`;
}
// 벌레, 당근을 랜덤위치 시킴
// img가 load되고 나서 getRandomPosition안의 getBoundingClientRect() 실행가능함
/* 수정요망 */
/* playButton을 눌렀을때, getBoundingClientRect() 제대로 작동하게 해야함. load말고 Promise같은걸로, 또는 다른 방법으로 */
function setCarrotAndBugs() {
  if (!isPlaying) {
    return;
  }
  const carrotAndBugs = document.querySelectorAll('.item');
  carrotAndBugs.forEach((carrotOrBug) => {
    carrotOrBug.style.display = 'inline-block';
    const { x, y } = getRandomPosition();
    carrotOrBug.style.left = `${x}px`;
    carrotOrBug.style.top = `${y}px`;
  });
}

// 벌레,당근을 playGround안 랜덤한 위치에 위치시키기 위함
function getRandomPosition() {
  const rangeX = groundWidth - carrotSize;
  const rangeY = groundHeight - carrotSize;
  const x = rangeX * Math.random();
  const y = rangeY * Math.random();
  return { x, y };
}

// play_ground를 클릭했을 때 상호작용
// 당근: .remaining_carrot값 감소
// 벌레: 게임 오버
// button_redo: 게임 다시시작
function handleClicked(e) {
  const clicked = e.target;
  const id = clicked.dataset.id;
  if (isPlaying) {
    if (id === 'carrot') {
      setRemainingCarrot(--numOfCarrots);
      playSound(carrotSound);
      clicked.remove();
      if (numOfCarrots === 0) {
        gameClear();
      }
    } else if (id === 'bug') {
      playSound(bugSound);
      clicked.remove();
      gameOver();
    }
  }
}

// 남은 당근 개수를 10개로 설정
function setRemainingCarrot(numOfCarrot) {
  numOfCarrots = numOfCarrot;
  remainingCarrot.innerText = numOfCarrots;
}

// 게임 결과 창
function showgameResult(message) {
  playButton.style.visibility = 'hidden';
  resultMessage.innerText = message;
  resultContainer.style.display = 'flex';
}

// 게임 시작
function gameStart() {
  resultContainer.style.display = 'none';
  playButton.style.visibility = 'visible';
  handleCountDown();
  setRemainingCarrot(10);
  addCarrotAndBugs();
  setCarrotAndBugs();
}

// 게임 오버
function gameOver() {
  isPlaying = false;
  stopSound(bgSound);
  clearInterval(countInterval);
  playSound(alertSound);
  showgameResult('게임 오버...');
}

// 게임 클리어
function gameClear() {
  isPlaying = false;
  stopSound(bgSound);
  clearInterval(countInterval);
  playSound(winSound);
  showgameResult('당근을 무사히 구출했어요!');
}

// 게임 사운드 재생
function playSound(sound) {
  sound.pause();
  sound.play();
}

function stopSound(sound) {
  sound.pause();
}
