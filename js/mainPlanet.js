let energy = 1000
let elements = { // Il costo resta in una lista perchè dal passaggio di una fase e l'altra si crerebbero problemi.
  h : {name : "Idrogeno", cost : [1], count : 0, symbol : "H"}, 
  he : {name : "Elio", cost : [2], count : 0, symbol : "He"},
  c : {name : "Carbonio", cost : [6], count : 0, symbol : "C"},
  o : {name : "Ossigeno", cost : [8], count : 0, symbol : "O"},
  si : {name : "Silicio", cost : [14], count : 0, symbol : "Si"},
  al : {name : "Alluminio", cost : [13], count : 0, symbol : "Al"},
  fe : {name : "Ferro", cost : [26], count : 0, symbol : "Fe"},
  p : {name : "Fosforo", cost : [15], count : 0, symbol : "P"},
  k : {name : "Potassio", cost : [19], count : 0, symbol : "K"},
  n : {name : "Azoto", cost: [7], count : 0, symbol : "N"},
  na : {name : "Sodio", cost : [11], count : 0, symbol : "Na"},
  s : {name : "Zolfo", cost : [16], count : 0, symbol : "S"}
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
  if (localStorage.getItem("energy") !== null) {
    loadVar()
  }
}

function update() {
  gameArea.clear()

  saveVar()

  // Title
  writeText("Origin", 20, 50, "45px", "#feda4a")

  // Reset Button
  drawButton(window.innerWidth - 170, 25, 150, 40, window.innerWidth - 127, 50, true, "Reset")

  // Energy
  drawImage("./res/ui/EnergyIcon.png", 20, 80, 32, 32)
  writeText("Energia: " + energy, 55, 102, "20px", "white")

  // Elements
  drawRect(-2, window.innerHeight - 218, window.innerWidth + 3, 220, "white") // Si potrebbe alzare questa
                                                                              // riga in modo da inserire 9
                                                                              // elementi in una riga e gli
                                                                              // altri 3 sotto.

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

function drawElement(element, xZ, xI, xS, xN){ // In una riga ci stanno solo 9 elementi, ne vanno disegnati 12
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
  // Non usiamo più elettroni, protoni e neutroni: il gioco sarebbe lento.
}

function buttonClick(event, x, y, width, height) {
  return event.x > x && event.x < x + width && event.y > y && event.y < y + height
}

function canCreateElement(element){
  // Non usiamo più elettroni, protoni e neutroni: il gioco sarebbe lento.
}

function saveVar() {
  localStorage.setItem("energy", energy)
  localStorage.setItem("elements", JSON.stringify(elements))
}

function loadVar() {
  energy = parseInt(localStorage.getItem("energy"))
  elements = JSON.parse(localStorage.getItem("elements"))
}

function reset(){ // Il reset riporta in star.html
  energy = 1000
  protons = 0
  electrons = 0
  neutrons = 0
  elements = {               
    h : {name : "Idrogeno", cost : [1, 1, 0], count : 0, symbol : "H"}, 
    he : {name : "Elio", cost : [2, 2, 2], count : 0, symbol : "He"},
    c : {name : "Carbonio", cost : [6, 6, 6], count : 0, symbol : "C"},
    o : {name : "Ossigeno", cost : [8, 8, 8], count : 0, symbol : "O"},
    si : {name : "Silicio", cost : [14, 14, 14], count : 0, symbol : "Si"},
    al : {name : "Alluminio", cost : [13, 13, 13], count : 0, symbol : "Al"},
    fe : {name : "Ferro", cost : [26, 26, 26], count : 0, symbol : "Fe"}
  }

  ui2 = false
  starCreating = true
  lifeStar = 0
  starSize = 1
  hasConverter = false
  converting = false
  conv_toH = true
  progressConverting = 0
  fusion = false
  progressingFusion = 0
  convert_time = 0.05

  saveVar()

  window.open("./star.html", "_self")
}   

gameArea.canvas.addEventListener("click", (event) => {

  // Reset Button
  if(buttonClick(event, window.innerWidth - 170, 25, 150, 40)) {
    reset()
  }

  // Elements
  else if (buttonClick(event, 80, window.innerHeight - 170, 100, 100) && canCreateElement(elements.h)){
    createElement(elements.h)
  }else if (buttonClick(event, 280, window.innerHeight - 170, 100, 100) && canCreateElement(elements.he)){
    createElement(elements.he)
  }else if (buttonClick(event, 480, window.innerHeight - 170, 100, 100) && canCreateElement(elements.c)){
    createElement(elements.c)
  }else if (buttonClick(event, 680, window.innerHeight - 170, 100, 100) && canCreateElement(elements.o)){
    createElement(elements.o)
  }else if (buttonClick(event, 880, window.innerHeight - 170, 100, 100) && canCreateElement(elements.al)){
    createElement(elements.al)
  }else if (buttonClick(event, 1080, window.innerHeight - 170, 100, 100) && canCreateElement(elements.si)){
    createElement(elements.si)
  }else if (buttonClick(event, 1280, window.innerHeight - 170, 100, 100) && canCreateElement(elements.fe)){
    createElement(elements.fe)
  }
}) 