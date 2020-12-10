
window.onload = () => {

  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');
  const board = new Board(canvas);
  const car = new Car(canvas);
  const obstacleManager = new ObstacleManager(canvas);
  const game = new Game(canvas, board, car, obstacleManager);

  document.getElementById('start-button').onclick = () => {
    game.startGame();
  };

};

class Game{
  constructor(canvas, board, car, obstacleManager){ 
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.board = board;
    this.car = car;
    this.obstacleManager = obstacleManager;
    this.score = 0;
    this.intervalId;
  }
  startGame(){
    let counter = 0;
    this.bindKeys();
    this.intervalId = setInterval(() => {
      this.board.draw();
      this.car.draw();
      this.obstacleManager.drawObstacles();
      this.obstacleManager.moveObstacles();
      this.drawScore();
      this.checkCollision();
      counter++;
      if (counter === 100){
        this.score++;
        counter = 0;
      }
    }, 33);
  }
  bindKeys(){
    document.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowRight'){
        this.car.moveRight();
      }
      else if (event.key === 'ArrowLeft'){
        this.car.moveLeft();
      }
    });
  }
  drawScore(){
    this.context.fillStyle = "red";
    this.context.font = "20px Roboto"
    this.context.fillText(`score: ${this.score}`, 25, 25);
  }
  checkCollision(){
    this.obstacleManager.obstacles.forEach((obstacle) => {
      let leftCollision = this.car.posX > obstacle.posX && this.car.posX < obstacle.posX + obstacle.width;
      let rightCollision = this.car.posX + this.car.width > obstacle.posX && this.car.posX + this.car.width <  obstacle.posX + obstacle.width;
      let frontCollision = this.car.posY === obstacle.posY + obstacle.height;
      if (leftCollision && frontCollision || rightCollision && frontCollision){
        this.gameOver();
      }
    });
  }

  gameOver(){
    this.context.fillStyle = "black";
    this.context.fillRect(0, 0, canvas.width, canvas.height);
    this.context.fillStyle = "white";
    this.context.font = "20px Roboto"
    this.context.fillText(`Game over. Your final score is: ${this.score}`, 50, 50);
    clearInterval(this.intervalId);
  }
}

class Board{
  constructor(canvas){
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;
    this.image = new Image();
    this.image.src = '../images/road.png';
  }
  draw(){
    this.context.drawImage(this.image, 0, 0, this.width, this.height);
  }
}

class Car{
  constructor(canvas){
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.width = 50;
    this.height = 100;
    this.posX = canvas.width/2;
    this.posY = canvas.height-120;
    this.image = new Image();
    this.image.src = '../images/car.png';
  }
  draw() {
    this.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);  
  }
  moveLeft(){
    if (this.posX > 10){
      this.posX--; 
    }
  }
  moveRight(){
    if (this.posX < this.canvas.width-this.width-10){
      this.posX++;
    }
  }
}

class Obstacle{
  constructor(canvas, posX, posY, width){
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.posX = posX;
    this.width = width;
    this.height = 20;
    this.posY = posY;
  }
  draw(){
    this.context.fillStyle = "black";
    this.context.fillRect(this.posX, this.posY, this.width, this.height);
  }
  advance(){
    this.posY++;
  }
}

class ObstacleManager{
  constructor(canvas){
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.obstacles = [];
    this.initObstacles();
  }
  initObstacles(){
    for(let i = 1; i <= 4; i++){
      let obstacle = new Obstacle(canvas, Math.floor(Math.random()*(this.canvas.width-90)), -250*i, 90);
      this.obstacles.push(obstacle);
    }
  }
  drawObstacles(){
    this.obstacles.forEach((obstacle) => {obstacle.draw()});
  }
  moveObstacles(){
    this.obstacles.forEach((obstacle) => {
      obstacle.advance()
      if (obstacle.posY > canvas.height){
        obstacle.posY = -obstacle.height;
      }
    });
  } 
}

