
window.onload = () => {

  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');
  const board = new Board(canvas);
  const car = new Car(canvas);
  const game = new Game(board, car);

  document.getElementById('start-button').onclick = () => {
    game.startGame();
  };

};

class Game{
  constructor(board, car){ 
    this.board = board;
    this.car = car;
  }
  startGame(){
    this.bindKeys();
    setInterval(() => {
      this.board.draw();
      this.car.draw();
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
      this.posX--  
    }
  }
  moveRight(){
    if (this.posX < this.canvas.width-this.width-10){
      this.posX++
    }
  }
}
