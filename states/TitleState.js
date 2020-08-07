class TitleScreenState extends BaseState {

    enter = () => {
        gTitleElement.innerHTML = `Welcome <span class="name 1">${gPlayer1Name}</span> & <span class="name 2">${gPlayer2Name}</span> to ping pong`
        gDescriptionElement.innerHTML = 'Press enter to start the game'
        gScoreContainerElement.classList.add('hidden')
        gCountDownElement.classList.add('hidden')
        gTitleElement.classList.remove('hidden')
        gDescriptionElement.classList.remove('hidden')
        gPlayPauseIndicator.classList.add('hidden')
    }

    update = () => {
        if (gCanvas.keyIsDown(13) || gCanvas.keyIsDown(27) || gCanvas.keyIsDown(32)) {
            gSounds.startGame.play()
            gStateMachine.changeState("countDown")
        }
    }

    render = () => {}
}