class Principal extends Sprite {
  constructor(x, y) {
    super()
    this.x = x * 32
    this.y = y * 32
    this.width = 64
    this.height = 64
    this.speedX = 0
    this.speedY = 0
    this.speed = 1
    this.health = 2
    this.maxHealth = this.health
    this.fixedDamage = 20
    this.variableDamage = 20
    this.attacks = ['Detention', 'Expulsion', 'Parent Call']

    this.markedForDeletion = false
    this.image = principalArt
    this.combatImage = principalCombatArt

    //sprite stuff
    this.rows = 1
    this.maxFrame = 3
    this.fps = 8
    this.frameInterval = 1000 / this.fps
  }

  update(deltaTime) {
    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0
      this.frameX = (this.frameX + 1) % this.maxFrame
    } else {
      this.frameTimer += deltaTime
    }
  }
  draw(context) {
    // context.fillStyle = "yellow"
    // context.fillRect(this.x, this.y, this.width, this.height)
    super.draw(context)
  }
}
///////////////////////////////////////
