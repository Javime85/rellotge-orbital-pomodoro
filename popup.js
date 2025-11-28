// Rellotge Orbital + Pomodoro per a popup 300x150
// Autor: Javier Villalón Mena
// Repte 3. <<Extensió web>>
// Desenvolupament d'aplicacions interactives - UOC
// Data: Novembre 2025

// CLAU LOCALSTORAGE per guardar estat del Pomodoro
const STORAGE_KEY = 'pomodoroState';

// Paletes de colors per fase: [hores, minuts, segons]
const paletteWork = ['#E60000', '#FFED29', '#00B341'];
const paletteShort = ['#0057E9', '#00C2FF', '#7C3AED'];
const paletteLong = ['#FF7800', '#FF1493', '#FFD700'];

// Colors de l'arc de progrés per fase
const progressWork  = '#0080ff';
const progressShort = '#9C27B0';
const progressLong  = '#0044cc';

// Sons per a canvi de fase (HTML5 Audio)
let sndWork, sndShort, sndLong;

// Paleta activa
let currentColors = [...paletteWork];

// Radis adaptats al canvas 300x100
const radii = [38, 28, 20];

// --- Estat Pomodoro ---
let pomRunning      = false;
let pomStartTime    = 0;
let pomTotalTime    = 0;
let pomPausedElapsed = 0;
let pomPhase        = 'work';
let pomCycles       = 0;

// Imatges de fase
let imgWork, imgShortBreak, imgLongBreak;

// DOM
let btnStart, btnPause, btnReset, labelFase;

// ---------- PRELOAD ----------
function preload() {
  // Comentari: carreguem les imatges per a cada fase del Pomodoro
  imgWork       = loadImage('assets/work.png');
  imgShortBreak = loadImage('assets/shortbreak.png');
  imgLongBreak  = loadImage('assets/longbreak.png');
}

// ---------- SETUP ----------
function setup() {
  let canvas = createCanvas(300, 100);
  canvas.parent('sketch-holder');

  angleMode(DEGREES);
  imageMode(CENTER);
  textAlign(CENTER, CENTER);

  // Comentari: obtenim referències DOM i associem events
  btnStart  = select('#btnStart');
  btnPause  = select('#btnPause');
  btnReset  = select('#btnReset');
  labelFase = select('#faseActual');

  if (btnStart) btnStart.mousePressed(startPomodoro);
  if (btnPause) btnPause.mousePressed(togglePause);
  if (btnReset) btnReset.mousePressed(resetPomodoro);

  // Comentari: inicialitzem sons
  sndWork  = new Audio('assets/work.mp3');
  sndShort = new Audio('assets/short.mp3');
  sndLong  = new Audio('assets/long.mp3');

  [sndWork, sndShort, sndLong].forEach(s => {
    if (!s) return;
    s.preload = 'auto';
    s.volume = 0.7;
  });

  // ========================================
  // COMENTARI: RECUPEREM ESTAT DES DE LOCALSTORAGE
  // ========================================
  loadPomodoroState();

  // Comentari: apliquem paleta i actualitzem UI segons estat recuperat
  applyPhasePalette(pomPhase);
  updatePhaseLabel();
  
  // Comentari: mostrem/ocultem etiqueta segons si està actiu
  if (labelFase) {
    labelFase.style('display', pomRunning || pomTotalTime > 0 ? 'block' : 'none');
  }
}

// ========================================
// FUNCIONS LOCALSTORAGE p5.js
// ========================================

// Comentari: guarda tot l'estat del Pomodoro a localStorage
function savePomodoroState() {
  const state = {
    pomPhase,
    pomTotalTime,
    pomPausedElapsed,
    pomCycles,
    pomRunning,
    lastUpdate: millis()  // per calcular temps transcorregut
  };
  storeItem(STORAGE_KEY, state);
}

