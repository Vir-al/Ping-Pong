
let balls = [];
let gBallSpeed = 10;
let windowWidth, windowHeight;


let paddle1, paddle2;
const paddleWidth = 10
const paddleHeight = 100

let states;

let player1Score = 0, player2Score = 0


// global variables (Accessible from all files below this one)
let gCanvas, gFrameRate, gStateMachine;
let gTitleElement, gDescriptionElement, gScoreContainerElement, gCountDownElement, gPlayPauseIndicator
let gWinner
let gPlayer1Name = 'Player 1', gPlayer2Name = 'Player 2'
let gMaxScore = 5
let gSounds = {
    collideWithWall: '',
    collideWithPaddle: '',
    outsideTheBoundary: '',
    startGame: '',
    playPause: '',
    winner: '',
    countDown: ''
}

const pingPong = function() {

    gTitleElement = document.querySelector(".title")
    gDescriptionElement = document.querySelector(".description")
    gScoreContainerElement = document.querySelector(".score-container")
    gCountDownElement = document.querySelector(".countdown")
    gPlayPauseIndicator = document.querySelector(".play-pause-indicator")


    gTitleElement.addEventListener('click', function(event) {
        if (event.target.classList.contains("name")) {
            if(event.target.classList.contains("1")) {
                getPlayerNames(1, gPlayer1Name)
            } else {
                getPlayerNames(2, gPlayer2Name)
            }
            gStateMachine.changeState('titleScreen')
        }
    })

    let sketch = function(p) {
        gCanvas = p

        p.preload = function () {
            p.soundFormats('wav')
            gSounds = {
                collideWithWall: p.loadSound('sounds/collide_with_wall.wav'),
                collideWithPaddle: p.loadSound('sounds/collide_with_paddle.wav'),
                outsideTheBoundary: p.loadSound('sounds/item_collect.wav'),
                startGame: p.loadSound('sounds/powerup_success.wav'),
                playPause: p.loadSound('sounds/play_pause.wav'),
                winner: p.loadSound('sounds/winner.wav'),
                countDown: p.loadSound('sounds/countdown.wav')
            }
        }

        p.setup = function() {
            windowHeight = p.windowHeight
            windowWidth = p.windowWidth
            p.createCanvas(windowWidth, windowHeight)
            for (let index = 0; index < 1; index++) {
                let ball = new Ball(windowWidth/2, windowHeight/2, 15, 15, gBallSpeed, p)
                ball.initializeVelocity()
                balls.push(ball)
            }
            paddle1 = new Paddle(10, 75, paddleWidth, paddleHeight, p, "left")
            paddle2 = new Paddle(windowWidth - 10, windowHeight - 75, paddleWidth, paddleHeight, p, "right")
            // p.frameRate(10)
    
            states = {
                titleScreen: new TitleScreenState(),
                countDown: new CountdownState(),
                play: new PlayState(),
                pause: new PauseState(),
                victory: new VictoryState()
            }
    
            gStateMachine = new StateMachine(states)
            gStateMachine.changeState('titleScreen')
            gStateMachine.render()
        }
    
        p.draw = function() {
            p.background(68, 126, 235)
            gFrameRate = p.frameRate()
            gStateMachine.update()
            gStateMachine.render()
        }
    }
    
    var canvasForSketch = new p5(sketch, 'canvas')
}

let gRandomNames = ['Clock Shoes', 'Puppy Boat', 'Rollers Whale', 'RIVal', 'Bot', 'System Water', 'Brainiac', 'Mario', 'Pac Man']


let getPlayerNames

window.addEventListener('load', (event) => {

    // const getCookieValue = (name) => {
    //     console.log(document.cookie)
    //     if (document.cookie)
    //         return document.cookie.split('; ').find(row => row.startsWith(name)).split('=')[1];
    // }

    getPlayerNames = (player, existingName) => {
        let name = prompt(`Enter player ${player} name: `, existingName)
        switch(player) {
            case 1:
                gPlayer1Name = name || existingName
                setCookie('player1', gPlayer1Name, 10)
                break
            case 2:
                gPlayer2Name = name || existingName
                setCookie('player2', gPlayer2Name, 10)
                break
        }
    }

    const getCookieValue = (c_name) => {
        var i, x, y, ARRcookies = document.cookie.split(";");
        for (i = 0; i < ARRcookies.length; i++) {
            x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
            y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
            x = x.replace(/^\s+|\s+$/g, "");
            if (x == c_name) {
                return unescape(y);
            }
        }
    }

    const setCookie = (c_name, value, exdays) => {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + exdays);
        var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
        document.cookie = c_name + "=" + c_value;
    }

    setTimeout(() => {
        if(!getCookieValue('player1')) {
            gPlayer1Name = gRandomNames[Math.floor(Math.random() * gRandomNames.length)]
            getPlayerNames(1, gPlayer1Name)
        } else {
            gPlayer1Name = getCookieValue('player1')
        }

        if(!getCookieValue('player2')) {
            gPlayer2Name = gRandomNames[Math.floor(Math.random() * gRandomNames.length)]
            getPlayerNames(2, gPlayer2Name)
        } else {
            gPlayer2Name = getCookieValue('player2')
        }
        pingPong()
    }, 500)

})