document.addEventListener("keydown", moveSnake);
let snake = [{x: 200, y: 200}];
let direction = {x: 20, y: 0};
let speed = 200;
let snakebody = document.getElementById("snake");
let foodItem = document.getElementById("food");
let food = {x: 80, y:0};
let score = document.getElementById("score");
let scoreText = 0;

alert("press arrow keys to move the snake!")

function moveSnake(event){
    if(event.key == "ArrowUp" && direction.y == 0){
        direction = {x: 0, y: -20};
    } else if(event.key == "ArrowDown" && direction.y == 0){
        direction = {x: 0, y: 20};
    } else if(event.key == "ArrowLeft" && direction.x == 0){
        direction = {x: -20, y: 0};
    } else if(event.key == "ArrowRight" && direction.x == 0){
        direction = {x: 20, y: 0};
    }
};

function updateSnake(){
    let newHead = {
        x : snake[0].x + direction.x, 
        y : snake[0].y + direction.y
    };

    snake.unshift(newHead);
    snake.pop()

    snakebody.style.top = snake[0].y + "px";
    snakebody.style.left = snake[0].x + "px";

    if(endGame()){
        return;
    }

    if(Math.abs(food.x - snake[0].x)<20 && Math.abs(food.y - snake[0].y)<20) {
        scoreText += 1;
        score.innerText = "score: " + scoreText;
        snake.push({x: snake[snake.length - 1].x , y: snake[snake.length - 1].y});
        moveFood();
        let tail = document.createElement("div");
        tail.style.position = "absolute";
        tail.style.width = "40px";
        tail.style.height = "40px";
        tail.style.borderRadius = "30%";
        tail.style.backgroundColor = "#EB843F";
        tail.style.top = snake[snake.length - 1].y + "px";
        tail.style.left = snake[snake.length - 1].x + "px";
        document.body.appendChild(tail);
    };

    let tails = document.querySelectorAll("body > div:not(#snake):not(#food):not(h1)");
    for(let i=0; i<tails.length; i++){
        if(snake[i+1]){
            tails[i].style.top = snake[i+1].y + "px";
            tails[i].style.left = snake[i+1].x + "px";
        }
    }
};

setInterval(updateSnake, speed);

function moveFood(){
    food.y = Math.floor(Math.random() * (window.innerHeight/20))*20;
    food.x = Math.floor(Math.random() * (window.innerWidth/20))*20;
    foodItem.style.left = food.x + "px";
    foodItem.style.top = food.y + "px";
};

moveFood();

function endGame(){
    let headx = parseInt(snakebody.style.left);
    let heady = parseInt(snakebody.style.top);

    if(headx < 0 || headx >= window.innerWidth || heady < 0 || heady >= window.innerHeight){
        alert("game over! snake went out of the region");
        location.reload();
    };

    for(let i = 1; i < snake.length ; i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            alert("game over! snake bit itself");
            location.reload();
            return true;
        }
    }

    return false;

};