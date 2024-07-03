//www.theartboy.com
//john@theartboy.com
//youtube.com/theartboyjohn
const canvas = document.getElementById('canvas')
const cxt = canvas.getContext('2d')
canvas.width = 640
canvas.height = 640

const p = new Player()
// const t = new Teacher(5, 5);
const teachers = []
teachers[0] = new Teacher(5, 5)
teachers[1] = new Teacher(15, 2)
teachers[2] = new Teacher(1, 17)
const nurse = new Nurse(13, 11)
const input = new InputHandler()
let currentEnemy = null
let fighting = false

const principal = new Principal(17, 6)
const snitches = []
for (let i = 0; i < 15; i++) {
  snitches[i] = new Snitch()
}
let passCount = 0
const hallpasses = []
for (let i = 0; i < 3; i++) {
  hallpasses[i] = new Hallpass()
}

// let state = "GAME"; //START, GAME, COMBAT, WIN, LOSE, DETENTION
// let state = "COMBAT"; //START, GAME, COMBAT, WIN, LOSE, DETENTION
let state = 'START' //START, GAME, COMBAT, WIN, LOSE, DETENTION
// let state = "WIN"; //START, GAME, COMBAT, WIN, LOSE, DETENTION
// let state = "LOSE"; //START, GAME, COMBAT, WIN, LOSE, DETENTION

let lastTime = 0

function animate(timeStamp) {
  /////////////////////////////////////////////
  const deltaTime = timeStamp - lastTime
  lastTime = timeStamp
  ////////////////////////////////////////
  cxt.clearRect(0, 0, canvas.width, canvas.height)
  cxt.textAlign = 'center'
  ////if low power device use image draw
  cxt.drawImage(bgart, 0, 0, canvas.width, canvas.height)
  ////if average or better device use map render
  // renderMap(cxt, lineColor, floorColor, wallColor)
  if (state === 'GAME') {
    p.update(deltaTime)
    p.draw(cxt)
    if (p.x > 32 * 19) {
      state = 'WIN'
    }
    teachers.forEach((teacher) => {
      if (teacher.markedForDeletion)
        teachers.splice(teachers.indexOf(teacher), 1)
      teacher.update(p, deltaTime)
      teacher.draw(cxt)
    })
    snitches.forEach((snitch) => {
      if (snitch.markedForDeletion) snitches.splice(snitches.indexOf(snitch), 1)
      snitch.update(deltaTime)
      snitch.draw(cxt)
    })
    hallpasses.forEach((hallpass) => {
      if (hallpass.markedForDeletion)
        hallpasses.splice(hallpasses.indexOf(hallpass), 1)
      hallpass.draw(cxt)
    })
    principal.update(deltaTime)
    principal.draw(cxt)
    nurse.draw(cxt)

    cxt.fillStyle = 'white'
    cxt.font = '18px sans-serif'
    cxt.textAlign = 'left'

    cxt.fillText('Stamina: ' + Math.floor(p.stamina), 32 * 13, 20)
    cxt.fillText('Health: ' + Math.floor(p.health), 32 * 2, 20)
    cxt.fillText('Hallpasses: ' + passCount, 32 * 8, 20)

    cxt.fillStyle = 'red'
    cxt.fillRect(32 * 12, 22, 200, 10)
    cxt.fillRect(32, 22, 200, 10)
    cxt.fillStyle = 'green'
    cxt.fillRect(32 * 12, 22, (200 * p.stamina) / 100, 10)
    cxt.fillRect(32, 22, (200 * p.health) / 100, 10)
    ///////////////////////////////////////////////
  } else if (state === 'LOSE') {
    cxt.textAlign = 'center'
    cxt.fillStyle = 'rgba(0,0,0,0.5)'
    cxt.fillRect(0, 0, canvas.width, canvas.height)
    cxt.fillStyle = 'white'
    cxt.font = '36px sans-serif'
    cxt.fillText('You LOST', canvas.width * 0.5, 180)
  } else if (state === 'START') {
    cxt.fillStyle = 'rgba(0,0,0,0.5)'
    cxt.fillRect(0, 0, canvas.width, canvas.height)
    cxt.fillStyle = 'white'
    cxt.font = '36px sans-serif'
    cxt.fillText('Press SPACE to play', canvas.width * 0.5, 180)
    if (input.keys.includes(' ')) state = 'GAME'
  } else if (state === 'COMBAT') {
    combatArt(cxt, currentEnemy)
    combatAttack(cxt, currentEnemy)
  } else if (state === 'WIN') {
    cxt.textAlign = 'center'
    cxt.fillStyle = 'rgba(0,0,0,0.5)'
    cxt.fillRect(0, 0, canvas.width, canvas.height)
    cxt.fillStyle = 'white'
    cxt.font = '36px sans-serif'
    cxt.fillText('You escaped school.', canvas.width * 0.5, 180)
  } else if (state === 'DETENTION') {
    cxt.textAlign = 'center'
    cxt.fillStyle = 'rgba(0,0,0,0.5)'
    cxt.fillRect(0, 0, canvas.width, canvas.height)
    cxt.fillStyle = 'white'
    cxt.font = '36px sans-serif'
    if (passCount > 0) {
      cxt.fillText('Press SPACE to leave detention', canvas.width * 0.5, 180)
      if (input.keys.includes(' ')) {
        state = 'GAME'
        passCount -= 1
      }
    } else {
      cxt.fillText('You will never leave detention', canvas.width * 0.5, 180)
    }
  }
  requestAnimationFrame(animate)
} //end animate

animate(0)
