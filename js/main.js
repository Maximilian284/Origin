let energy = 1000
let protons = 0
let electrons = 0
let neutrons = 0
let elements = {               // P  E  N 
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
  writeText("Energia: " + energy, 55, 102, "20px", "white")

  drawRect(10, 130, 275, 150, "white")

  drawImage("./res/ui/ProtonIcon.png", 20, 140, 28, 28)
  writeText("Protoni: " + protons, 60, 162, "20px", "white")

  drawImage("./res/ui/ElectronIcon.png", 20, 190, 28, 28)
  writeText("Elettroni: " + electrons, 60, 212, "20px", "white")

  drawImage("./res/ui/NeutronIcon.png", 20, 240, 28, 28)
  writeText("Neutroni: " + neutrons, 60, 262, "20px", "white")

  drawRect(-2, window.innerHeight - 248, window.innerWidth + 3, 250, "white")

  drawImage("./res/ui/ContainerIcon.png", 80, window.innerHeight - 170, 100, 100)
  writeText("H", 114, window.innerHeight - 107, "50px", "black", "bold")
  writeText("Idrogeno: " + elements.h.count, 50, window.innerHeight - 35, "20px", "white")

  drawImage("./res/ui/ContainerIcon.png", 280, window.innerHeight - 170, 100, 100)
  writeText("He", 302, window.innerHeight - 107, "50px", "black", "bold")
  writeText("Elio: " + elements.he.count, 270, window.innerHeight - 35, "20px", "white")
}

function writeText(text, x, y, size, color, style = "normal") {
  let ctx = gameArea.context
  ctx.font = style + " " + size + " courier new"
  ctx.fillStyle = color
  ctx.fillText(text, x, y)
}

function drawImage(src, x, y, width, height) {
  let ctx = gameArea.context
  let image = new Image()
  image.src = src
  ctx.drawImage(image, x, y, width, height)
}

function drawRect(x, y, width, height, color) {
  let ctx = gameArea.context
  ctx.beginPath()
  ctx.lineWidth = "2"
  ctx.strokeStyle = color
  ctx.rect(x, y, width, height)
  ctx.stroke()
}

function buttonClick(event, x, y, width, height) {
  return event.x > x && event.x < x + width && event.y > y && event.y < y + height
}

gameArea.canvas.addEventListener("click", (event) => {
  if (buttonClick(event, 20, 140, 28, 28) && energy > 0) {
    protons += 1
    energy -= 3
  }else if (buttonClick(event, 20, 190, 28, 28) && energy > 0) {
    electrons += 1
    energy -= 1
  }else if (buttonClick(event, 20, 240, 28, 28) && energy > 0) {
    neutrons += 1
    energy -= 3
  }else if (buttonClick(event, 80, window.innerHeight - 170, 100, 100) && protons > elements.h.cost[0] - 1 && electrons > elements.h.cost[1] - 1){
    protons -= elements.h.cost[0]
    electrons -= elements.h.cost[1]
    elements.h.count += 1
  }else if (buttonClick(event, 280, window.innerHeight - 170, 100, 100) && protons > elements.he.cost[0] - 1 && electrons > elements.he.cost[1] - 1 && neutrons > elements.he.cost[2] - 1){
    protons -= elements.he.cost[0]
    electrons -= elements.he.cost[1]
    neutrons -= elements.he.cost[2]
    elements.he.count += 1
  }
}) 