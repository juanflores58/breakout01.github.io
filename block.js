class Block {
    constructor(x, y, w, h, hits = 1) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.hits = hits;
      this.indestructible = false;
      this.destroyed = false;
    }
  
    show() {
      if (this.destroyed) return;
      if (this.indestructible) {
        fill(150);
      } else {
        const colors = [null, 'blue', 'orange', 'red', 'green'];
        fill(colors[this.hits] || 'white');
      }
      rect(this.x, this.y, this.w, this.h);
    }
  
    collides(ball) {
      return (
        ball.x + ball.r > this.x &&
        ball.x - ball.r < this.x + this.w &&
        ball.y + ball.r > this.y &&
        ball.y - ball.r < this.y + this.h
      );
    }
  }
  