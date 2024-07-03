function combatArt(ctx, e) {
  //background color
  ctx.fillStyle = "rgb(200,100,255)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.textAlign = "left";
  ctx.fillStyle = "white";
  ctx.font = "72px sans-serif";
  ctx.fillText("FIGHT", 64, 200);
  //enemy
  ctx.fillStyle = "orange";
  ctx.fillRect(320, 64, 320, 320);
  ctx.drawImage(e.combatImage, 320, 64);

  //player
  ctx.fillStyle = "navy";
  ctx.fillRect(64, 320, 320, 320);
  ctx.drawImage(playerCombatArt, 64, 320);
  //healthbars text
  ctx.textAlign = "left";
  ctx.fillStyle = "white";
  ctx.font = "18px sans-serif";
  ctx.fillText("Player Health: " + Math.floor(p.health), 32, 32);
  ctx.fillText("Opponent Health: " + Math.floor(e.health), 32 * 13, 32);
  //healthbars graphic
  ctx.fillStyle = "red";
  ctx.fillRect(32, 40, 200, 10);
  ctx.fillRect(32 * 13, 40, 200, 10);
  ctx.fillStyle = "rgb(100,255,255)";
  ctx.fillRect(32, 40, (200 * p.health) / 100, 10);
  ctx.fillStyle = "rgb(100,200,100)";
  ctx.fillRect(32 * 13, 40, (200 * e.health) / e.maxHealth, 10);

  //player attacks text
  ctx.fillStyle = "rgb(100,50,128)";
  ctx.fillRect(240, 540, 380, 70);
  ctx.textAlign = "left";
  ctx.fillStyle = "#ccccff";
  ctx.font = "18px sans-serif";
  ctx.fillText(p.attacks[0], 250, 570);
  ctx.fillText(p.attacks[1], 340, 570);
  ctx.fillText(p.attacks[2], 470, 570);
  ctx.fillStyle = "white";
  ctx.font = "14px sans-serif";
  ctx.fillText("press 1", 252, 592);
  ctx.fillText("press 2", 342, 592);
  ctx.fillText("press 3", 472, 592);
}
//////////////////
let resultText;

function combatAttack(ctx, e) {
  let pc; //player choice
  if (
    !fighting &&
    (input.keys.includes("1") ||
      input.keys.includes("2") ||
      input.keys.includes("3"))
  ) {
    if (input.keys.includes("1")) pc = 0;
    if (input.keys.includes("2")) pc = 1;
    if (input.keys.includes("3")) pc = 2;
    fighting = true;
    fight(pc, e);
  }
  if (fighting) {
    //display the results of the fight
    ctx.fillStyle = "rgba(50,50,64,0.5)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.textAlign = "center";
    ctx.fillStyle = "#ccccff";
    ctx.font = "24px sans-serif";
    ctx.fillText(resultText, canvas.width * 0.5, 320);
    ctx.font = "20px sans-serif";
    ctx.fillText("press SPACE to continue", canvas.width * 0.5, 350);
    if (fighting && input.keys.includes(" ")) {
      fighting = false;
      if (e.health <= 0 && p.health <= 0) {
        console.log("double");
        state = "LOSE";
      } else if (e.health <= 0) {
        console.log("e < 0");
        e.markedForDeletion = true;
        e.x = -1000; //need to relocate the opponent or it will still be there when going back to the grid
        p.level += 1;
        state = "GAME";
      } else if (p.health <= 0) {
        console.log("p < 0");
        state = "LOSE";
      }
    }
  } //end fighting
} //end combat attack
function fight(pc, e) {
  const oc = Math.floor(Math.random() * 3); //opponent choice
  //0=rock, 1=paper, 2=scissors
  //win combos
  //0:2, 1:0, 2:1
  //player lose combos
  //0:1, 1:2, 2:0
  //tie combos
  //0:0, 1:1, 2:2
  if (pc === oc) {
    //tie
    p.health -= Math.random() * e.variableDamage + e.fixedDamage;
    e.health -= Math.random() * p.variableDamage + p.fixedDamage;
    resultText =
      p.attacks[pc] +
      " matched by " +
      e.attacks[Math.floor(Math.random() * e.attacks.length)];
  } else if (pc - oc === 1 || pc - oc === -2) {
    //win
    e.health -= (Math.random() * p.variableDamage + p.fixedDamage) * p.level;
    resultText =
      p.attacks[pc] +
      " crushed the " +
      e.attacks[Math.floor(Math.random() * e.attacks.length)];
  } else {
    //lose
    p.health -= Math.random() * e.variableDamage + e.fixedDamage;
    resultText =
      p.attacks[pc] +
      " foiled by " +
      e.attacks[Math.floor(Math.random() * e.attacks.length)];
  } //end results
  if (p.health < 0) p.health = 0;
  if (e.health < 0) e.health = 0;
  console.log("p:" + p.health + "  e:" + e.health);
}
