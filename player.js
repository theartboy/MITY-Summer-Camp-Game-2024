class Player extends Sprite {
  constructor() {
    super()
    this.x = canvas.width * 0.5
    this.y = canvas.height * 0.5
    this.width = 32
    this.height = 32
    this.speedX = 0 //Math.random() * 20 - 10
    this.speedY = 0 //Math.random() * 20 - 10
    this.speed = 5
    this.stamina = 100
    this.health = 100
    //combat stuff
    this.level = 1
    this.fixedDamage = 10
    this.variableDamage = 10
    this.attacks = ['Taunt', 'Throw Coffee', 'Highlighter Duel']
    //sprite stuff
    this.image = playerArt
    this.rows = 4
    this.maxFrame = 3
    this.fps = 12
    this.frameInterval = 1000 / this.fps
  } //end constructor
  ////////////////////////////////
  sprint() {
    if (input.keys.includes('Shift') && this.stamina > 0) {
      this.speed = 10
      this.stamina -= 0.5
    } else {
      this.speed = 5
    }
  }
  update(deltaTime) {
    super.update(deltaTime)
    //left
    if (
      input.keys.includes('ArrowLeft') &&
      !input.keys.includes('ArrowRight') &&
      !input.keys.includes('ArrowUp') &&
      !input.keys.includes('ArrowDown')
    ) {
      this.sprint()
      this.speedX = -this.speed
      this.speedY = 0
      this.frameY = 1
    }

    //right
    if (
      input.keys.includes('ArrowRight') &&
      !input.keys.includes('ArrowLeft') &&
      !input.keys.includes('ArrowUp') &&
      !input.keys.includes('ArrowDown')
    ) {
      this.sprint()
      this.speedX = this.speed
      this.speedY = 0
      this.frameY = 2
    }
    //up
    if (
      !input.keys.includes('ArrowLeft') &&
      !input.keys.includes('ArrowRight') &&
      input.keys.includes('ArrowUp') &&
      !input.keys.includes('ArrowDown')
    ) {
      this.sprint()
      this.speedY = -this.speed
      this.speedX = 0
      this.frameY = 3
    }
    //down
    if (
      !input.keys.includes('ArrowLeft') &&
      !input.keys.includes('ArrowRight') &&
      !input.keys.includes('ArrowUp') &&
      input.keys.includes('ArrowDown')
    ) {
      this.sprint()
      this.speedY = this.speed
      this.speedX = 0
      this.frameY = 0
    }

    if (input.keys.includes('ArrowRight')) this.speedX = this.speed
    if (
      !input.keys.includes('ArrowLeft') &&
      !input.keys.includes('ArrowRight')
    ) {
      this.speedX = 0
    }

    if (input.keys.includes('ArrowUp')) this.speedY = -this.speed
    if (input.keys.includes('ArrowDown')) this.speedY = this.speed
    if (!input.keys.includes('ArrowUp') && !input.keys.includes('ArrowDown'))
      this.speedY = 0

    // this.x = this.x + this.speedX
    // if(this.x > canvas.width - this.width)this.speedX *= -1
    // if(this.x < 0)this.speedX *= -1
    // if(this.y > canvas.height - this.height)this.speedY *= -1
    // if(this.y < 0)this.speedY *= -1
    this.x += this.speedX
    this.y += this.speedY
    checkWallCollisions(this)
    if (
      !input.keys.includes('ArrowLeft') &&
      !input.keys.includes('ArrowRight') &&
      !input.keys.includes('ArrowUp') &&
      !input.keys.includes('ArrowDown') &&
      !input.keys.includes('Shift')
    ) {
      if (this.stamina < 100) this.stamina += 0.1
    }
    if (this.stamina < 0) this.stamina = 0

    teachers.forEach((t) => {
      if (this.checkCollision(t)) {
        currentEnemy = t
        state = 'COMBAT'
        // this.health -= 40;
        // t.markedForDeletion = true;
      }
    })

    snitches.forEach((t) => {
      if (this.checkCollision(t)) {
        state = 'DETENTION'
        t.markedForDeletion = true
      }
    })

    hallpasses.forEach((t) => {
      if (this.checkCollision(t)) {
        passCount++
        t.markedForDeletion = true
      }
    })

    if (this.checkCollision(principal)) {
      currentEnemy = principal
      state = 'COMBAT'
    }
    if (this.checkCollision(nurse)) {
      this.stamina = 100
      this.health = 100
    }
    if (this.health < 0) state = 'LOSE'
  } //end update
  ///////////////////////////
  draw(cxt) {
    // cxt.fillStyle = "#ffff00";
    // cxt.fillRect(this.x - 2, this.y - 2, this.width, this.height); //x,y,w,h
    // cxt.fillStyle = "#330066";
    // cxt.fillRect(this.x, this.y, this.width, this.height); //x,y,w,h
    // cxt.fillStyle = "#00ffff";
    // cxt.fillRect(this.x + 8, this.y + 8, 16, 4); //x,y,w,h
    super.draw(cxt)
  } //end draw

  /////////////////////////////////////////////
  checkCollision(e) {
    if (
      e.x < this.x + this.width &&
      e.x + e.width > this.x &&
      e.y < this.y + this.height &&
      e.y + e.height > this.y
    ) {
      return true
    } else {
      return false
    } //end if
  } //end collisions
  ////////////////////////
} //end player class
