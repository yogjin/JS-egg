import { GameBuilder, Reason } from './game.js';
import Result from './result.js';

const game = new GameBuilder() //
  .gameDuration(5)
  .carrotCount(3)
  .bugCount(3)
  .build();

const gameFinishBanner = new Result();
game.setFinishListener((reason) => {
  let message;
  switch (reason) {
    case Reason.win:
      message = '당근을 무사히 구출했어요!';
      break;
    case Reason.lose:
      message = '게임 오버...';
      break;
  }
  gameFinishBanner.showWithMessage(message);
});

gameFinishBanner.setClickListener(() => game.gameStart());
