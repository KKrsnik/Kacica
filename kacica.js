//Tile Variables
var grid = document.getElementById('grid');
var head = grid.getContext('2d');
var tail = grid.getContext('2d');
var fruit = grid.getContext('2d');
var blank = grid.getContext('2d');

//Events Listeners
window.addEventListener('keydown', onKeyDown, false);

SnakeDirection = {
  UP: 0,
  DOWN: 2,
  LEFT: 3,
  RIGHT: 1
}

//Settings
size=20
grid=600/size
len=3
score=0

//Controls
var direction = SnakeDirection.RIGHT;

function setDirectionOnKeyDown(event, newDirection) {

  direction = newDirection;
  event.preventDefault();
}

function onKeyDown(event) {
  switch (event.keyCode) {
    case 38:
    case 87:
      setDirectionOnKeyDown(event, SnakeDirection.UP);
      break;
    case 40:
    case 83:
      setDirectionOnKeyDown(event, SnakeDirection.DOWN);
      break;
    case 37:
    case 65:
      setDirectionOnKeyDown(event, SnakeDirection.LEFT);
      break;
    case 39:
    case 68:
      setDirectionOnKeyDown(event, SnakeDirection.RIGHT);
      break;
  }
}

//Snake Objects
function newFruit() {
  a = Math.floor(Math.random()*grid)
  b = Math.floor(Math.random()*grid)
}
newFruit()
snake = [[grid/2-2,grid/2],[grid/2-1,grid/2],[grid/2,grid/2]]

function cut() {
  if (snake.length-1 == len) {
    praz = {
      x: snake[0][0],
      y: snake[0][1]
    }
    snake.splice(0,1)
  }
}

prew = SnakeDirection.RIGHT;

//Game On Tick
f = setInterval(tick, 100);

function tick() {
  if (prew == (direction+2)%4) {
    direction = prew
  }

  switch (direction) {
    case SnakeDirection.UP:
      snake.push([snake[snake.length-1][0],snake[snake.length-1][1]-1]);
      cut();
      break;
    case SnakeDirection.DOWN:
      snake.push([snake[snake.length-1][0],snake[snake.length-1][1]+1]);
      cut();
      break;
    case SnakeDirection.LEFT:
      snake.push([snake[snake.length-1][0]-1,snake[snake.length-1][1]]);
      cut();
      break;
    case SnakeDirection.RIGHT:
      snake.push([snake[snake.length-1][0]+1,snake[snake.length-1][1]]);
      cut();
      break;
  }
  prew = direction


  gvx = snake[snake.length-1][0]*size;
  gvy = snake[snake.length-1][1]*size;

  //Border Crossing

  if (gvx == grid*size) {snake[snake.length-1][0] = 0}
  if (gvx == -1*size) {snake[snake.length-1][0] = grid-1}
  if (gvy == grid*size) {snake[snake.length-1][1] = 0}
  if (gvy == -1*size) {snake[snake.length-1][1] = grid-1}

  //Snake tiles

  blank.fillStyle = '#000000';
  blank.fillRect(praz.x*size,praz.y*size,size,size);
  for (i=0; i < snake.length; i++) {
    if (i==snake.length-1) {
      head.fillStyle = '#FF6400';
      head.fillRect(snake[snake.length-1][0]*size,snake[snake.length-1][1]*size,size,size);
    }
    else {
      tail.fillStyle = '#FFAB0D';
      tail.fillRect(snake[i][0]*size,snake[i][1]*size,size,size);
  }
  }

 if (snake[snake.length-1][0] == a & snake[snake.length-1][1] == b) {
   newFruit()
   len++
   score++
 }
 fruit.fillStyle = '#FF250D';
 fruit.fillRect(a*size,b*size,size,size);
 for (i=0; i < snake.length-2; i++) {
   if (snake[snake.length-1][0] == snake[i][0] & snake[snake.length-1][1] == snake[i][1]) {
     clearInterval(f);
     document.getElementById('over').innerHTML = 'KONEC IGRE, Število doseženih točk: ' + score;
    }
  }
}
