class CountdownState extends BaseState {

    countDownFunction = () => {
        gSounds.countDown.play()
        this.counter -= 1
        gCountDownElement.innerHTML = String(this.counter)

        if(this.counter <= 0 ) {
            clearInterval(this.countDownInterval)
            gStateMachine.changeState('play')
        }
    }

    enter = () => {
        gScoreContainerElement.classList.add('hidden')
        gCountDownElement.classList.remove('hidden')
        gTitleElement.classList.add('hidden')
        gDescriptionElement.classList.add('hidden')
        gPlayPauseIndicator.classList.add('hidden')
        this.frameCounter = 0
        this.counter = 3
        gCountDownElement.innerHTML = String(this.counter)
        this.countDownInterval = setInterval(this.countDownFunction, 500)
        document.querySelector('.credits').classList.remove('faded')

        initComponents()
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