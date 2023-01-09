let cvs = document.getElementById("canvas"); // получаем елемент canvas со страницы
let ctx = cvs.getContext("2d"); // canvas default Context

// создаем глобальные переменные графики
let bird = new Image();
let bg = new Image();
let fg = new Image();
let pipeUp = new Image();
let pipeBottom = new Image();

// Графические файлы
bird.src = "img/bird.png";
bg.src = "img/bg-night.png";
fg.src = "img/fg.png";
pipeUp.src = "img/pipeUp.png";
pipeBottom.src = "img/pipeBottom.png";


// создаем глобальные переменные звуковых файлов
let fly = new Audio();
let clickButtons = new Audio();
let scoreAudio = new Audio();
let gameOver = new Audio();
let mainMenuSound = new Audio();

// импортируем звуковые файлы
fly.src = "";
clickButtons.src = "audio/clickButtons.mp3";
scoreAudio.src = "audio/score.mp3";
gameOver.src = "audio/gameOver.mp3";
mainMenuSound.src = "audio/8KRASHER.mp3";

// расстояние между трубами
let gap = 150;

// При нажатии на какую-либо кнопку взлетает
document.addEventListener("keydown", moveUp);

// функция изменение позиции
function moveUp() {
   yPos -= 25;// изменем позицию на -25 тоесть вверх
   fly.play(); // запускаем файл fly
}

// Создание блоков
let pipe = [];

pipe[0] = {
   x : 350, // ширина canvas
   y : 0 // длина равна 0
}

// кол-во пройденных этапов
let score = 0;

// Позиция птички
let xPos = 100; // по горизонтали
let yPos = 250; // по вертикали
let grav = 1.5; // гравитация

// функция ресующая всю структуру игры
function draw() {
   ctx.drawImage(bg, 0, 0); // canvas.drawImage(background, width, height)

for(let i = 0; i < pipe.length; i++) {
   ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
   ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

 pipe[i].x--;

if (pipe[i].x == 125) { // если pipe.pos.x 125 px созадем новое препятствие
      pipe.push({
      x : 350,
      y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
      }
   );
}

// вычитываем позицию птички а так же проверяем врезалась ли она в ограничение
if(xPos + bird.width >= pipe[i].x
   && xPos <= pipe[i].x + pipeUp.width
   && (yPos <= pipe[i].y + pipeUp.height
   || yPos + bird.height >= pipe[i].y + pipeUp.height + gap) || yPos + bird.height >= cvs.height - fg.height) {
      return (gameOverShow(),stopAllSteps());
}
if(pipe[i].x == 125) { // если pipe.pox i прошла сковзь 125 добавляем +1 к score
   score++; // инкриментируем score
   scoreAudio.play(); // запускаем аудио о пройденом пути
   }
}

ctx.drawImage(fg, 0, cvs.height - fg.height);
ctx.drawImage(bird, xPos, yPos);

yPos += grav;


 // Панель и score
ctx.fillStyle = "white";
ctx.fillRect = "black";
ctx.font = "24px Verdana";
ctx.fillText("Score: " + score, 10, cvs.height - 600);

requestAnimationFrame(draw); // функция позволяет пропускать кадры
}

function stopAllSteps () { // функция останавливающая все процессы для корректной работы меню
   gameOver.play();
   mainMenuSound.src = '';
   fly.src = "";
   bird.src = "";
   bg.src = "";
   fg.src = "";
   pipeUp.src = "";
   pipeBottom.src = "";
}


function gameOverShow () { // меню о проигрыше
   document.querySelector('#gameOverShow').innerHTML += `
   <div class="backdrop">
   <div class="game__over__menu">
      <div class="game__over__controls">
            <p>You lose: ${score}</p>
            <button onClick="restartGame ()">Main menu</button>
         </div>
      </div>
   </div>`
}

function restartGame () { // функция перезагружаем игру
   location.reload();
}

function mainMenu () { // главное меню *вомзожно в скором будет доработка
   document.querySelector('#mainMenu').innerHTML += `
   <div class="main__menu__controls">
   <h1>Flappy Bird JS Edition</h1>
   <button onclick="hideMainMenu()">Start</button>
   <ul type="none">
      <li>
         <a href="https://github.com/ilovehatemyself" onclick="alert('You will be have redirect on https://github.com/ilovehatemyself ???')" target="_blank">Thanks  ilovehatemyself</a>
      </li>
   </ul>
   </div>
   `
}

mainMenu();

function hideMainMenu () { // при нажатии на кнопку меню будет скрываться и вызвать нужные процессы
   mainMenu = document.querySelector('.main__menu');
   pipeBottom.onload = draw(); 
   fly.src = "audio/fly.mp3";
   clickButtons.play();
   mainMenuSound.play();
   mainMenu.style.display = 'none';
}