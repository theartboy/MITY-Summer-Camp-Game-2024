class Nurse {
  constructor(x, y) {
    this.width = 32;
    this.height = 32;
    this.x = x * this.width;
    this.y = y * this.height;
  }
  draw(cxt) {
    cxt.fillStyle = "white";
    cxt.fillRect(this.x, this.y, this.width, this.height);
    cxt.fillStyle = "red";
    cxt.fillRect(this.x + 10, this.y, 12, this.height);
    cxt.fillRect(this.x, this.y + 10, this.width, 12);
  }
}
