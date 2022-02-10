const playButton = document.querySelector('.play_button');
const countDown = document.querySelector('.count_down');
const playGround = document.querySelector('.play_ground');
const groundWidth = playGround.getBoundingClientRect().width;
const groundHeight = playGround.getBoundingClientRect().height;
const groundX = playGround.getBoundingClientRect().x;
const groundY = playGround.getBoundingClientRect().y;

let countInterval;

// 게임 시작하면 카운트 다운
function handleCountDown() {
  const on = playButton.classList.contains('on');
  if (!on) {
    // 게임 시작 시 카운트다운 시작, 아이콘 변화
    playButton.innerHTML = `<i class="fas fa-square"></i>`;
    playButton.classList.add('on');
    let sec = 10;
    countDown.innerText = `00:${sec}`;
    countInterval = setInterval(() => {
      countDown.innerText = `00:0${--sec}`;
      if (sec === 0) {
        console.log('끝!!');
        clearInterval(countInterval);
        playButton.innerHTML = `<i class="fas fa-play"></i>`;
        playButton.classList.remove('on');
      }
    }, 1000);
  } else {
    // 게임 진행중일때 버튼 다시누르면 카운트다운, 아이콘 초기화
    clearInterval(countInterval);
    let sec = 10;
    countDown.innerText = `00:${sec}`;
    playButton.innerHTML = `<i class="fas fa-play"></i>`;
    playButton.classList.remove('on');
  }
}
playButton.addEventListener('click', handleCountDown);

// 벌레, 당근 추가
function setCarrotAndBugs() {
  const carrot = `
    <div class='item carrot'>
      <img src='./img/carrot.png'>
    </div>
  `;
  const bug = `
    <div class='item bug'>
      <img src='./img/bug.png'>
    </div>
  `;
  playGround.insertAdjacentHTML('afterbegin', carrot.repeat(10));
  playGround.insertAdjacentHTML('afterbegin', bug.repeat(10));
}
// 벌레, 당근을 랜덤위치 시킴
// img가 load되고 나서 getRandomPosition안의 getBoundingClientRect() 실행가능함
window.addEventListener('load', () => {
  const carrotAndBugs = document.querySelectorAll('.item');
  carrotAndBugs.forEach((carrotOrBug) => {
    const { x, y } = getRandomPosition(carrotOrBug);
    carrotOrBug.style.left = `${x}px`;
    carrotOrBug.style.top = `${y}px`;
  });
});

// 벌레,당근을 playGround안 랜덤한 위치에 위치시키기 위함
function getRandomPosition(carrotOrBug) {
  const carrotOrBugWidth = carrotOrBug.getBoundingClientRect().width;
  const carrotOrBugHeight = carrotOrBug.getBoundingClientRect().height;
  const x = groundX + (groundWidth - carrotOrBugWidth) * Math.random();
  const y = groundY + (groundHeight - carrotOrBugHeight) * Math.random();
  return { x, y };
}
