class InitializeForMobileState extends BaseState {
    enter = () => {
        gTitleElement.innerHTML = `Welcome <span class="name 1">${gPlayer1Name}</span> & <span class="name 2">${gPlayer2Name}</span> to ping pong`
        gDescriptionElement.innerHTML = `You need to rotate your phone to start the game. Tap anywhere to rotate and go fullscreen`
        gScoreContainerElement.classList.add('hidden')
        gCountDownElement.classList.add('hidden')
        gTitleElement.classList.remove('hidden')
        gDescriptionElement.classList.remove('hidden')
        gPlayPauseIndicator.classList.add('hidden')
        document.querySelector('.credits').classList.remove('faded')
    }

    mouseEntry = () => {
        return gCanvas.mouseIsPressed
    }

    update = () => {
        if (this.mouseEntry()) {
            gStateMachine.changeState("titleScreen")
        }
    }
}