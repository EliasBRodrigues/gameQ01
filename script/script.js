window.addEventListener("load",
 function() {

  //constantes
  var GAME_WIDTH = 640;
  var GAME_HEIGHT = 360;

  //jogo rodando
  var gameLive = true;

  //vniveis
  var level = 1;
  var life = 5;
  //mcores 
  var color = "#" + ((1 << 24) *
   Math.random() | 0).toString(16);


  //inimigos
  var enemies = [{
    x: 100, //x coord
    y: 100, //y coord
    speedY: 2, //velocidade Y
    w: 40, //width
    h: 40 //heght
   },
   {
    x: 200,
    y: 0,
    speedY: 2,
    w: 40,
    h: 40
   },
   {
    x: 330,
    y: 100,
    speedY: 3,
    w: 40,
    h: 40
   },
   {
    x: 450,
    y: 100,
    speedY: -3,
    w: 40,
    h: 40
   }
  ];

  //principal
  var player = {
   x: 10,
   y: 160,
   speedX: 2,
   isMoving: false, //mantem jogador ou nao
   w: 40,
   h: 40
  };

  //final
  var goal = {
   x: 580,
   y: 160,
   w: 50,
   h: 36
  }

  var sprites = {};

  var movePlayer = function() {
   player.isMoving = true;
  }

  var stopPlayer = function() {
   player.isMoving = false;
  }

  //canvas 
  var canvas = document
   .getElementById("mycanvas");
  var ctx = canvas.getContext("2d");

  //event listeners player
  canvas.addEventListener(
   'mousedown', movePlayer);
  canvas.addEventListener('mouseup',
   stopPlayer);
  canvas.addEventListener(
   'touchstart', movePlayer);
  canvas.addEventListener(
   'touchend', stopPlayer);

  //update
  var update = function() {

   //check ganhar ou nao ganhar
   if (checkCollision(player,
     goal)) {

    alert('PASSOU!');
    level += 1;
    life += 1;
    player.speedX += 1;
    player.x = 10;
    player.y = 160;
    player.isMoving = false;

    for (var ab = 0; ab < enemies
     .length; ab++) {
     if (enemies[ab].speedY > 1) {
      enemies[ab].speedY += 1;
     } else {
      enemies[ab].speedY -= 1;
     }
    }
   }

   //update player
   if (player.isMoving) {
    player.x = player.x + player
     .speedX;
   }

   //update inimigo
   var i = 0;
   var n = enemies.length;

   enemies.forEach(function(
    element, index) {

    //check colisao
    if (checkCollision(player,
      element)) {
     //stop 
     if (life === 0) {

      alert('CLEDO');

      for (var ab = 0; ab <
       enemies.length; ab++) {

       if (enemies[ab].speedY >
        1) {
        enemies[ab].speedY -= (
         level - 1);
       } else {
        enemies[ab].speedY += (
         level - 1);
       }
      }
      level = 1;
      life = 6;
      player.speedX = 2;
      color = "#" + ((1 << 24) *
        Math.random() | 0)
       .toString(16);
     }

     if (life > 0) {

      life -= 1;
      color = "#" + ((1 << 24) *
        Math.random() | 0)
       .toString(16);
     }

     player.x = 10;
     player.y = 160;
     player.isMoving = false;
    }

    //move inimigo
    element.y += element.speedY;

    //check borders
    if (element.y <= 10) {
     element.y = 10;
     //element.speedY = element.speedY * -1;
     element.speedY *= -1;
    } else if (element.y >=
     GAME_HEIGHT - 50) {
     element.y = GAME_HEIGHT -
      50;
     element.speedY *= -1;
    }
   });
  };

  //show game 
  var draw = function() {
   //clear the canvas
   ctx.clearRect(0, 0, GAME_WIDTH,
    GAME_HEIGHT);

   //draw level
   ctx.font = "15px Verdana";
   ctx.fillStyle = "rgb(0,0,0)";
   ctx.fillText("N??vel : " + level,
    10, 15);
   ctx.fillText("Vida : " + life,
    10, 35);
   ctx.fillText("Velocidade : " + player
    .speedX, 10, 55);


   //draw player random color
   ctx.fillStyle = color;
   ctx.fillRect(player.x, player.y,
    player.w, player.h);

   //draw inimigos
   ctx.fillStyle =
    "rgb(255,120,70)";
   enemies.forEach(function(
    element, index) {
    ctx.fillRect(element.x,
     element.y, element.w,
     element.h);
   });

   //draw goal
   ctx.fillStyle =
    "rgb(0,255,120)";
   ctx.fillRect(goal.x, goal.y,
    goal.w, goal.h);
   ctx.fillStyle = "rgb(0,0,0)";
   ctx.fillText("Fim", goal.x + 7,
    goal.y + 25);
  };

  //gets executed multiple t/s 
  var step = function() {

   update();
   draw();

   if (gameLive) {
    window.requestAnimationFrame(
     step);
   }
  };

  //check colisao entre dois retangulos
  var checkCollision = function(
   rect1, rect2) {

   var closeOnWidth = Math.abs(
     rect1.x - rect2.x) <= Math
    .max(rect1.w, rect2.w);
   var closeOnHeight = Math.abs(
     rect1.y - rect2.y) <= Math
    .max(rect1.h, rect2.h);
   return closeOnWidth &&
    closeOnHeight;
  }

  //initial kick
  step();
 });
console.log(gameLive);