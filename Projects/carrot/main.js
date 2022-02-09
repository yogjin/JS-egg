const playButton = document.querySelector('.play_button');
const countDown = document.querySelector('.count_down');
let countInterval;

// 게임 시작하면 카운트 다운
function startCountDown() {
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
playButton.addEventListener('click', startCountDown);
