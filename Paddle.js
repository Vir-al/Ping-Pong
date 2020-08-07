class Paddle {
    constructor(x, y, width, height, canvas, position = "left") {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.canvas = canvas
        this.speed = 10

        this.keySet = position === "left" ? ["W", "S"] : ["↑", "↓"]
        this.keySetFontSize = position === "left" ? 15 : 20
    }

    moveUp = () => {
        if ((this.y - this.height/2 - 10) > 0)
            this.y -= this.speed
    }

    moveDown = () => {
        if ((this.y + this.height/2 + 10) < windowHeight)
            this.y += this.speed
    }

    render = () => {
        this.canvas.rectMode(this.canvas.CENTER)
        this.canvas.rect(this.x, this.y, this.width, this.height, 5)
        this.canvas.textAlign(this.canvas.CENTER, this.canvas.CENTER)
        this.canvas.textSize(this.keySetFontSize)
        this.canvas.text(this.keySet[0], this.x, 12)
        this.canvas.text(this.keySet[1], this.x, windowHeight - 12)
        // this.canvas.stroke(0 ,255, 0)
        // this.canvas.strokeWeight(10)
        // this.canvas.point(this.x, 10)

    }
}