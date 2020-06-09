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

let ui2 = false
let starCreating = true
let lifeStar = 0
let starSize = 1
let hasConverter = false
let converting = false
let conv_toH = true
let progressConverting = 0

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

  drawRect(-2, window.innerHeight - 218, window.innerWidth + 3, 220, "white")

  drawElement(elements.h, 114,80,114,60)
  drawElement(elements.he, 315,280,302,280)
  drawElement(elements.c, 510,480,513,460)
  drawElement(elements.o, 710,680,714,670)
  drawElement(elements.al, 910,880,904,860)
  drawElement(elements.si, 1110,1080,1102,1070)
  drawElement(elements.fe, 1310,1280,1300,1280)

  calcLifeStar()

  if(!ui2 && elements.h.count / 3 + elements.he.count > 1){
    ui2 = true
  }

  if(ui2){
    drawRect(window.innerWidth - 285, 130, 275, 150, "white")
    writeText("Vita della Stella", window.innerWidth - 273, 162, "25px", "white")
    drawRect(window.innerWidth - 270, 185, 250, 30, "white")
    gameArea.context.fillRect(window.innerWidth - 270, 185, lifeStar/100 * 210, 30)
    writeText("Arriva a " + starSize*75 + "H e " + starSize*25 + "He", window.innerWidth - 273, 250, "15px", "white")
  
    drawRect(10, 290, 275, 150, "white")
    writeText("Convertitore", 60, 315, "25px", "white")

    if(hasConverter){
      drawImage("./res/ui/EnergyIcon.png", 90, 350, 32, 32)
      if(conv_toH){
        writeText("=>",130,370,"20px","white")
      }else{
        writeText("<=",130,370,"20px","white")
      }
      drawImage("./res/ui/NeutronIcon.png", 170, 350, 32, 32)
    }else{
      writeText("Per iniziare crea: 1Fe, 1O, 1H", 20, 400, "14px", "white")
    }

    //button
    drawRect(20, 410, 255, 20, "#57585b")
    gameArea.context.fillStyle = "#57585b" 
    gameArea.context.fillRect(20, 410, 255, 20)
    if(converting){
      writeText("Stop!", 115, 425, "20px", "black", "bold")
    }else{
      writeText("Start!", 115, 425, "20px", "black", "bold")
    }
    
  }

  if(hasConverter && converting){
    clockConvert();
  }

  drawImage("./res/sprites/star.png", (window.innerWidth-lifeStar*starSize)/2,(window.innerHeight-lifeStar*starSize)/2 - 100, lifeStar*starSize,lifeStar*starSize) 
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

function calcLifeStar(){
  if(starCreating){
    let hCount = elements.h.count
    if(elements.h.count > 75 * starSize){
      hCount = 75 * starSize
    }
    let heCount = elements.he.count
    if(elements.he.count > 25* starSize){
      heCount = 25* starSize
    }
    lifeStar = hCount + heCount
    if(lifeStar == 100* starSize){
      starCreating = false
      elements.h.count += 1
    }
    return lifeStar
  }else{
    if(lifeStar > 0){
      lifeStar = Number((lifeStar-0.1).toFixed(1))
      let timeClick = Number((100/(starSize * 37)).toFixed(1))

      if(Number.isInteger(Number((lifeStar / timeClick).toFixed(2)))){
        elements.h.count -= 2
        elements.he.count += 1
        energy += 10
      }
    }else{
      lifeStar = 0
      starCreating = true
      starSize += 1
    }
    return lifeStar
  }
}

function clockConvert(){
  progressConverting += 0.05
  if(progressConverting >= 1){
    progressConverting = 0
    if(conv_toH){
      if(energy == 0){
        converting = false
      }else{
        energy -= 1
      elements.h.count += 1
      }
    }else{ 
      if(elements.h.count == 0){
        converting = false
      }else{
        energy += 1
      elements.h.count -= 1
      }
    }
  }
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
  }else if (buttonClick(event, 80, window.innerHeight - 170, 100, 100) && canCreateElement(elements.h)){
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
  }else if (buttonClick(event, 20, 410, 360, 20)){
    if(hasConverter){
      converting = !converting
    }else{
      if(elements.fe.count >= 1 && elements.o.count >= 1 && elements.h.count >= 1){
        elements.fe.count -= 1
        elements.o.count -= 1
        elements.h.count -= 1
        hasConverter = true
      }
    }
  }else if(buttonClick(event, 110,350,40,20) && hasConverter){
    conv_toH = !conv_toH
  }
}) 