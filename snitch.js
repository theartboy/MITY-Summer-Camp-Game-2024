class Snitch extends Sprite {
  constructor() {
    super()
    this.width = 32
    this.height = 32
    const loc = emptyFloorCell() //returns [column,row]
    this.x = loc[0] * this.width
    this.y = loc[1] * this.height
    this.speedX = 0
    this.speedY = 0
    this.speed = 1

    this.markedForDeletion = false
    //sprite stuff
    this.image = snitchArt
    this.rows = 4
    this.maxFrame = 3
    this.fps = 12
    this.frameInterval = 1000 / this.fps

    //movement stuff
    this.left = 'left'
    this.right = 'right'
    this.up = 'up'
    this.down = 'down'
    this.directions = [this.left, this.right, this.up, this.down]
    this.newDirection =
      this.directions[Math.floor(Math.random() * this.directions.length)]
    console.log(this.newDirection)
  }
  update(deltaTime) {
    super.update(deltaTime)
    // clear the directions array so if we hit a wall it can start fresh
    this.directions = []
    //find the current cell we occupy
    const mc = Math.floor(this.x / this.width)
    const mr = Math.floor(this.y / this.height)
    snitchMovement(this, mc, mr)

    this.x += this.speedX
    this.y += this.speedY
  }
  draw(context) {
    context.fillStyle = 'rgba(255,0,0,0.3)'
    context.fillRect(this.x, this.y, this.width, this.height)
    super.draw(context)
  }
  respawn() {
    const loc = emptyFloorCell() //returns [column,row]
    this.x = loc[0] * this.width
    this.y = loc[1] * this.height
    this.directions = [this.left, this.right, this.up, this.down]
    this.newDirection =
      this.directions[Math.floor(Math.random() * this.directions.length)]
  }
} //end snitch class
///////////////////////////////////////
//////////////////////////////////
//snitch movement
function snitchMovement(e, mc, mr) {
  if (e.newDirection == 'up') {
    if (tileMap[mr - 1][mc] !== 0 && e.y <= mr * cellHeight)
      snitchCheckWall(e, mc, mr)
  }
  if (e.newDirection == 'down') {
    if (tileMap[mr + 1][mc] !== 0 && e.y >= mr * cellHeight)
      snitchCheckWall(e, mc, mr)
  }
  if (e.newDirection == 'right') {
    if (tileMap[mr][mc + 1] !== 0 && e.x >= mc * cellWidth)
      snitchCheckWall(e, mc, mr)
  }
  if (e.newDirection == 'left') {
    // console.log('mc' + mc + '  mr' + mr + '   ' + tileMap[mr][mc - 1])
    if (tileMap[mr][mc - 1] !== 0 && e.x <= mc * cellWidth)
      snitchCheckWall(e, mc, mr)
  }
  // movement based on current direction heading
  if (e.newDirection == e.left) {
    e.speedX = -e.speed
    e.speedY = 0
    e.frameY = 1
  }
  if (e.newDirection == e.right) {
    e.speedX = e.speed
    e.speedY = 0
    e.frameY = 2
  }
  if (e.newDirection == e.up) {
    e.speedY = -e.speed
    e.speedX = 0
    e.frameY = 3
  }
  if (e.newDirection == e.down) {
    e.speedY = e.speed
    e.speedX = 0
    e.frameY = 0
  }
}
////////////////////////////
//used for the snitch
function snitchCheckWall(e, mc, mr) {
  if (mr > 0) {
    if (tileMap[mr - 1][mc] !== 1) e.directions.push(e.up)
  }
  if (mr < rows - 1) {
    if (tileMap[mr + 1][mc] !== 1) e.directions.push(e.down)
  }
  if (mc > 0) {
    if (tileMap[mr][mc - 1] !== 1) e.directions.push(e.left)
  }
  if (mc < cols - 1) {
    if (tileMap[mr][mc + 1] !== 1) e.directions.push(e.right)
  }
  if (e.directions.length > 0) {
    e.newDirection =
      e.directions[Math.floor(Math.random() * e.directions.length)]
  }
  // console.log(this.directions)
  // console.log(this.newDirection)
}
