class PauseState extends BaseState {
    enter = () => {
        gTitleElement.innerHTML = 'Game Paused!'
        gPlayPauseIndicator.innerHTML = 'To resume press "R"'
        
        gScoreContainerElement.classList.add('hidden')
        gCountDownElement.classList.add('hidden')
        gTitleElement.classList.remove('hidden')
        gDescriptionElement.classList.add('hidden')
        gPlayPauseIndicator.classList.remove('hidden')
    }

    update = () => {
        if (gCanvas.keyIsDown(82)) {
            gSounds.playPause.play()
            gStateMachine.changeState("play")
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