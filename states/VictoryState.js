class VictoryState extends BaseState {

    enter = () => {
        gSounds.winner.play()
        gScoreContainerElement.classList.add('hidden')
        gCountDownElement.classList.add('hidden')

        gTitleElement.innerHTML = `Congratulations ${gWinner}! You won the game.`
        gDescriptionElement.innerHTML = 'Press enter to start again'
        gPlayPauseIndicator.classList.add('hidden')
        gTitleElement.classList.remove('hidden')
        gDescriptionElement.classList.remove('hidden')
        this.frameCounter = 0
        this.counter = 3
        this.countDownInterval = setInterval(this.countDownFunction, 500)

        window.confettiful = new Confettiful(document.querySelector('#canvas'));
    }

    update = () => {
        if (gCanvas.keyIsDown(13) || gCanvas.keyIsDown(27) || gCanvas.keyIsDown(32)) {
            player1Score = 0
            player2Score = 0
            gBallSpeed += 3
            gSounds.startGame.play()
            window.confettiful.stop()
            gStateMachine.changeState("countDown")
        }
    }

    render = () => {
        gCanvas.fill(12, 0, 72, 100)
        balls.forEach(ball => {
            ball.render()
        })
        gCanvas.fill(255, 255, 255, 100)
        paddle1.render()
        paddle2.render()
    }
}