class TitleScreenState extends BaseState {

    enableInput = () => {
        this.acceptInput = true
    }

    enter = () => {
        gTitleElement.innerHTML = `Welcome <span class="name 1">${gPlayer1Name}</span> & <span class="name 2">${gPlayer2Name}</span> to ping pong`
        let decisionKey = gIsMobile ? 'Tap here' : 'Press enter'
        gDescriptionElement.innerHTML = `${decisionKey} to start the game`
        gScoreContainerElement.classList.add('hidden')
        gCountDownElement.classList.add('hidden')
        gTitleElement.classList.remove('hidden')
        gDescriptionElement.classList.remove('hidden')
        gPlayPauseIndicator.classList.add('hidden')

        populateExistingScores()

        document.querySelector('.credits').classList.remove('faded')

        this.acceptInput = gIsMobile ? false : true
        if(gIsMobile)
            setTimeout(this.enableInput, 1000)
    }

    keyBoardEntry = () => {
        return gCanvas.keyIsDown(13) || gCanvas.keyIsDown(27) || gCanvas.keyIsDown(32)
    }

    mouseEntry = () => {
        return gCanvas.mouseIsPressed
    }

    update = () => {
        if (this.keyBoardEntry() && this.acceptInput) {
            gSounds.startGame.play()
            hideExistingScores()
            gStateMachine.changeState("countDown")
        }
    }
}