class Paddle {
  constructor() {
    this.w = 100;
    this.h = 20;
    this.x = width / 2 - this.w / 2;
    this.y = height - this.h - 10;
    this.speed = 7;
  }

  update() {
    if (keyIsDown(LEFT_ARROW) && this.x > 0) {
      this.x -= this.speed;
    }

    if (keyIsDown(RIGHT_ARROW) && this.x < width - this.w) {
      this.x += this.speed;
    }
  }

  show() {
    fill(255);
    rect(this.x, this.y, this.w, this.h);
  }
}
