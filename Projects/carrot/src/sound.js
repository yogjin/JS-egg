const carrotSound = new Audio('./sound/carrot_pull.mp3');
const bugSound = new Audio('./sound/bug_pull.mp3');
const winSound = new Audio('./sound/game_win.mp3');
const alertSound = new Audio('./sound/alert.wav');
const bgSound = new Audio('./sound/bg.mp3');

export function playCarrot() {
  play(carrotSound);
}
export function playBug() {
  play(bugSound);
}
export function playWin() {
  play(winSound);
}
export function playGameOver() {
  play(alertSound);
}
export function playBackGround() {
  play(bgSound);
}
export function stopBackGround() {
  stop(bgSound);
}

function play(sound) {
  sound.currentTime = 0;
  sound.play();
}

function stop(sound) {
  sound.pause();
}
