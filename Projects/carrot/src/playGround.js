const carrotSound = new Audio('./sound/carrot_pull.mp3');
const bugSound = new Audio('./sound/bug_pull.mp3');

export default class PlayGround {
  constructor() {
    this.playGround = document.querySelector('.play_ground');
    this.carrotSize = 80;
    window.addEventListener('load', () => {
      this.groundWidth = this.playGround.getBoundingClientRect().width;
      this.groundHeight = this.playGround.getBoundingClientRect().height;
    });
    this.playGround.addEventListener('click', (e) => this.onClick(e));
  }

  // 벌레, 당근 클릭시 이벤트 설정
  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }

  // item을 클릭했을때 로직
  onClick(e) {
    const clicked = e.target;
    const id = clicked.dataset.id;
    if (id === 'carrot') {
      playSound(carrotSound);
      clicked.remove();
      this.onItemClick && this.onItemClick('carrot');
    } else if (id === 'bug') {
      playSound(bugSound);
      clicked.remove();
      this.onItemClick && this.onItemClick('bug');
    }
  }

  // 벌레,당근을 playGround안 랜덤한 위치에 위치시키기 위함
  getRandomPosition() {
    const rangeX = this.groundWidth - this.carrotSize;
    const rangeY = this.groundHeight - this.carrotSize;
    const x = rangeX * Math.random();
    const y = rangeY * Math.random();
    return { x, y };
  }
  // 벌레, 당근을 랜덤위치 시킴
  setCarrotAndBugs() {
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
    this.playGround.innerHTML = `${carrot.repeat(10)}${bug.repeat(10)}`;

    const carrotAndBugs = document.querySelectorAll('.item');
    carrotAndBugs.forEach((carrotOrBug) => {
      carrotOrBug.style.display = 'inline-block';
      const { x, y } = this.getRandomPosition();
      carrotOrBug.style.left = `${x}px`;
      carrotOrBug.style.top = `${y}px`;
    });
  }

  // 벌레, 당근 삭제
  // fa-square로 중간에 게임 중단하면 수행
  // main.js에서 playButton click eventListener 수정요망 -> 중단하는 경우 gameStart는 의미에 맞지않음
  clear() {
    this.playGround.innerHTML = '';
  }
}

// 게임 사운드 재생
function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}
