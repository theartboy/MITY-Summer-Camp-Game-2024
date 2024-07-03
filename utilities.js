class InputHandler {
  constructor() {
    this.keys = []
    window.addEventListener('keydown', (e) => {
      if (
        (e.key === 'ArrowDown' ||
          e.key === 'ArrowUp' ||
          e.key === 'ArrowLeft' ||
          e.key === 'ArrowRight' ||
          e.key === '1' ||
          e.key === '2' ||
          e.key === '3' ||
          e.key === ' ' ||
          e.key === 'Shift' ||
          e.key === 'Enter') &&
        this.keys.indexOf(e.key) === -1
      ) {
        this.keys.push(e.key)
      }
      // console.log(e.key, this.keys)
    })
    window.addEventListener('keyup', (e) => {
      if (
        e.key === 'ArrowDown' ||
        e.key === 'ArrowUp' ||
        e.key === 'ArrowLeft' ||
        e.key === 'ArrowRight' ||
        e.key === '1' ||
        e.key === '2' ||
        e.key === '3' ||
        e.key === ' ' ||
        e.key === 'Shift' ||
        e.key === 'Enter'
      ) {
        this.keys.splice(this.keys.indexOf(e.key), 1)
      }
      // console.log(e.key, this.keys)
    })
  } //end constructor
}
//////////////////////////////////////////
function renderMap(context, lines, floors, walls) {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      // noStroke();
      context.strokeStyle = lines
      switch (tileMap[i][j]) {
        case 0:
          //floor
          context.fillStyle = floors
          context.fillRect(j * cellWidth, i * cellHeight, cellWidth, cellHeight)
          context.strokeRect(
            j * cellWidth,
            i * cellHeight,
            cellWidth,
            cellHeight
          )
          break
        case 1:
          //wall
          context.fillStyle = walls
          context.fillRect(j * cellWidth, i * cellHeight, cellWidth, cellHeight)
          context.strokeRect(
            j * cellWidth,
            i * cellHeight,
            cellWidth,
            cellHeight
          )
          break
        case 2:
          //exits
          context.fillStyle = 'rgb(0,255,0)'
          context.fillRect(j * cellWidth, i * cellHeight, cellWidth, cellHeight)
          context.strokeRect(
            j * cellWidth,
            i * cellHeight,
            cellWidth,
            cellHeight
          )
          break
        default:
          console.log('You did not make the map right.')
      }
    }
  }
} //end render map
/////////////////////////////////////////////////////
function checkWallCollisions(s) {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      //check if the tile is a wall
      if (tileMap[i][j] == 1) {
        //determine the distance apart on the X axis
        const distX = Math.floor(
          s.x + s.width / 2 - (j * cellWidth + cellWidth / 2)
        )
        //determine the distance apart on the Y axis
        const distY = Math.floor(
          s.y + s.height / 2 - (i * cellHeight + cellHeight / 2)
        )
        //determine the sum of the half width of the object and the wall
        const combinedHalfWidths = Math.floor(s.width / 2 + cellWidth / 2)
        //determine the sum of the half height and the wall
        const combinedHalfHeights = Math.floor(s.height / 2 + cellHeight / 2)
        //check if they are overlapping on the X axis
        if (Math.abs(distX) < combinedHalfWidths) {
          //check if they are overlapping on the Y axis
          //if so, a collision has occurred
          if (Math.abs(distY) < combinedHalfHeights) {
            //compute the overlap of the object and the wall
            //on both the X and Y axes
            const overlapX = combinedHalfWidths - Math.abs(distX)
            const overlapY = combinedHalfHeights - Math.abs(distY)
            //the collision occurred on the axis with the smallest overlap
            if (overlapX >= overlapY) {
              //because distY is the object Y minus the wall Y
              //a positive value indicates the object started below
              //the wall and was moving up when the collision occurred
              //so it has hit its top into the wall
              if (distY > 0) {
                // collisionSide = "TOPSIDE";
                //move the object down so it is no longer overlapping the wall
                s.y += overlapY
              } else {
                // collisionSide = "BOTTOMSIDE";
                //move the object up so it is no longer overlapping the wall
                s.y -= overlapY
              }
            } else {
              //same logic as the Y axis collision
              if (distX > 0) {
                // collisionSide = "LEFTSIDE";
                //move the object to the right so it is no longer overlapping the wall
                s.x += overlapX
              } else {
                // collisionSide = "RIGHTSIDE";
                //move the object to the left so it is no longer overlapping the wall
                s.x -= overlapX
              }
            }
          } //end y possible
        } //end x possible
      } //end check for wall cells
    } //end for j
  } //end for i
} //end checkWallCollisions
////////////////////////////////////
