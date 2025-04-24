let paddle, ball, levelManager;
let lives = 3;
let score = { value: 0 };

function setup() {
  createCanvas(800, 600);
  paddle = new Paddle();
  ball = new Ball();
  levelManager = new LevelManager();
}

function draw() {
  background(0);
  paddle.update();
  paddle.show();

  ball.update();
  ball.checkPaddle(paddle);
  ball.show();

  levelManager.update(ball, score);
  levelManager.show();

  textSize(16);
  fill(255);
  text(`Vidas: ${lives}`, 10, 20);
  text(`Puntaje: ${score.value}`, 100, 20);
  text(`Nivel: ${levelManager.level}`, 220, 20);

  if (ball.outOfBounds()) {
    lives--;
    if (lives > 0) {
      ball.reset();
    } else {
      noLoop();
      textSize(32);
      text("Juego terminado", width / 2 - 100, height / 2);
    }
  }

  if (levelManager.isCleared()) {
    levelManager.nextLevel();
    ball.reset();
    ball.speed += 1;
  }
}

function keyPressed() {
  if (keyCode === 32 && ball.stuck) {
    ball.stuck = false;
  }
}

