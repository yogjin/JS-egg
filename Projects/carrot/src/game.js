import PlayGround from './playGround.js';
import * as sound from './sound.js';
import Result from './result.js';

export default class Game {
  constructor(numOfCarrots) {
    this.playButton = document.querySelector('.play_button');
    this.countDown = document.querySelector('.count_down');
    this.remainingCarrot = document.querySelector('.remaining_carrot');

    this.playButton.addEventListener('click', () => this.gameStart());

    this.playGround = new PlayGround();
    this.playGround.setClickListener((item) => this.onItemClick(item));
    this.gameFinishBanner = new Result();
    this.gameFinishBanner.setClickListener(() => this.gameStart());

    this.countInterval;
    this.setRemainingCarrot(numOfCarrots);
    this.isPlaying = false;
  }

  // 게임 시작
  gameStart() {
    this.playButton.style.visibility = 'visible';
    this.handleCountDown();
    this.playGround.setCarrotAndBugs();
  }

  // 게임 시작하면 카운트 다운
  handleCountDown() {
    if (!this.isPlaying) {
      this.isPlaying = true;
      sound.playBackGround();
      // 게임 시작 시 카운트다운 시작, 아이콘 변화
      this.playButton.innerHTML = `<i class="fas fa-square"></i>`;
      this.startCountDown(10);
    } else {
      // 게임 진행중일때 버튼 다시누르면 카운트다운, 아이콘 초기화
      this.isPlaying = false;
      clearInterval(this.countInterval);
      this.setCountDownTime(10);
      this.playButton.innerHTML = `<i class="fas fa-play"></i>`;
      sound.stopBackGround();
    }
  }
  // 카운트 다운 시간 설정, 시작
  startCountDown(sec) {
    this.countDown.innerText = `00:${sec}`;
    this.countInterval = setInterval(() => {
      this.countDown.innerText = `00:0${--sec}`;
      if (sec === 0) {
        this.gameOver();
        this.playButton.innerHTML = `<i class="fas fa-play"></i>`;
      }
    }, 1000);
  }

  // 카운트 다운 시간 설정
  setCountDownTime(sec) {
    this.countDown.innerText = `00:${sec}`;
  }

  // 남은 당근 개수를 설정
  setRemainingCarrot(numOfCarrot) {
    this.numOfCarrots = numOfCarrot;
    this.remainingCarrot.innerText = this.numOfCarrots;
  }

  // item를 클릭했을 때 로직
  onItemClick(item) {
    if (!this.isPlaying) {
      return;
    }
    if (item === 'carrot') {
      this.setRemainingCarrot(--this.numOfCarrots);
      if (this.numOfCarrots === 0) {
        this.gameClear();
      }
    } else if (item === 'bug') {
      this.gameOver();
    }
  }

  // 게임 클리어
  gameClear() {
    this.playButton.style.visibility = 'hidden';
    this.isPlaying = false;
    sound.stopBackGround();
    clearInterval(this.countInterval);
    sound.playWin();
    this.gameFinishBanner.showWithMessage('당근을 무사히 구출했어요!');
  }

  // 게임 오버
  gameOver() {
    this.playButton.style.visibility = 'hidden';
    this.isPlaying = false;
    sound.stopBackGround();
    clearInterval(this.countInterval);
    sound.playGameOver();
    this.gameFinishBanner.showWithMessage('게임 오버...');
  }
}
