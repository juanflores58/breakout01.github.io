class PowerUp {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.size = 20;
    this.type = type; // 'expand', 'life', 'explode'
    this.active = true;
    this.speed = 3;
  }

  update() {
    this.y += this.speed;
  }

  show() {
    if (!this.active) return;

    fill(this.type === 'expand' ? 'blue' :
         this.type === 'life' ? 'green' : 'red');
    ellipse(this.x, this.y, this.size);
  }

  hits(paddle) {
    return this.active &&
      this.x > paddle.x &&
      this.x < paddle.x + paddle.width &&
      this.y + this.size/2 > paddle.y &&
      this.y - this.size/2 < paddle.y + paddle.height;
  }

  applyEffect(paddle, ball, blocks, score, lives) {
    if (this.type === 'expand') {
      paddle.width *= 1.5;
      setTimeout(() => paddle.width /= 1.5, 10000);
    } else if (this.type === 'life') {
      lives.value += 1;
    } else if (this.type === 'explode') {
      for (let i = 0; i < blocks.length; i++) {
        if (dist(this.x, this.y, blocks[i].x + blocks[i].w/2, blocks[i].y + blocks[i].h/2) < 100) {
          blocks[i].hit();
          score.value++;
        }
      }
    }
    this.active = false;
  }
}
