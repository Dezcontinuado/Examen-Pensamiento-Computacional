let etapa = 1;

// Variables de posición y estado
let aliciaX, aliciaY, aliciaW, aliciaH;
let conejoX, conejoY;
let mesaX, mesaY;
let cerrojoY;
let elementosTe = [];
let gatoX, gatoY, gatoAlpha, gatoContador, gatoTimer;
let rosas = [];
let rosasTimer;
let cartaIzqX, cartaDerX;
let anguloEspiral = 0; // Nueva variable para controlar la rotación infinita del fondo

// --- VARIABLES PARA LAS IMÁGENES ---
let imgAliciaFrente, imgAliciaCaida, imgAliciaEspalda, imgAliciaPerfil, imgAliciaChica;
let imgConejo;
let imgMesa;
let imgCerrojo;
let imgGuardias;
let imgRosaBlanca, imgRosaRoja; 
let imgTetera, imgTaza;      
let imgGato;                 
let imgEspiral; // Nueva variable para almacenar la imagen del reloj/espiral

// --- PRECARGA DE ASSETS (TODOS EN .PNG) ---
function preload() {
  imgAliciaFrente = loadImage('Alicia 1.png');
  imgAliciaCaida = loadImage('Alicia 2.png');
  imgAliciaEspalda = loadImage('Alicia 3.png'); 
  imgAliciaPerfil = loadImage('Alicia 4.png');  
  imgAliciaChica = loadImage('Alicia 5-6-8.png');
  
  imgConejo = loadImage('Sr. Conejo 1.png');
  imgMesa = loadImage('Mesa 4.png');
  imgCerrojo = loadImage('cerradura 5.png');
  imgGuardias = loadImage('guardias 9.png');
  
  imgRosaBlanca = loadImage('Rosa blanca.png'); 
  imgRosaRoja = loadImage('Rosa roja.png');     
  
  imgTetera = loadImage('tetera.png');
  imgTaza = loadImage('taza .png'); 
  imgGato = loadImage('Gato sonriente.png'); 
  imgEspiral = loadImage('Reloj alicia.jpg'); 
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER); 
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  inicializarEtapa(1);
}

function draw() {
  background(245, 242, 225); // Fondo Beige

  switch (etapa) {
    case 1: dibujarEtapa1(); break;
    case 2: dibujarEtapa2(); break;
    case 3: dibujarEtapa3(); break;
    case 4: dibujarEtapa4(); break;
    case 5: dibujarEtapa5(); break;
    case 6: dibujarEtapa6(); break;
    case 7: dibujarEtapa7(); break;
    case 8: dibujarEtapa8(); break;
    case 9: dibujarEtapa9(); break;
    case 10: dibujarEtapa10(); break;
  }
}

