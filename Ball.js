class Ball {
    
    constructor(x, y, width, height, speed, canvas) {
        this.x = x, this.originalX = x;
        this.y = y, this.originalY = y;
        this.width = width;
        this.height = height;
        this.canvas = canvas
        this.speedVec = canvas.createVector(0, 0)
        this.dx = 0;
        this.dy = 0;
        this.speed = speed;
    }

    reset = () => {
        this.x = this.originalX
        this.y = this.originalY
        this.initializeVelocity()
    }

    initializeVelocity = () => {
        // this.speedVec = this.canvas.createVector(-0.9883975208878653, -0.15188923827158374)
        this.speedVec = p5.Vector.random2D()
        while (Math.abs(this.speedVec.x) < Math.abs(this.speedVec.y)) {
            this.speedVec = p5.Vector.random2D()
        }
        // console.log(this.speedVec)
        this.speedVec.mult(this.speed)
        this.dx = this.speedVec.x
        this.dy = this.speedVec.y
    }

    update = () => {
        this.x += this.speedVec.x
        this.y += this.speedVec.y
    }

    bounceY = () => {
        this.speedVec.y *= -1
    }

    bounceX = () => {
        this.speedVec.x *= -1
    }

    bounceBackFromTopBottom = (minY, maxY) => {
        if ((this.y - this.height/2) < minY || (this.y + this.height/2) > maxY) {
            this.bounceY()
            gSounds.collideWithWall.play()
        }
    }

    bounceBackFromLeftRight = (minX, maxX) => {
        if ((this.x - this.width/2) < minX || (this.x + this.width/2) > maxX) {
            this.bounceX()
        }
    }

    outsideTheBox = (x, direction = 'left') => {
        if ((this.x - this.width/2) < x && direction == 'left') {
            return true
        }
        if ((this.x + this.width/2) > x && direction == 'right') {
            return true
        }

        return false
    }

    collision = (paddle) => {
        if (this.x - this.width/2 >= paddle.x + paddle.width || paddle.x - paddle.width/2 >= this.x + this.width)
            return false
        if (this.y - this.height/2 > paddle.y + paddle.height/2 || paddle.y - paddle.height/2 > this.y + this.height/2)
            return false
        return true
    }

    render = () => {
        this.canvas.noStroke()
        // this.canvas.fill(255)
        this.canvas.ellipse(this.x, this.y, this.width, this.height)
    //     this.canvas.push()
    //     this.canvas.strokeWeight(2)
    //     this.canvas.stroke(0 ,255, 0)
    //     this.canvas.point(this.x, this.y)
    //     this.canvas.pop()
    }
}