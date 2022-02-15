import Result from './result.js';
import PlayGround from './playGround.js';
const playButton = document.querySelector('.play_button');
const countDown = document.querySelector('.count_down');
const remainingCarrot = document.querySelector('.remaining_carrot');

let countInterval;
let numOfCarrots;
let isPlaying = false;
const bgSound = new Audio('./sound/bg.mp3');
const carrotSound = new Audio('./sound/carrot_pull.mp3');
const bugSound = new Audio('./sound/bug_pull.mp3');
const winSound = new Audio('./sound/game_win.mp3');
const alertSound = new Audio('./sound/alert.wav');

const gameFinishBanner = new Result();
gameFinishBanner.setClickListener(gameStart);
const playGround = new PlayGround();
playGround.setClickListener(handleClicked);

// EventListener
playButton.addEventListener('click', gameStart);

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

// 게임 시작
function gameStart() {
  playButton.style.visibility = 'visible';
  handleCountDown();
  setRemainingCarrot(10);
  playGround.setCarrotAndBugs();
}

// 게임 오버
function gameOver() {
  playButton.style.visibility = 'hidden';
  isPlaying = false;
  stopSound(bgSound);
  clearInterval(countInterval);
  playSound(alertSound);
  gameFinishBanner.showWithMessage('게임 오버...');
}

// 게임 클리어
function gameClear() {
  playButton.style.visibility = 'hidden';
  isPlaying = false;
  stopSound(bgSound);
  clearInterval(countInterval);
  playSound(winSound);
  gameFinishBanner.showWithMessage('당근을 무사히 구출했어요!');
}

// 게임 사운드 재생
function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

function stopSound(sound) {
  sound.pause();
}