// --- INITIALIZADORES DE CADA ETAPA ---
function inicializarEtapa(n) {
  etapa = n; // actualiza la variable global para que sepa en que etapa esta
  
  // ubica aicia abajo a la izquiera para cuando alicia es pequeña y no tiene animación para las etapas que la llaman
  let aliciaPequenaX = width * 0.3;
  let aliciaPequenaY = height * 0.75;

  if (n === 1) {
    aliciaX = width / 2;
    aliciaY = height / 2;
    conejoX = 0;
    conejoY = height / 2;
  } else if (n === 2) {
    aliciaX = width / 2;
    aliciaY = -100; // Inicia arriba para ir cayendo con el scroll
  } else if (n === 3) {
    aliciaX = width * 0.5; 
    aliciaY = height * 0.6;
    aliciaW = 400; 
    mesaX = -150;
    mesaY = height * 0.65;
  } else if (n === 4) {
    aliciaX = width * 0.35;
    aliciaW = 400; 
    mesaX = width * 0.65;
    mesaY = height * 0.65;
  } else if (n === 5) {
    aliciaX = aliciaPequenaX;
    aliciaY = aliciaPequenaY;
    cerrojoY = -150;
  } else if (n === 6) {
    aliciaX = aliciaPequenaX;
    aliciaY = aliciaPequenaY;
    
    elementosTe = []; //elimina todo lo anterior
    for (let i = 0; i < 20; i++) { //crea las 20 tazas y teteras 
      elementosTe.push({
        x: random(-600, -50),
        y: random(50, height - 50),
        tipo: random(['tetera', 'taza']),
        velocidad: random(3, 6)
      });
    }
  } else if (n === 7) {
    aliciaX = aliciaPequenaX;
    aliciaY = aliciaPequenaY;

    //contadores del gato
    gatoContador = 0;
    gatoAlpha = 0;
    gatoTimer = 0;
    cambiarGatoPosicion(); //tira un numero random donde posicionar al gato 
  } else if (n === 8) {
    aliciaX = aliciaPequenaX;
    aliciaY = aliciaPequenaY;
    rosasTimer = millis(); //cuenta el tiempo desde que entramos a esta etapay te obliga a quedarte los 10 segundos que dura la animación. 
    
    rosas = [];
    for(let i = 0; i < 15; i++) { //crea las 15 rosas
      rosas.push({
        x: random(width),
        y: random(height),
        rot: random(TWO_PI), //rotación 360
        velRot: random(-0.02, 0.02),
        tipo: random(['roja', 'blanca'])
      });
    }
  } else if (n === 9) {
    aliciaX = aliciaPequenaX;
    aliciaY = aliciaPequenaY;
  }
}

// --- DIBUJOS DE ETAPAS ---

function dibujarEtapa1() {
  dibujarAlicia(aliciaX, aliciaY, 250, "frente");

  //pregunta si el conejo au no atraveso la pantalla
  if (conejoX < width + 100) {
    conejoX += 4; // si es verdad lo mueve, este sirve para el desplazamiento del conejo y su velocidad
    dibujarConejo(conejoX, conejoY);
  } else {
    mostrarTextoIndicador("Presiona ESPACIO", width / 2, 50);
  }
}

function dibujarEtapa2() {
  dibujarAlicia(aliciaX, aliciaY, 250, "caida");
  
  // Modificado: Mensaje arriba al centro mientras cae
  if (aliciaY < height + 100) {
    mostrarTextoIndicador("Usa la RUEDA DEL MOUSE (Scroll) para caer", width / 2, 50); // con esto se controla la caida
  } else {
    // Avanza a la etapa 3 una vez que sale de la pantalla
    inicializarEtapa(3);
  }
}

function dibujarEtapa3() {
  if (aliciaX > width * 0.35) aliciaX -= 2;
  if (mesaX < width * 0.65) mesaX += 3.5;
  
  dibujarMesa(mesaX, mesaY, 200);
  dibujarAlicia(aliciaX, aliciaY, aliciaW, "espalda");

  // hace que alicia "camine" hasta llegar al 35% de la pantalla 
  if (aliciaX <= width * 0.35 && mesaX >= width * 0.65) {
    // Modificado: Movido arriba al centro (Y = 50)
    mostrarTextoIndicador("Presiona TAB", width / 2, 50);
  }
}

function dibujarEtapa4() {

  // pregunta si la mesa aun esta en la pantalla 
  if (mesaX < width + 200) {
    mesaX += 5; // velocidad de la mesa
  } else {
    mostrarTextoIndicador("Presiona CLICK en la pantalla", width / 2, 50);
  }
  dibujarMesa(mesaX, mesaY, 200);
  dibujarAlicia(aliciaX, height * 0.65, aliciaW, "perfil");
}

function dibujarEtapa5() {
  dibujarAlicia(aliciaX, aliciaY, 180, "chica"); 
 
  // pregunta si el cerroja esta en pantalla 
  if (cerrojoY < height * 0.5) {
    cerrojoY += 3; //velocidad del cerrojo
  } else {
    mostrarTextoIndicador("Presiona A", width / 2, 50);
  }
  dibujarCerrojo(width * 0.6, cerrojoY, 300);
}

