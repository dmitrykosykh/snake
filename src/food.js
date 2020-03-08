class Food {
  constructor(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
  }

  updatePosition = (x, y) => {
    this.x = x;
    this.y = y;
  }

  getPosition = () => ({
    x: this.x,
    y: this.y,
  })

  render = (context) => {
    context.beginPath();
    context.rect(this.x + 5, this.y + 5, this.size - 10, this.size - 10);
    context.fillStyle = this.color;
    context.fill();
    context.closePath();
  }
}

export default Food;
