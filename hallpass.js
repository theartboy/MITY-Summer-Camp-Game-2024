class Hallpass {
  constructor() {
    const loc = emptyFloorCell() //returns [column,row]
    this.width = 32
    this.height = 32
    this.x = loc[0] * cellWidth
    this.y = loc[1] * cellHeight
    this.markedForDeletion = false
  }
  draw(ctx) {
    ctx.fillStyle = "#ddddaa"
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }
}
