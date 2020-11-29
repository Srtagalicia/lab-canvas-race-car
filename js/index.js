window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    startGame();
  };

  function startGame() {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    const roadImage = new Image();
    roadImage.addEventListener('load', function(){
      context.drawImage(roadImage, 0, 0, canvas.width, canvas.height);
    }, false);
    roadImage.src = '../images/road.png';
  }
};