// Comentari: recupera i restaura l'estat del Pomodoro
function loadPomodoroState() {
  const saved = getItem(STORAGE_KEY);
  
  if (saved) {
    // Comentari: restaurem valors bàsics
    pomPhase = saved.pomPhase || 'work';
    pomTotalTime = saved.pomTotalTime || 0;
    pomPausedElapsed = saved.pomPausedElapsed || 0;
    pomCycles = saved.pomCycles || 0;
    pomRunning = saved.pomRunning || false;
    
    // Comentari: si estava corrent, ajustem pomStartTime pel temps transcorregut
    if (pomRunning && saved.lastUpdate) {
      const timePassed = millis() - saved.lastUpdate;
      pomStartTime = millis() - (timePassed); // ajustem per continuar des d'on vam parar
    }
    
    console.log('Estat Pomodoro restaurat:', saved);
  }
}

// ---------- DRAW ----------
function draw() {
  background('#f7fbff');

  push();
  translate(width / 2, height / 2);
  noStroke();
  fill(255, 255, 255, 230);
  ellipse(0, 0, 90, 90);
  pop();

  push();
  translate(width / 2, height / 2);

  updatePomodoro();

  const h = hour() % 12;
  const m = minute();
  const s = second();

  drawOrbit(radii[0], currentColors[0]);
  drawOrbit(radii[1], currentColors[1]);
  drawOrbit(radii[2], currentColors[2]);

  drawOrbitalPoint(radii[0], h * 30 + (m * 0.5) - 90, currentColors[0], 13);
  drawOrbitalPoint(radii[1], m * 6 + (s * 0.1) - 90, currentColors[1], 9);
  drawOrbitalPoint(radii[2], s * 6 - 90, currentColors[2], 7);

  const pomProgress = getPomProgress();
  drawPomodoroArc(pomProgress);
  drawPhaseImage(pomProgress);

  pop();
}

// ---------- FUNCIONS AUXILIARS ----------

function drawOrbit(radius, col) {
  noFill();
  stroke(col);
  strokeWeight(2.5);
  ellipse(0, 0, radius * 2, radius * 2);
}

function drawOrbitalPoint(radius, angle, col, size) {
  push();
  rotate(angle);
  noFill();
  stroke(col + '40');
  strokeWeight(1.2);
  ellipse(radius, 0, size * 1.5, size * 1.5);
  stroke('#ffffff');
  strokeWeight(1);
  fill(col);
  ellipse(radius, 0, size, size);
  pop();
}

function drawPomodoroArc(pomProgress) {
  if (!pomTotalTime) return;

  let colArc;
  if (pomPhase === 'work') colArc = color(progressWork);
  else if (pomPhase === 'shortBreak') colArc = color(progressShort);
  else colArc = color(progressLong);

  const r = radii[0] + 8;
  const angleSpan = 360 * (1 - pomProgress);

  noFill();
  stroke(colArc);
  strokeWeight(3);
  arc(0, 0, r * 2, r * 2, -90, -90 + angleSpan);
}

// ---------- LÒGICA POMODORO ----------

function updatePomodoro() {
  if (!pomRunning || !pomTotalTime) return;
  const elapsed = millis() - pomStartTime + pomPausedElapsed;
  const progress = constrain(elapsed / pomTotalTime, 0, 1);
  if (progress >= 1) {
    nextPomPhase();
  }
  // Comentari: guardem estat cada segon mentre corre
  if (frameCount % 60 === 0) savePomodoroState();
}

function getPomProgress() {
  if (!pomTotalTime) return 0;
  let elapsed = pomPausedElapsed;
  if (pomRunning) elapsed += millis() - pomStartTime;
  return constrain(elapsed / pomTotalTime, 0, 1);
}

