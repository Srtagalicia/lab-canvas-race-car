
window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    startGame();
  };

  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');

  function startGame() {
    drawRoad();
    drawCar();
  }

  function drawRoad() { 
    const roadImage = new Image();
    roadImage.addEventListener('load', function(){
      context.drawImage(roadImage, 0, 0, canvas.width, canvas.height);
    }, false);
    roadImage.src = '../images/road.png';
  }

  function drawCar() {
    const carImage = new Image();
    carImage.addEventListener('load', function(){
      context.drawImage(carImage, canvas.width/2, canvas.height-120, 50, 100);
    }, false);
    carImage.src = '../images/car.png';
  }
};

