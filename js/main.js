let energy = 1000
let protons = 0
let electrons = 0
let neutrons = 0
let elements = {
  h : {name : "idrogeno", cost : [1, 1, 0], count : 0}, 
  he : {name : "elio", cost : [2, 2, 2], count : 0},
  c : {name : "carbonio", cost : [6, 6, 6], count : 0},
  o : {name : "ossigeno", cost : [8, 8, 8], count : 0}
}

let gameArea = {
  canvas : document.createElement("canvas"),
  start : function() {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
    this.context = this.canvas.getContext("2d")
    document.body.insertBefore(this.canvas, document.body.childNodes[0])
    this.interval = setInterval(update, 20)
  }, 
  clear : function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
  },
  stop : function() {
    clearInterval(this.interval)
  }
}

function start() {
  gameArea.start()
}

function update() {
  gameArea.clear()
  writeText("Origin", 20, 50, "45px", "#feda4a")
  drawImage("./res/ui/EnergyIcon.png", 20, 80, 32, 32)
  writeText("Energy: " + energy, 55, 102, "20px", "white")
}

function writeText(text, x, y, size, color) {
  let ctx = gameArea.context
  ctx.font = size + " courier new"
  ctx.fillStyle = color
  ctx.fillText(text, x, y)
}

function drawImage(src, x, y, width, height) {
  let ctx = gameArea.context
  let image = new Image()
  image.src = src
  ctx.drawImage(image, x, y, width, height)
}
