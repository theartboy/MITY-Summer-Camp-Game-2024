function emptyFloorCell() {
  let randRow = 0
  let randCol = 0
  let loc = []
  while (tileMap[randRow][randCol] === 1) {
    randRow = Math.floor(Math.random() * rows)
    randCol = Math.floor(Math.random() * cols)
    // console.log(randRow + ',' + randCol)
  }
  loc[1] = randRow
  loc[0] = randCol
  return loc
}
//////////////////////////////////////////
class Sprite {
  constructor() {
    this.fps = 12
    this.frameInterval = 1000 / this.fps
    this.frameTimer = 0
    this.frameX = 0
    this.frameY = 0
    this.rows = 1
    this.maxFrame = 1
  }
  update(deltaTime) {
    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0
      if (this.speedX != 0 || this.speedY != 0) {
        this.frameX = (this.frameX + 1) % this.maxFrame
      }
    } else {
      this.frameTimer += deltaTime
    }
  }
  draw(context) {
    context.drawImage(
      //image,sx,xy,sw,sh,x,y,w,h
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    )
  }
}
