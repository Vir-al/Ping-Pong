class VictoryState extends BaseState {

    resetGame = () => {
        player1Score = 0
        player2Score = 0
        // gBallSpeed += 3
        gSounds.startGame.play()
        window.confettiful.stop()
        hideExistingScores()
        gDescriptionElement.removeEventListener('click', this.resetGame)
        gStateMachine.changeState("countDown")
    }

    enter = () => {
        gSounds.winner.play()
        gScoreContainerElement.classList.add('hidden')
        gCountDownElement.classList.add('hidden')

        gTitleElement.innerHTML = `Congratulations ${gWinner}! You won the game.`
        gDescriptionElement.innerHTML = 'Press here to start again'
        gPlayPauseIndicator.classList.add('hidden')
        gTitleElement.classList.remove('hidden')
        gDescriptionElement.classList.remove('hidden')

        saveScoresToCookie(player1Score, player2Score)
        populateExistingScores()

        window.confettiful = new Confettiful(document.querySelector('#canvas'));
        document.querySelector('.credits').classList.remove('faded')

        gDescriptionElement.addEventListener('click', this.resetGame)
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