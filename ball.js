class Ball {
  constructor() {
    this.r = 10;
    this.reset();
  }

  reset() {
    this.x = width / 2;
    this.y = height - 60;
    this.dx = random([-1, 1]) * 4;
    this.dy = -4;
    this.speed = 4;
    this.stuck = true; // Espera a presionar espacio
  }

  update() {
    if (this.stuck) {
      this.x = paddle.x + paddle.w / 2;
      this.y = paddle.y - this.r;
      return;
    }

    this.x += this.dx;
    this.y += this.dy;

    // Rebote contra paredes
    if (this.x - this.r < 0 || this.x + this.r > width) {
      this.dx *= -1;
    }

    if (this.y - this.r < 0) {
      this.dy *= -1;
    }
  }

  show() {
    fill(255);
    ellipse(this.x, this.y, this.r * 2);
  }

  checkPaddle(paddle) {
    if (
      this.x > paddle.x &&
      this.x < paddle.x + paddle.w &&
      this.y + this.r > paddle.y &&
      this.y - this.r < paddle.y + paddle.h
    ) {
      this.dy *= -1;
      // Dirección según la posición donde golpea el paddle
      let hitPoint = (this.x - (paddle.x + paddle.w / 2)) / (paddle.w / 2);
      this.dx = hitPoint * this.speed;
    }
  }

  outOfBounds() {
    return this.y - this.r > height;
  }
}
