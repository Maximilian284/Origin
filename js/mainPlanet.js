let energy = 1000
let protons = 0
let electrons = 0
let neutrons = 0
let elements = {               // P  E  N 
  h : {name : "Idrogeno", cost : [1, 1, 0], count : 0, symbol : "H"}, 
  he : {name : "Elio", cost : [2, 2, 2], count : 0, symbol : "He"},
  c : {name : "Carbonio", cost : [6, 6, 6], count : 0, symbol : "C"},
  o : {name : "Ossigeno", cost : [8, 8, 8], count : 0, symbol : "O"},
  si : {name : "Silicio", cost : [14, 14, 14], count : 0, symbol : "Si"},
  al : {name : "Alluminio", cost : [13, 13, 13], count : 0, symbol : "Al"},
  fe : {name : "Ferro", cost : [26, 26, 26], count : 0, symbol : "Fe"}
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

  // Title
  writeText("Origin", 20, 50, "45px", "#feda4a")

  // Energy
  drawImage("./res/ui/EnergyIcon.png", 20, 80, 32, 32)
  writeText("Energia: " + energy, 55, 102, "20px", "white")

  

  // Elements
  drawRect(-2, window.innerHeight - 218, window.innerWidth + 3, 220, "white")

  drawElement(elements.h, 114,80,114,60)
  drawElement(elements.he, 315,280,302,280)
  drawElement(elements.c, 510,480,513,460)
  drawElement(elements.o, 710,680,714,670)
  drawElement(elements.al, 910,880,904,860)
  drawElement(elements.si, 1110,1080,1102,1070)
  drawElement(elements.fe, 1310,1280,1300,1280)
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

function drawElement(element, xZ, xI, xS, xN){
  writeText("Costo: " + element.cost[0], xZ - 13, window.innerHeight - 180, "13px", "white")
  drawImage("./res/ui/ContainerIcon.png", xI, window.innerHeight - 170, 100, 100)
  writeText(element.symbol, xS, window.innerHeight - 107, "50px", "black", "bold")
  writeText(element.name + ": " + element.count, xN, window.innerHeight - 35, "20px", "white")
}

function drawButton(x, y, w, h, xText, yText, condition = true,text1, text2 = ""){
  drawRect(x,y, w,h, "#57585b")
  gameArea.context.fillStyle = "#57585b" 
  gameArea.context.fillRect(x,y,w,h)
  if(condition){
    writeText(text1, xText, yText, "20px", "black", "bold")
  }else{
    writeText(text2, xText, yText, "20px", "black", "bold")
  }
}

function createElement(element){
  protons -= element.cost[0]
  electrons -= element.cost[1]
  neutrons -= element.cost[2]
  element.count += 1
}

function buttonClick(event, x, y, width, height) {
  return event.x > x && event.x < x + width && event.y > y && event.y < y + height
}

function canCreateElement(element){
  return protons > element.cost[0] - 1 && electrons > element.cost[1] - 1 && neutrons > element.cost[2] - 1
}

gameArea.canvas.addEventListener("click", (event) => {
    
}) 