function setPomPhase(newPhase) {
  pomPhase = newPhase;

  // Durades ESTÀNDARD del Pomodoro
  if (pomPhase === 'work') {
    pomTotalTime = 25 * 60 * 1000;  // 25 minuts
  } else if (pomPhase === 'shortBreak') {
    pomTotalTime = 5 * 60 * 1000;   // 5 minuts
  } else if (pomPhase === 'longBreak') {
    pomTotalTime = 15 * 60 * 1000;  // 15 minuts
  }

  pomStartTime     = millis();
  pomPausedElapsed = 0;
  pomRunning       = true;

  // So de la nova fase
  if (pomPhase === 'work' && sndWork) {
    sndWork.currentTime = 0;
    sndWork.play().catch(e => console.log('So work no disponible'));
  } else if (pomPhase === 'shortBreak' && sndShort) {
    sndShort.currentTime = 0;
    sndShort.play().catch(e => console.log('So short no disponible'));
  } else if (pomPhase === 'longBreak' && sndLong) {
    sndLong.currentTime = 0;
    sndLong.play().catch(e => console.log('So long no disponible'));
  }

  applyPhasePalette(pomPhase);
  if (labelFase) labelFase.style('display', 'block');
  updatePhaseLabel();
  
  // Comentari: guardem estat nou
  savePomodoroState();
}

function updatePhaseLabel() {
  if (!labelFase) return;
  if (pomPhase === 'work') {
    labelFase.html('Treball');
    labelFase.style('color', paletteWork[0]);
  } else if (pomPhase === 'shortBreak') {
    labelFase.html('Descans curt');
    labelFase.style('color', paletteShort[0]);
  } else if (pomPhase === 'longBreak') {
    labelFase.html('Descans llarg');
    labelFase.style('color', paletteLong[0]);
  }
}

function nextPomPhase() {
  if (pomPhase === 'work') {
    pomCycles++;
    if (pomCycles % 4 === 0) setPomPhase('longBreak');
    else setPomPhase('shortBreak');
  } else {
    setPomPhase('work');
  }
}

function applyPhasePalette(phase) {
  if (phase === 'work') currentColors = [...paletteWork];
  else if (phase === 'shortBreak') currentColors = [...paletteShort];
  else if (phase === 'longBreak') currentColors = [...paletteLong];
}

// ---------- BOTONS ----------

function startPomodoro() {
  if (!pomTotalTime) {
    setPomPhase('work');
    return;
  }
  if (!pomRunning) {
    pomStartTime = millis();
    pomRunning   = true;
    if (labelFase) labelFase.style('display', 'block');
    savePomodoroState();  // Comentari: guardem quan reprenem
  }
}

function togglePause() {
  if (pomRunning) {
    pomPausedElapsed += millis() - pomStartTime;
    pomRunning = false;
    if (labelFase) labelFase.style('display', 'none');
  } else if (pomTotalTime > 0) {
    pomStartTime = millis();
    pomRunning   = true;
    if (labelFase) labelFase.style('display', 'block');
  }
  savePomodoroState();  // Comentari: guardem en cada pausa/repren
}

function resetPomodoro() {
  pomRunning       = false;
  pomStartTime     = 0;
  pomTotalTime     = 0;
  pomPausedElapsed = 0;
  pomCycles        = 0;
  pomPhase         = 'work';
  applyPhasePalette('work');
  if (labelFase) labelFase.style('display', 'none');
  savePomodoroState();  // Comentari: guardem reset
}

function drawPhaseImage(pomProgress) {
  if (!pomTotalTime) return;

  let img = imgWork;
  if (pomPhase === 'shortBreak') img = imgShortBreak;
  else if (pomPhase === 'longBreak') img = imgLongBreak;
  if (!img) return;

  const eased = pow(1 - pomProgress, 0.8);
  const maxSize = 30;
  const minSize = 0;
  const sizeImg = lerp(minSize, maxSize, eased);
  const alpha   = 255 * eased;

  if (sizeImg < 1 || alpha < 5) return;

  push();
  tint(255, alpha);
  image(img, 0, 0, sizeImg, sizeImg);
  pop();
}
