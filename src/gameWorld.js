import _ from 'lodash';
import Snake from './snake';
import Food from './food';

const gameWorld = {
  gameSpace: {
    canvas: document.getElementById('gameSpace'),
    context: undefined,
    width: 800,
    height: 800,
    sizeGrid: 50,
  },
  snake: undefined,
  food: undefined,
  animationFrameId: undefined,
  isGameComplete: false,
  isGameOver: false,
  isGameStopped: false,
};

const setupGameSpaceState = () => {
  gameWorld.gameSpace.context = gameWorld.gameSpace.canvas.getContext('2d');
  gameWorld.gameSpace.canvas.width = gameWorld.gameSpace.width;
  gameWorld.gameSpace.canvas.height = gameWorld.gameSpace.height;
};

const setupSnakeState = () => {
  gameWorld.snake = new Snake(0, 0, gameWorld.gameSpace.sizeGrid, gameWorld.gameSpace.sizeGrid, '#FF5733');
};

const calculateFoodPosition = () => {
  const positions = [];
  for (let row = 0; row < _.ceil(gameWorld.gameSpace.height / gameWorld.gameSpace.sizeGrid); row += 1) {
    for (let col = 0; col < _.ceil(gameWorld.gameSpace.width / gameWorld.gameSpace.sizeGrid); col += 1) {
      if (!gameWorld.snake.overlapPositions(gameWorld.gameSpace.sizeGrid * col, gameWorld.gameSpace.sizeGrid * row)) {
        positions.push({
          x: gameWorld.gameSpace.sizeGrid * col,
          y: gameWorld.gameSpace.sizeGrid * row,
        });
      }
    }
  }
  return positions[_.random(0, positions.length - 1)];
};

const setupFoodState = () => {
  const position = calculateFoodPosition();
  gameWorld.food = new Food(position.x, position.y, gameWorld.gameSpace.sizeGrid, '#1B5E20');
};

const updateFoodState = () => {
  const position = calculateFoodPosition();
  gameWorld.food.updatePosition(position.x, position.y);
};

const detectCollisions = () => {
  if (gameWorld.snake.detectCollisions(gameWorld.gameSpace)) {
    gameWorld.isGameOver = true;
  }
};

const updateSnakeState = () => {
  if (gameWorld.snake.eat(gameWorld.food.getPosition())) {
    gameWorld.snake.grow();
    updateFoodState();
    gameWorld.snake.update();
  } else {
    gameWorld.snake.update();
  }
};

const updateGameState = () => {
  updateSnakeState();
  detectCollisions();
};

const renderGameSpace = () => {
  for (let row = 0; row < _.ceil(gameWorld.gameSpace.height / gameWorld.gameSpace.sizeGrid); row += 1) {
    for (let col = 0; col < _.ceil(gameWorld.gameSpace.width / gameWorld.gameSpace.sizeGrid); col += 1) {
      gameWorld.gameSpace.context.beginPath();
      gameWorld.gameSpace.context.rect(gameWorld.gameSpace.sizeGrid * col, gameWorld.gameSpace.sizeGrid * row,
        gameWorld.gameSpace.sizeGrid, gameWorld.gameSpace.sizeGrid);
      gameWorld.gameSpace.context.fillStyle = '#0095DD';
      gameWorld.gameSpace.context.stroke();
    }
  }
};

const clearGameSpace = () => {
  gameWorld.gameSpace.context.clearRect(0, 0,
    gameWorld.gameSpace.canvas.width, gameWorld.gameSpace.canvas.height);
};

const renderGameOver = () => {
  gameWorld.gameSpace.context.font = '30px Arial';
  gameWorld.gameSpace.context.fillStyle = '#ff3300';
  gameWorld.gameSpace.context.fillText('GAME OVER', gameWorld.gameSpace.canvas.width / 2 - 100, gameWorld.gameSpace.canvas.height / 2);
};

const render = () => {
  clearGameSpace();
  updateGameState();
  renderGameSpace();
  gameWorld.snake.render(gameWorld.gameSpace.context);
  gameWorld.food.render(gameWorld.gameSpace.context);
  if (gameWorld.isGameOver) {
    renderGameOver();
  } else {
    window.setTimeout(() => {
      gameWorld.animationFrameId = window.requestAnimationFrame(render);
    }, 250);
  }
};

const setupGameState = () => {
  setupGameSpaceState();
  setupSnakeState();
  setupFoodState();
};

const arrowUpHandler = (event) => {
  if (event.code === 'ArrowUp') {
    if (gameWorld.snake.getSize() === 1) {
      gameWorld.snake.turnUp();
    } else if (gameWorld.snake.getSize() > 1 && gameWorld.snake.getDirection() !== 'down') {
      gameWorld.snake.turnUp();
    }
  }
};

const arrowDownHandler = (event) => {
  if (event.code === 'ArrowDown') {
    if (gameWorld.snake.getSize() === 1) {
      gameWorld.snake.turnDown();
    } else if (gameWorld.snake.getSize() > 1 && gameWorld.snake.getDirection() !== 'up') {
      gameWorld.snake.turnDown();
    }
  }
};

const arrowLeftHandler = (event) => {
  if (event.code === 'ArrowLeft') {
    if (gameWorld.snake.getSize() === 1) {
      gameWorld.snake.turnLeft();
    } else if (gameWorld.snake.getSize() > 1 && gameWorld.snake.getDirection() !== 'right') {
      gameWorld.snake.turnLeft();
    }
  }
};

const arrowRightHandler = (event) => {
  if (event.code === 'ArrowRight') {
    if (gameWorld.snake.getSize() === 1) {
      gameWorld.snake.turnRight();
    } else if (gameWorld.snake.getSize() > 1 && gameWorld.snake.getDirection() !== 'left') {
      gameWorld.snake.turnRight();
    }
  }
};

const setupInput = () => {
  document.addEventListener('keydown', arrowUpHandler);
  document.addEventListener('keydown', arrowDownHandler);
  document.addEventListener('keydown', arrowLeftHandler);
  document.addEventListener('keydown', arrowRightHandler);
};

const startGameLoop = () => {
  setupGameState();
  setupInput();
  render();
};

startGameLoop();
