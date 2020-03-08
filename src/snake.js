import { shiftToRight, swap } from './utils';

class Snake {
  constructor(x, y, velocity, size, color) {
    this.positions = [];
    this.positions.push({
      x,
      y,
      direction: 'right', // left or up or down
    });
    this.velocity = velocity;
    this.size = size;
    this.color = color;
    this.direction = this.positions[0].direction;
  }

  getHeadPosition = () => this.positions[0]

  getDirection = () => this.direction

  getSize = () => this.positions.length

  eat = (foodPosition) => {
    const headIndex = 0;
    const headPosition = this.positions[headIndex];
    if (headPosition.x === foodPosition.x && headPosition.y === foodPosition.y) {
      return true;
    } else {
      return false;
    }
  }

  grow = () => {
    const tailPosition = this.positions[this.positions.length - 1];
    if (tailPosition.direction === 'right') {
      this.positions.push({
        ...tailPosition,
        x: tailPosition.x - this.size,
      });
    } else if (tailPosition.direction === 'left') {
      this.positions.push({
        ...tailPosition,
        x: tailPosition.x + this.size,
      });
    } else if (tailPosition.direction === 'up') {
      this.positions.push({
        ...tailPosition,
        y: tailPosition.y + this.size,
      });
    } else if (tailPosition.direction === 'down') {
      this.positions.push({
        ...tailPosition,
        y: tailPosition.y - this.size,
      });
    }
  }

  update = () => {
    shiftToRight(this.positions);
    const headIndex = 0;
    this.positions[headIndex] = { ...this.positions[headIndex] };

    if (this.direction === 'up') {
      this.positions[headIndex].y -= this.velocity;
    } else if (this.direction === 'down') {
      this.positions[headIndex].y += this.velocity;
    } else if (this.direction === 'right') {
      this.positions[headIndex].x += this.velocity;
    } else if (this.direction === 'left') {
      this.positions[headIndex].x -= this.velocity;
    }
  }

  turnUp = () => {
    const headIndex = 0;
    const headPosition = this.positions[headIndex];
    headPosition.direction = 'up';
    this.direction = 'up';
  }

  turnDown = () => {
    const headIndex = 0;
    const headPosition = this.positions[headIndex];
    headPosition.direction = 'down';
    this.direction = 'down';
  }

  turnLeft = () => {
    const headIndex = 0;
    const headPosition = this.positions[headIndex];
    headPosition.direction = 'left';
    this.direction = 'left';
  }

  turnRight = () => {
    const headIndex = 0;
    const headPosition = this.positions[headIndex];
    headPosition.direction = 'right';
    this.direction = 'right';
  }

  overlapPositions = (x, y) => {
    this.positions.some((position) => position.x === x && position.y === y);
  }

  detectBorderCollisions = (gameSpace) => {
    const leftBorder = (position) => position.x < 0;

    const rightBorder = (position) => position.x + this.velocity > gameSpace.width;

    const topBorder = (position) => position.y < 0;

    const bottomBorder = (position) => position.y + this.velocity > gameSpace.height;

    const headIndex = 0;
    const headPosition = this.positions[headIndex];
    return leftBorder(headPosition) || rightBorder(headPosition) || topBorder(headPosition) || bottomBorder(headPosition);
  }

  detectTailCollision = () => {
    const headIndex = 0;
    const headPosition = this.positions[headIndex];
    return this.positions.slice(1).some((position) => position.x === headPosition.x && position.y === headPosition.y);
  }

  detectCollisions = (gameSpace) => this.detectBorderCollisions(gameSpace) || this.detectTailCollision()

  render = (context) => {
    this.positions.forEach((position) => {
      context.beginPath();
      context.rect(position.x + 5, position.y + 5, this.size - 10, this.size - 10);
      context.fillStyle = this.color;
      context.fill();
      context.closePath();
    });
  }
}

export default Snake;
