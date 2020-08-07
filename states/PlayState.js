class PlayState extends BaseState {
    enter = () => {

        gPlayPauseIndicator.innerHTML = 'To Pause press "P"'

        gScoreContainerElement.classList.remove('hidden')
        gCountDownElement.classList.add('hidden')
        gTitleElement.classList.add('hidden')
        gDescriptionElement.classList.add('hidden')
        gPlayPauseIndicator.classList.remove('hidden')
        document.querySelector(".player-1 .player-name").innerHTML = gPlayer1Name
        document.querySelector(".player-2 .player-name").innerHTML = gPlayer2Name
        document.querySelector(".player-2 .score").innerHTML = 0
        document.querySelector(".player-1 .score").innerHTML = 0
    }


    update = () => {
        balls.forEach(ball => {
            ball.update()
            ball.bounceBackFromTopBottom(0, windowHeight)
            if (ball.collision(paddle1) || ball.collision(paddle2)) {
                gSounds.collideWithPaddle.play()
                ball.bounceX()
                if (ball.speedVec.y < 0) {
                    ball.speedVec.y = -(gCanvas.random(gBallSpeed - 5, gBallSpeed))
                } else {
                    ball.speedVec.y = gCanvas.random(gBallSpeed - 5, gBallSpeed)
                }
                // gCanvas.noLoop()
            }

            if(ball.outsideTheBox(0, 'left')) {
                // player 2 scored
                player2Score += 1
                document.querySelector(".player-2 .score").innerHTML = player2Score
                ball.reset()
                if(player2Score >= gMaxScore) {
                    gWinner = gPlayer2Name
                    gStateMachine.changeState('victory')
                }
                gSounds.outsideTheBoundary.play()
            } else if (ball.outsideTheBox(windowWidth, 'right')) {
                // player 1 scored
                player1Score += 1
                document.querySelector(".player-1 .score").innerHTML = player1Score
                ball.reset()
                if(player1Score >= gMaxScore) {
                    gWinner = gPlayer1Name
                    gStateMachine.changeState('victory')
                }
                gSounds.outsideTheBoundary.play()
            }
            // ball.bounceBackFromLeftRight(0, windowWidth)
        });


        if(gCanvas.keyIsDown(gCanvas.UP_ARROW)) {
            paddle2.moveUp()
        } else if (gCanvas.keyIsDown(gCanvas.DOWN_ARROW)) {
            paddle2.moveDown()
        }

        if(gCanvas.keyIsDown(87)) {
            paddle1.moveUp()
        } else if (gCanvas.keyIsDown(83)) {
            paddle1.moveDown()
        }

        if (gCanvas.keyIsDown(80)) {
            gSounds.playPause.play()
            gStateMachine.changeState("pause")
        }
        // gCanvas.noLoop()
    }

    render = () => {
        gCanvas.fill(12, 0, 72)
        balls.forEach(ball => {
            ball.render()
        })
        
        gCanvas.fill(255)
        paddle1.render()
        paddle2.render()
    }
}