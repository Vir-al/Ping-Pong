
let balls = [];
let gBallSpeed = 7;
let windowWidth, windowHeight;


let paddle1, paddle2;
const paddleWidth = 10
const paddleHeight = 100

let states;

let player1Score = 0, player2Score = 0
let isFullscreen;


// global variables (Accessible from all files below this one)
let gIsMobile;
let gTouchArray = []
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

const updateTouch = (touches) => {
    for (let index = (gTouchArray.length - 1); index >= 0; index--) {
        const touch = gTouchArray[index]
        if(touch) {
            if(!_.some(touches, t => t.id == touch.id)) {
                gTouchArray.splice(index, 1)
                continue
            }
            switch(touch.role) {
                case 'left':
                    if(touch.x > windowWidth/2) gTouchArray.splice(index, 1)
                    continue
                case 'right':
                    if(touch.x < windowWidth/2) gTouchArray.splice(index, 1)
                    continue
            }
        }
    }


    touches.forEach((touch) => {
        let modifyTouch = _.find(gTouchArray, t => t.id == touch.id)
        if (modifyTouch) {
            modifyTouch.x = touch.x
            modifyTouch.y = touch.y
        } else if (touch.x < windowWidth/2) {
            if(!_.some(gTouchArray, t => t.x < windowWidth/2)) {
                gTouchArray.push({
                    x: touch.x,
                    y: touch.y,
                    id: touch.id,
                    role: 'left'
                })
            }
        } else {
            if(!_.some(gTouchArray, t => t.x > windowWidth/2)) {
                gTouchArray.push({
                    x: touch.x,
                    y: touch.y,
                    id: touch.id,
                    role: 'right'
                })
            }
        }
    })
}

const linedash = (x1, y1, x2, y2, list = [20, 5, 5, 5, 5, 5, 5, 5]) => {
    gCanvas.drawingContext.setLineDash(list);
    gCanvas.line(x1, y1, x2, y2)
    gCanvas.drawingContext.setLineDash([]);
}


const initComponents = () => {
    balls = []
    console.log(balls)
    for (let index = 0; index < 1; index++) {
        let ball = new Ball(windowWidth/2, windowHeight/2, 15, 15, gBallSpeed, gCanvas)
        ball.initializeVelocity()
        balls.push(ball)
    }
    paddle1 = new Paddle(10, 75, paddleWidth, paddleHeight, gCanvas, "left")
    paddle2 = new Paddle(windowWidth - 10, windowHeight - 75, paddleWidth, paddleHeight, gCanvas, "right")
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

    gPlayPauseIndicator.addEventListener('click', function(event) {
        let newState = gStateMachine.currentStateName == 'play' ? 'pause' : gStateMachine.currentStateName == 'pause' ? 'play' : null
        if(newState) {
            gSounds.playPause.play()
            gStateMachine.changeState(newState)
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

        p.touchStarted = function() {
            isFullscreen =  p.fullscreen()
            if(!isFullscreen && gIsMobile) {
                p.fullscreen(true)
                screen.orientation.lock('landscape')
            }
        }

        p.setup = function() {
            windowHeight = p.windowHeight
            windowWidth = p.windowWidth
            p.createCanvas(windowWidth, windowHeight)
            // for (let index = 0; index < 1; index++) {
            //     let ball = new Ball(windowWidth/2, windowHeight/2, 15, 15, gBallSpeed, gCanvas)
            //     ball.initializeVelocity()
            //     balls.push(ball)
            // }
            // paddle1 = new Paddle(10, 75, paddleWidth, paddleHeight, gCanvas, "left")
            // paddle2 = new Paddle(windowWidth - 10, windowHeight - 75, paddleWidth, paddleHeight, gCanvas, "right")
            // p.frameRate(10)
    
            states = {
                titleScreen: new TitleScreenState(),
                countDown: new CountdownState(),
                play: new PlayState(),
                pause: new PauseState(),
                victory: new VictoryState(),
                initForMobile: new InitializeForMobileState()
            }
    
            gStateMachine = new StateMachine(states)
            initComponents()
            let initialState = gIsMobile ? 'initForMobile' : 'titleScreen'
            gStateMachine.changeState(initialState)
        }
    
        p.draw = function() {
            p.background(68, 126, 235)
            updateTouch(p.touches)
            // gFrameRate = p.frameRate()
            gStateMachine.update()
            gStateMachine.render()
        }

        p.windowResized = function() {
            windowHeight = p.windowHeight
            windowWidth = p.windowWidth
            p.resizeCanvas(windowWidth, windowHeight)
            initComponents()
        }
    }
    var canvasForSketch = new p5(sketch, 'canvas')
}

let gRandomNames = ['Clock Shoes', 'Puppy Boat', 'Rollers Whale', 'RIVal', 'Bot', 'System Water', 'Brainiac', 'Mario', 'Pac Man']


let getPlayerNames


window.mobileCheck = function() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
};


window.addEventListener('load', (event) => {
    pingPong()
})

Array.prototype.rotate = function(n) {
    return this.slice(n, this.length).concat(this.slice(0, n));
}

gIsMobile = mobileCheck()

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