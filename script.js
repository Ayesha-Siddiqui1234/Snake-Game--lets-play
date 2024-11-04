
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const box = 20;
let snake, direction, food, score;
function initializeGame() {
    snake = [{ x: 9 * box, y: 10 * box }];
    direction = 'RIGHT';
    food = {
        x: Math.floor(Math.random() * 19 + 1) * box,  //here box refers to 20 px each moves as 20px each snake and food moves in boxes which are in 20px the multiplication make sure that the move on the same grid on the same boxes where snake moving so everything alines perfectly
        y: Math.floor(Math.random() * 19 + 1) * box
    };
    score = 0;
}
initializeGame()
// // Add event listeners for arrow buttons
document.getElementById('up').addEventListener('click', () => {
    if (direction !== 'DOWN') direction = 'UP';
});
document.getElementById('down').addEventListener('click', () => {
    if (direction !== 'UP') direction = 'DOWN';
});
document.getElementById('left').addEventListener('click', () => {
    if (direction !== 'RIGHT') direction = 'LEFT';
});
document.getElementById('right').addEventListener('click', () => {
    if (direction !== 'LEFT') direction = 'RIGHT';
});

//for keyboard keys 
document.addEventListener('keydown', changeDirection);
function changeDirection(event) {   //pass a parameter named event
    if (event.keyCode === 37 && direction !== 'RIGHT') {
        direction = 'LEFT';
    }
    else if (event.keyCode === 38 && direction !== 'DOWN') {
        direction = 'UP';
    }
    else if (event.keyCode === 39 && direction !== 'LEFT') {
        direction = 'RIGHT';
    }
    else if (event.keyCode === 40 && direction != 'UP') {
        direction = 'DOWN';
    }
}

function drawSnake() {
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i === 0) ? 'green' : 'lightgreen';  // snake didnt eat anything so color is green when snake eat anything so i is incremented and the color would become light green here(to fill the color)
        ctx.fillRect(snake[i].x, snake[i].y, box, box)   //here when snake[0].9*box shows that when snake didnt eat anything at 0 so it moves 9*20px so the specific grid is assign to it similarly for y and box is used for width and height of the snake if we didnt set the diemensions so the increment would be on 0 and lightgreen boxes would only come up on 0 index at 1st green box(for outline dimensions)
        ctx.strokeStyle = 'darkgreen';//(for outline color)  
        ctx.strokeRect(snake[i].x, snake[i].y, box, box) //(for outline dimensions)
    }
}

function drawFood() {
    ctx.fillStyle = 'red';  //(to fill the inner color)
    ctx.fillRect(food.x, food.y, box, box);  //x and y value came from food random value(for inner dimension color) 
}

function updateGame() {
    //current head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;


    //move snake in current direction
    //when we click on any key so new head would be added which we are removing by using pop() so when the snake eated food so the height remains same just the new head is added which is not poped() at that time
    if (direction === 'LEFT') snakeX -= box;
    if (direction === 'RIGHT') snakeX += box;
    if (direction === 'UP') snakeY -= box;
    if (direction === 'DOWN') snakeY += box;

    //check if snake eats food
    if (snakeX === food.x && snakeY === food.y) {
        score++;
        food = {   //regenertaing food at random position when snake has done by eating the food
            x: Math.floor(Math.random() * 19 + 1) * box,
            y: Math.floor(Math.random() * 19 + 1) * box
        };
    }


    else {
        snake.pop(); //when we click on any key so newy head would be added which we are removing by using pop() so when the snake eated food so the height remains same
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    //check for collision
    if (snakeX < 0 || snakeY < 0 || snakeX >= 20 * box || snakeY >= 20 * box || collision(newHead, snake)) { //collision function with two arguments
        clearInterval(game);
        alert('game over');

    }
    snake.unshift(newHead);  //if game over than add newhead at the begning of the array for again starting the game  // unshift the new head at the begining of the array as a head 
}
//detecting collision
function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x === array[i].x && head.y === array[i].y) {
            return true;
        }
    }
    return false;
}
1
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    drawFood();
    updateGame();
    ctx.fillStyle = 'black';
    ctx.font = 'bold 20px serial';
    ctx.fillText(`score: ${score}`, box, box);

}
let game;

game = setInterval(draw, 300);


// Restart button functionality
document.getElementById('restartButton').addEventListener('click', () => {
    clearInterval(game);  // Clear the existing game interval
    initializeGame();     // Re-initialize game variables
    game = setInterval(draw, 300);  // Restart the game loop
});

// Exit button functionality
document.getElementById('exitButton').addEventListener('click', () => {
    clearInterval(game);  // Stop the game interval
    alert('Thank you for playing!');  // Show exit message
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clear the canvas
    window.location.href = 'index.html';  // Navigate to index1.html
});