function dibujarEtapa6() {
  dibujarAlicia(aliciaX, aliciaY, 180, "chica"); 
  
  let todosFuera = true; // se asegura que no hay nada en pantalla solo alicia
  for (let item of elementosTe) {
    item.x += item.velocidad; // llama al comando de elementosTe que es el que crea las 20 teteras y tazas y les da una velocidad individual sumandole x     
    if (item.tipo === 'tetera') { // se fija que tipo es tetera y se crearan de 60x60 en caso de que no sea se crearan tazas de 45x45
      image(imgTetera, item.x, item.y, 60, 60);
    } else {
      image(imgTaza, item.x, item.y, 45, 45);
    }

    // pregunta si ya todas las tazas y teteras estan fuera de pantalla, dando un FALSE O TRUE para poder insertar el texto
    if (item.x < width + 50) todosFuera = false;
  }
  
  if (todosFuera) {
    mostrarTextoIndicador("Presiona L", width / 2, 50);
  }
}

function dibujarEtapa7() {
  dibujarAlicia(aliciaX, aliciaY, 180, "chica"); 
  if (gatoContador < 10) { // pregunta si el gato no ha hecho sus 10 apariciones
    gatoTimer += deltaTime;

    //esta parte sirve para la opacidad del gato, traduce el tiempo (0 a 1500) a una escala de angulos del 0 al pi, esto genera una curba que va del 0 al 1 y gradualemente va subiendo y bajando la opacidad donde a los 750 llega a lo ms nitido y luego vuelve a bajar y eso da el efecto de desvanecimiento 
    gatoAlpha = sin(map(gatoTimer, 0, 1500, 0, PI)) * 255; 
    
    push();
    tint(255, gatoAlpha); // le dice que pinte al gato con la opacidad calculada en gatoAlpha
    image(imgGato, gatoX, gatoY, 120, 120);
    pop();

    if (gatoTimer >= 1500) { // le asigna 1,5 segundos para que el gato aparezca y desaparezca
      gatoTimer = 0; //pone el reloj en 0 para iniciar con el proximo gato 
      gatoContador++; //suma al contador
      cambiarGatoPosicion(); //llama al gato a distintas posiciones
    }
  } else {
    mostrarTextoIndicador("Presiona I", width / 2, 50);
  }
}
 // posiciones del gato
function cambiarGatoPosicion() {
  gatoX = random(100, width - 100);
  gatoY = random(100, height - 100);
}

function dibujarEtapa8() {

  // es el bucle que llama a las 15 rosas a girar 
  for(let r of rosas) {
    push();
    translate(r.x, r.y); //sirve para que giren en su propio eje asignandole el eje de rx y ry a cada rosa
    r.rot += r.velRot; // srive para ver en que angulo esta la rosa y sumarle para que siga rotando cada una
    rotate(r.rot); // es la rotación 
    dibujarRosa(0, 0, 60, r.tipo); 
    pop();
  }

  // sirve para dejar afuera alicia de la rotación y ella no lo haga
  dibujarAlicia(aliciaX, aliciaY, 180, "chica"); 
  if (millis() - rosasTimer > 10000) {
    mostrarTextoIndicador("Presiona C", width / 2, 50);
  }
}

function dibujarEtapa9() {
  dibujarGuardias(width / 2, height / 2, 750);
  //dibujarAlicia(aliciaX, aliciaY, 180, "chica"); 
  
  // Modificado: Movido arriba al centro (Y = 50)
  mostrarTextoIndicador("Presiona E", width / 2, 50);
}

