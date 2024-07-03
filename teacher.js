class Teacher extends Sprite {
  constructor(x, y) {
    super()
    this.x = x * 32
    this.y = y * 32
    this.width = 32
    this.height = 32
    this.speedX = 0 //Math.random() * 20 - 10
    this.speedY = 0 //Math.random() * 20 - 10
    this.speed = 2
    this.health = 150
    this.maxHealth = this.health

    this.markedForDeletion = false
    this.left = false
    this.right = false
    this.up = false
    this.down = false
    this.dist = 0

    //combat stuff
    this.fixedDamage = 10
    this.variableDamage = 10
    this.attacks = [
      'Failed Grade',
      'Essay',
      'Test',
      'Math Problem',
      'Quiet Time',
      'Gym Class',
    ]
    this.combatImage = teacherCombatArt
    //sprite stuff
    this.image = teacherArt
    this.rows = 4
    this.maxFrame = 3
    this.fps = 10
    this.frameInterval = 1000 / this.fps
  } //end constructor
  ////////////////////////////////
  update(player, deltaTime) {
    super.update(deltaTime)
    let dx = this.x - player.x
    let dy = this.y - player.y
    this.dist = Math.sqrt(dx * dx + dy * dy)

    if (this.dist < 200) {
      //close biggest gap first
      if (Math.abs(dx) < Math.abs(dy)) {
        //close y gap first
        if (dy < 0) {
          this.down = true
          this.up = false
        } else {
          this.up = true
          this.down = false
        }
      } else {
        //close x gap
        if (dx < 0) {
          this.right = true
          this.left = false
        } else {
          this.left = true
          this.right = false
        }
      } //end gaps
    } else {
      //no chase
      this.left = false
      this.right = false
      this.up = false
      this.down = false
    } //end dist

    if (this.left && !this.right) {
      this.speedX = -this.speed
      this.frameY = 1
    }
    if (this.right && !this.left) {
      this.speedX = this.speed
      this.frameY = 2
    }
    if (this.up && !this.down) {
      this.speedY = -this.speed
      this.frameY = 3
    }
    if (this.down && !this.up) {
      this.speedY = this.speed
      this.frameY = 0
    }
    if (!this.left && !this.right) {
      this.speedX = 0
    }
    if (!this.up && !this.down) {
      this.speedY = 0
    }

    this.x += this.speedX
    this.y += this.speedY
    checkWallCollisions(this)
  } //end update

  ///////////////////////////
  draw(cxt) {
    cxt.fillStyle = 'rgba(225,160,50,0.4)'
    cxt.fillRect(this.x, this.y, this.width, this.height) //x,y,w,h
    super.draw(cxt)
  } //end draw
} //end teacher class
