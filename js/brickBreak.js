//used to fix Js errors to do with const and document not defined
/*eslint-env es6*/
/*eslint-env browser*/

const container = document.querySelector('.container');
let conDim = container.getBoundingClientRect();
const gameOver = document.createElement('div');

gameOver.textContent = "Start Game";
gameOver.style.position = "absolute";
gameOver.style.color = "white";
gameOver.style.lineHeight = "60px";
gameOver.style.height = "250px";
gameOver.style.textAlign = "center";
gameOver.style.fontSize = "3em";
gameOver.style.textTransform = "uppercase";
gameOver.style.backgroundColor = "red";
gameOver.style.width = "100%";
gameOver.addEventListener('click', startGame);
container.appendChild(gameOver);

const ball = document.createElement('div');
ball.style.position = "absolute";
ball.style.width = "20px";
ball.style.height = "20px";
ball.style.backgroundColor = "white";
ball.style.borderRadius = "25px";
ball.style.backgroundImage = "url('./img/ball.png')";
ball.style.backgroundSize = "20px 20px";
ball.style.top = "70%";
ball.style.left = "50%";
ball.style.display = "none";
container.appendChild(ball);

const paddle = document.createElement('div');
paddle.style.position = "absolute";
paddle.style.backgroundColor = "white";
paddle.style.height = "20px";
paddle.style.width = "100px";
paddle.style.borderRadius = "25px";
paddle.style.bottom = "30px";
paddle.style.left = "50%";
container.appendChild(paddle);

// movement controls
document.addEventListener('keydown', function(e)
{
    if (e.keyCode === 37) //left arrow
    {
        paddle.left = true;
    }
    if (e.keyCode === 39) //right arrow
    {
        paddle.right = true;        
    }
    if (e.keyCode === 38 && !player.inPlay) // up arrow
    {
        player.inPlay = true;
    }
})

document.addEventListener('keyup', function(e)
{
    if (e.keyCode === 37)
    {
        paddle.left = false;    
    }
        if (e.keyCode === 39)
    {
        paddle.right = false;        
    }
})

const player = {
    gameOver: true
};

function startGame()
{
    if (player.gameOver)
    {
        player.gameOver = false;
        gameOver.style.display = "none";
        player.score = 0;
        player.lives = 1;
        player.inPlay = false;
        ball.style.display = "block";
        ball.style.left = paddle.offsetLeft + 50 + "px";
        ball.style.top = paddle.offsetTop + 30 + "px";
        player.ballDir = [2, -5];
        player.num = 80;
        setUpBricks(player.num);
        scoreUpdater();
        player.ani = window.requestAnimationFrame(update);
    }
}

function setUpBricks(num)
{
    let row = {
        x: ((conDim.width % 100) /2) , y: 50
    }
    let skip = false;
    for (let x = 0; x < num; x++)
    {
        if (row.x > (conDim.width - 100))
        {
            row.y += 50;
            if (row.y > (conDim.height / 2))
            {
                skip = true;
            }
            row.x = ((conDim.width & 100) / 2);
        }
        row.count = x;
        if (!skip)
        {
            createBrick(row);
        }
        row.x += 100;
    }
}

//creates bricks
function createBrick(pos)
{
    const div = document.createElement('div');
    div.setAttribute('class', 'brick');
    div.style.backgroundColor = rColour();
    div.style.left = pos.x = 'px';
    div.style.top = pos.y = 'px';
    container.appendChild(div);
}

//checks for collison between ball and bricks
function isCollide(a, b)
{
    let aRect = a.getBoundingClientRect();
    let bRect = b.getBoundingClientRect();
    return !((aRect.right < bRect.left) || (aRect.left > bRect.right) || (aRect.bottom < bRect.top) || (aRect.top > bRect.bottom));
}

//geneates a random colour
function rColour()
{
    return '#' + Math.random().toString(16).substr(-6);
}

function scoreUpdater()
{
    document.querySelector('.score').textContent = player.score;
    document.querySelector('.lives').textContent = player.lives;
}

function update()
{
    if (!player.gameOver)
    {
        let pCurrent = paddle.offsetLeft;
        if (paddle.left && pCurrent > 0)
        {
            pCurrent -= 5;
        }
        if (paddle.right && (pCurrent < (conDim.width - paddle.offsetWidth)))
        {
            pCurrent += 5;
        }
        paddle.style.left = pCurrent + 'px';
        if (!player.inPlay)
        {
            waitingOnPaddle();
        }
        else
        {
            moveBall();    
        }
        player.ani = window.requestAnimationFrame(update);
    }
}

function waitingOnPaddle()
{
    ball.style.top = (paddle.offsetTop - 22) + 'px';
    ball.style.left = (paddle.offsetLeft + 40) + 'px';
}

function fallOff()
{
    player.lives--;
    if (player.lives < 0)
    {
        endGame();
        player.lives = 0;
    }
    scoreUpdater();
    stopper();
}

function endGame()
{
    gameOver.style.display = "block";
    gameOver.innerHTML = "Game Over<br>Your Score " + player.score;
    player.gameOver = true;
    ball.style.display = "none";
    let tempBricks = document.querySelectorAll('.brick');
    for (let tBrick of tempBricks)
    {
        tBrick.parentNode.removeChild(tBrick);
    }
    window.cancelAnimationFrame(player.ani);
}

function stopper()
{
    player.inPlay = false;
    player.ballDir[0, -5];
    waitingOnPaddle();
    window.cancelAnimationFrame(player.ani);
}

function moveBall()
{
    let posBall = {
        x: ball.offsetLeft, y: ball.offsetTop
    }
    
    if (posBall.y > (conDim.height - 20) || posBall.y < 0)
    {
        if (posBall.y > (conDim.height - 20))
        {
            fallOff();
        }
        else
        {
            player.ballDir[1] *= -1;
        }
    }
    if (posBall.x > (conDim.width - 20) || posBall.x < 0) 
    {
        player.ballDir[0] *= -1;
    }
    if (isCollide(paddle, ball)) 
    {
        let temp = ((posBall.x - paddle.offsetLeft) - (paddle.offsetWidth / 2)) / 10;
        player.ballDir[0] = temp;
        player.ballDir[1] *= -1;
    }
    let bricks = document.querySelectorAll('.brick');
    if (bricks.length == 0 && !player.gameover) 
    {
        stopper();
        setUpBricks(player.num);
    }
    for (let tBrick of bricks) 
    {
        if (isCollide(tBrick, ball)) 
        {
            player.ballDir[1] *= -1;
            tBrick.parentNode.removeChild(tBrick);
            player.score++;
            scoreUpdater();
        }
    }
    posBall.y += player.ballDir[1];
    posBall.x += player.ballDir[0];
    ball.style.top = posBall.y + 'px';
    ball.style.left = posBall.x + 'px';
}