// Modificado: Eliminado el reloj vectorial e incorporada tu imagen en rotación gigante sin bordes
function dibujarEtapa10() {
  push();
  translate(width / 2, height / 2); // Centra en la pantalla
  
  anguloEspiral += 0.01; // Incrementa el ángulo todo el rato para el giro infinito
  rotate(anguloEspiral);
  
  // Escala la imagen según el lado más grande de la pantalla para tapar esquinas y bordes
  let tamanoImagen = max(width, height) * 1.5; 
  image(imgEspiral, 0, 0, tamanoImagen, tamanoImagen);
  pop();
}

// --- ENTRADAS CONTROLADAS ---

function keyPressed() {
  if (etapa === 1 && keyCode === 32 && conejoX >= width + 100) { 
    inicializarEtapa(2);
  } 
  else if (etapa === 3 && keyCode === TAB && aliciaX <= width * 0.36 && mesaX >= width * 0.64) {
    inicializarEtapa(4);
    return false; 
  } 
  else if (etapa === 5 && (key === 'A' || key === 'a') && cerrojoY >= height * 0.49) {
    inicializarEtapa(6);
  } 
  else if (etapa === 6 && (key === 'L' || key === 'l')) {
    let listos = true;
    for(let item of elementosTe) { if(item.x < width + 50) listos = false; }
    if(listos) inicializarEtapa(7);
  } 
  else if (etapa === 7 && (key === 'I' || key === 'i') && gatoContador >= 10) {
    inicializarEtapa(8);
  } 
  else if (etapa === 8 && (key === 'C' || key === 'c') && (millis() - rosasTimer > 10000)) {
    inicializarEtapa(9);
  } 
  else if (etapa === 9 && (key === 'E' || key === 'e')) {
    inicializarEtapa(10);
  }
}

// Modificado: Ahora el scroll afecta directamente a la posición Y de Alicia en la Etapa 2
function mouseWheel(event) {
  if (etapa === 2) {
    // event.delta devuelve valores positivos al hacer scroll hacia abajo
    if (event.delta > 0) {
      aliciaY += 15; // Velocidad de caída por cada movimiento de scroll
    }
    return false; // Evita el comportamiento de scroll por defecto del navegador
  }
}

function mousePressed() {
  if (etapa === 4 && mesaX >= width + 190) {
    inicializarEtapa(5);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// --- AUXILIARES DE DISEÑO ---

function mostrarTextoIndicador(txt, x, y) {
  push();
  fill(50);
  noStroke();
  textSize(22);
  textStyle(BOLD);
  text(txt, x, y);
  pop();
}

function dibujarAlicia(x, y, tam, vista) {
  push();
  if (vista === "frente") {
    image(imgAliciaFrente, x, y, tam * 0.65, tam);
  } else if (vista === "caida") {
    image(imgAliciaCaida, x, y, tam * 1.2, tam);
  } else if (vista === "espalda") {
    image(imgAliciaEspalda, x, y, tam * 1.2, tam);
  } else if (vista === "perfil") {
    image(imgAliciaPerfil, x, y, tam * 0.65, tam);
  } else if (vista === "chica") {
    image(imgAliciaChica, x, y, tam * 0.62, tam);
  }
  pop();
}

function dibujarConejo(x, y) {
  push();
  image(imgConejo, x, y, 130, 200);
  pop();
}

function dibujarMesa(x, y, tam) {
  push();
  image(imgMesa, x, y, tam * 1.6, tam * 2.5);
  pop();
}

function dibujarCerrojo(x, y, tam) {
  push();
  image(imgCerrojo, x, y, tam * 0.8, tam);
  pop();
}

function dibujarRosa(x, y, tam, tipo) {
  push();
  if (tipo === 'roja') {
    image(imgRosaRoja, x, y, tam, tam);
  } else {
    image(imgRosaBlanca, x, y, tam, tam);
  }
  pop();
}

function dibujarGuardias(x, y, tam) {
  push();
  image(imgGuardias, x, y, tam * 1.3, tam);
  pop();
}