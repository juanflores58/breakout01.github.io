class LevelManager {
    constructor() {
      this.level = 1;
      this.blocks = [];
      this.createLevel();
    }
  
    createLevel() {
      this.blocks = [];
  
      let rows, cols, blockWidth, blockHeight;
      rows = this.level + 3; // Nivel 1: 4, Nivel 2: 5, Nivel 3: 6
      cols = 10;
      blockWidth = width / cols;
      blockHeight = 30;
  
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          let x = col * blockWidth;
          let y = row * blockHeight + 50;
  
          // Default hits por nivel
          let hits = 1;
  
          if (this.level === 2) {
            hits = 2;
          } else if (this.level === 3) {
            hits = 2;
          }
  
          this.blocks.push(new Block(x, y, blockWidth, blockHeight, hits));
        }
      }
  
      // Extra lógica para el nivel 3
      if (this.level === 3) {
        // Dos bloques con 3 golpes
        for (let i = 0; i < 2; i++) {
          this.blocks[i].hits = 3;
        }
        // Un bloque irrompible
        this.blocks[this.blocks.length - 1].indestructible = true;
      }
    }
  
    update(ball, score) {
      for (let block of this.blocks) {
        if (block.collides(ball)) {
          if (!block.indestructible) {
            block.hits--;
            if (block.hits <= 0) {
              block.destroyed = true;
              score.value += 1;
            }
          }
          ball.dy *= -1;
          break;
        }
      }
  
      // Quitar bloques destruidos
      this.blocks = this.blocks.filter(b => !b.destroyed);
    }
  
    show() {
      for (let block of this.blocks) {
        block.show();
      }
    }
  
    isCleared() {
      return this.blocks.every(b => b.indestructible || b.destroyed);
    }
  
    nextLevel() {
      this.level++;
      this.createLevel();
    }
  }
  