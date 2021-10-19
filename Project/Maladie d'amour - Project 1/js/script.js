/**
La tempête
Lucien Cusson-Fradet

This Project uses the code of Exercice 3 as a starting point.
The program is part animation, part game.
!! To avoid sound glitches, please use with Firefox !!

KEYBOARD CONTROLS are displayed on the game screen but, if it's a bit confusing, here they are:
- SPACEBAR: Jump OR Deploy Parachute OR Hide Parachute OR Triggers the Bird
- SHIFT: Shifts gears of the car (Between Drive and Reverse)
- W: Gas pedal
- S: Break pedal
- BACKSPACE: secret key, allows to skip the game and witness the ending.

!!!DISCLAIMER!!! The characters in the game are voiced and use offensive québécois swear words! !!!DISCLAIMER!!!

Song Credit:
  Chaplin, Charlie. "Afternoon - From `City Lights`" Charlie Chaplin Film Music Anthology, ED., Roy Export SAS, 2019
  2. Spotify, URL(https://open.spotify.com/track/12WdxB3jtDP61Awq3xuOql?si=69863b423a964a10)

  Classels, Les. "Avant de me dire adieu" Les 16 Plus Grands Succès, ED., Disques Mérite, 1997
  16. Spotify, URL(https://open.spotify.com/track/2gBAkCt13G1Di0398fIgTE?si=3ca45b0aa8fd421e)

*/

/* TODOLIST
TODO LIST Project 1
- Add graphics to the game
- Add an intro section with animated rain drops?
- Animate the title screen
- Tweak the gameplay, how to make it more fun?
  * Defferent controls for the car?
  * Possibility to do a yoshi jump while in the air?
  *
- Ajouter du sond pour la plupart des intéractions
- create a better Ending
- Adding choice in the dialogue?

UPDATED TODO LIST:
* Do the Outro
* Add the controls informations
* Add the voice Acting
* Fix the car collisions
* Fix the decelerate function for the car
* Fix the difficulty level switch event
- Fix the Parachute vs Bird
- Bonus: adding animated whippers to the intro scene
*/

"use strict";
let canvasWidth = 650;
let canvasHeight = 500;
let collision = 0;

//Images
let img = {
  loverSpriteJump: undefined,
  loverSpriteStd: undefined,
  loverSpriteRot: undefined,
  loverSpriteParr: undefined,
  loverSpriteBird: undefined,
  carTrampo: undefined,
  carTrampoJump: undefined,
  birdSprite1: undefined,
  birdSprite2: undefined,
  titleScreen: undefined,
  whoAreYou: undefined,
  noLove: undefined,
  deception: undefined,
  gameBackground: undefined,
  gameForeground: undefined,
  tree: undefined,
  introBackground1: undefined,
  introBackground2: undefined,
  introBackground3: undefined,
  introCar: undefined,
  introCarLights: undefined,
  introCarInterior: undefined,
  endingBackground1: undefined,
  endingBackground1: undefined,
  endingBackground1: undefined,
  endingSilouette: undefined,
  endingDoor: undefined,
  accelerateur: undefined,
  accelerateurActive: undefined,
  frein: undefined,
  freinActive: undefined,
  shift: undefined,
  parachute: undefined,
  parachuteActive: undefined,
  mouse: undefined,
  delay: 0,
  zoom: 0
}

//Sounds
let snd = {
  titleMusic: undefined,
  gameMusic: undefined,
  endMusic: undefined,
  lightRain: undefined,
  rainForest: undefined,
  thunder: undefined,
  tree: undefined,
  bounce1: undefined,
  jump: undefined,
  trampoSound: undefined,
  parachute: undefined,
  parachuteClose: undefined,
  carTreeHit: undefined,
  carHit1: undefined,
  carBreak: undefined,
  carEngine: undefined,
  carGearSwitch: undefined,
  carAccelerates: undefined,
  carRain: undefined,
  heavyRain: undefined,
  footsteps: undefined,
  thunderClose: undefined,
  doorOpen: undefined,
  doorBang: undefined,
  stress: undefined
}

//sounds for dialogues
let sndDia = {
  a1: undefined,
  a2: undefined,
  a3: undefined,
  a4: undefined,
  a6: undefined,
  a5: undefined,
  a7: undefined,
  a8: undefined,
  a9: undefined,
  a10: undefined,
  a11: undefined,
  a12: undefined,
  a13: undefined,
  a14: undefined,
  a15: undefined,
  a16: undefined,
  a17: undefined,
  a18: undefined,
  a19: undefined,
  a20: undefined,
  a21: undefined,
  a22: undefined,
  laisseFaire: undefined,
  ouvreLaPorte: undefined,
  sacrament: undefined,
  tabarnack: undefined,
  reconnait: undefined
}

//State of the program
let state = `titleNoSound`;
let introState = false;
let carMoving = 0;

//Keeps track of failed attempt and switches the difficulty setting.
let difficulty = {
  easy: false,
  counter: 0,
  niceAttempt: false
}

//Delay to fix the title skipping a state
let stateDelay = 0;

let dia = { //dia means dialogue
  yoster: undefined,
  delay: 0,
  offset: 0,
  slow:2,
  fast:1,
  textSpeed: 2,
  textSwitch: 1,
  done: false,
  a1:"LHey! Écoûte s'qu'y disent!",
  a2:"RLa tempête qui s'abat sur l'ouest de la province fait     des ravages.",
  a3:"RLes dommages causé par des vents de plus de 80 km        heure bloque l'accès à plusieurs routes.",
  a4:"RHydro Québec est en état d'alarme...",
  a5:"R*shkt*",
  a6:"MM'a virer d'bord calice!",
  a7:"LHey ciboire!",
  a8:"MCriss, Tu m'fais pogner l'ch'min dans l'bois!",
  a9:"MAvec la trampoline de mon gars dans l'trailer                   en arrière!",
  a10:"MPis y pleut comme une chienne!",
  a11:"MLa j'commence à m'dire que t'es p'tête tombée                  su'à'tête!",
  a12:"LS't'es la dernière soirée, tu l'sais qu'demain, a part         pis a r'viens plus.",
  a13:"LLa madame au dep m'a dit que la grand route est bloquéefac on passe par icitte, c'est toute.",
  a14:"MHmm... J'comprends même pas qu'est-ce tu veux faire.",
  a15:"LCiboire, j't'ai déjà toute expliqué...",
  a16:"LLa route est farmé, on passe par le chemin Tremblay.",
  a17:"LRendu dans le parking du sentier des moulins, On prend la trampoline du p'ti Michel",
  a18:"Lpis tu t'arranges pour que j'me ramasse en haut d'la     falaise.",
  a19:"LAnyway, chie pas dans tes culottes. En cas que j'tombe, j'ai ramassé l'gros foulard à ma mère.",
  a20:"MEh sacrament... Pis tu penses qu'à va faire quoi quand    a va voir ta vielle gueule à sa porte?",
  a21:"L...",
  a22:"LS't'icitte, à gauche! Break ciboire! Check la pancarte!",
  totalDialogues: 22
  }

//Did not manage to automate this operation so here are all the arrays for the dialogue!
let diaA1 = [];
let diaA2 = [];
let diaA3 = [];
let diaA4 = [];
let diaA5 = [];
let diaA6 = [];
let diaA7 = [];
let diaA8 = [];
let diaA9 = [];
let diaA10 = [];
let diaA11 = [];
let diaA12 = [];
let diaA13 = [];
let diaA14 = [];
let diaA15 = [];
let diaA16 = [];
let diaA17 = [];
let diaA18 = [];
let diaA19 = [];
let diaA20 = [];
let diaA21 = [];
let diaA22 = [];

//dialogues script
/*
*Écoûte!
***RADIO: La tempête qui s'abat sur l'ouest de la province
***RADIO: fait des ravages. Les dommages causés par des vents
***RADIO: de plus de 100 km/h bloque l'accès à plusieurs
***RADIO: routes. Hydro Québec est en état d'alarme...
*** *shkt*
* M'a virer d'bord calice!
** Hey ciboire!
* Tu m'fais pogner l'ch'min dans l'bois!
* Avec la trampoline de mon gars dans l'trailer en arrière!
* pis y pleut comme une chienne!
* J'commence à m'dire que t'es p'tête tombée su'à'tête!
** S't'es la dernière soirée, tu l'sais bin à part demain.
**La madame au dep m'a dit que la grand route était bloquée
**fac on passe par icitte, c'est toute.
*Hmm... J'comprends même pas qu'est-ce tu veux faire.
**Ciboire, j't'ai déjà toute expliqué...
**La route est famré, on passe par le chemin Tramblay.
**Rendu dans le parking du sentier des moulins,
**On utilise la trampoline du p'ti Michel
**pis tu t'arranges pour que j'me ramasse en haut d'la falaise
**Anyway, s'pas dangereux, j'ai amené le grand foulard
**de Germaine pour pogner dans l'vent.
*Pis tu penses qu'à va faire quoi quand a va voir ta
*vielle gueule à sa porte?
**...
**Ralentis, c'est icitte à gauche! r'garde la pancarte!

*************

**T'essaye tu d'me tuer?
**Sacrament Maurice, faut tu m'ratrappe!
**T'as tu tes liscences ciboire!?
**Ok laisse faire, utilise la souris pour contoler l'char

*************

**ISABELLE!
**OUVRE LA PORTE C'EST LOUIS!
**ISA...

***

*/

let thunder = {
  state: false,
  count: 0,
  aleatoire: undefined
}

let wind = {
  xSpeed: 0,
  trigger: undefined,
  variation: 0.1
}

let lover = {
  x:300,
  y:undefined,
  vx:0,
  vy:0,
  ax:0,
  ayBouncing:0.1,
  ayParachute: 0.01,
  parachuteTriggerX: true,
  parachuteTriggerY: true,
  parachuteLimit: canvasHeight / 10 * 8,
  maxSpeed:0,
  minSpeed:0,
  drag:0.001,
  size:15,
  birdReach: 100,
  counter:0,
  jumpTrigger: false,
  angle: 0,
  soundTrigger: true,
}

let trampo = {
  x:250,
  y:undefined,
  vx:0,
  ax:0,
  accelerationForward: 0.1,
  accelerationBackward: 0.05,
  deceleration: 0.01,
  decelerationState: false,
  gear: true, //True means Drive Forward // False means Drive Backwards
  break: 0.12,
  maxSpeed:50,
  minSpeed:0.001,
  w:45,
  h:8,
  carSoundTrigger: true,
  carSprite: undefined,
  carJumpTrigger: false,
  mouseTrigger: 0
}

let car = {
  x: undefined,
  y: undefined,
  h: 17,
  w: 100
}

let wall = {
  x:450,
  y:50,
  h:undefined,
  w:undefined,
}

let house = {
  x: 555,
  y: 60,
  w: 75,
  h: 40
}

let ground = {
  x:0,
  y:480,
  h:undefined,
  w:undefined
}

let tree = {
  x: undefined,
  y: undefined,
  w: 50,
  h: canvasHeight / 4 * 3,
  rotation: 0,
  trigger: true,
  go: false
}

let bird = {
  beginX: -50,
  beginY: 60,
  endX: 500,
  endY: -20,
  distX: undefined,
  distY: undefined,
  exponent: 4,
  x: 0,
  y: 0,
  step: 0.02,
  pct: 0, //percentage
  size: 25,
  go: false
}

let birdSign = {
  xRect: 75,
  yRect: 70,
  w: 90,
  h: 19,
  radius: 2,
  text: `SpaceBar !`
}

let birdTriangle = {
  x1: birdSign.xRect - birdSign.w/2 - 5,
  y1: birdSign.yRect - birdSign.h/2 + 3,
  x2: birdSign.xRect - birdSign.w/2 - 5,
  y2: birdSign.yRect + birdSign.h/2 - 3,
  x3: birdSign.xRect - birdSign.w/2 - 15,
  y3: birdSign.yRect
}

let endingEvent = { //way too many booleans to control the game's ending... Did not find a more efficient method in time.
  a: true,
  b: false,
  c: false,
  d: false,
  e: false,
  f: false,
  g: false,
  h: false
}

const DROP_NUM = 10;
let waterDrops = [];

const RAIN_AMOUNT = 300;
let rainDrops = [];

/**
PreLoad images and sounds, dialogues and fonts
*/
function preload() {
  dia.yoster = loadFont("assets/fonts/yoster.ttf");

  img.loverSpriteStd = loadImage("assets/images/loverSpriteStd.png");
  img.loverSpriteJump = loadImage("assets/images/loverSpriteJump.png");
  img.loverSpriteRot = loadImage("assets/images/loverSpriteRot.png");
  img.loverSpriteParr = loadImage("assets/images/loverSpriteParr.png");
  img.loverSpriteBird = loadImage("assets/images/loverSpriteBird.png");
  img.carTrampo = loadImage("assets/images/carTrampo.png");
  img.carTrampoJump = loadImage("assets/images/carTrampoJump.png");
  img.birdSprite1 = loadImage("assets/images/birdSprite1.png");
  img.birdSprite2 = loadImage("assets/images/birdSprite2.png");
  img.titleScreen = loadImage("assets/images/TitleBackground.png");
  img.noLove = loadImage("assets/images/noLove.png");
  img.whoAreYou = loadImage("assets/images/whoAreYou.png");
  img.deception = loadImage("assets/images/deception.png");
  img.gameBackground = loadImage("assets/images/gameBackground.png");
  img.gameForeground = loadImage("assets/images/gameForeground.png");
  img.tree = loadImage("assets/images/tree.png");
  img.introBackground1 = loadImage("assets/images/introBackground1.png");
  img.introBackground2 = loadImage("assets/images/introBackground2.png");
  img.introBackground3 = loadImage("assets/images/introBackground3.png");
  img.introCar = loadImage("assets/images/introCar.png");
  img.introCarLights = loadImage("assets/images/introCarLights.png");
  img.introCarInterior = loadImage("assets/images/introCarInterior.png");
  img.endingBackground1 = loadImage("assets/images/endingBackground1.png");
  img.endingBackground2 = loadImage("assets/images/endingBackground2.png");
  img.endingBackground3 = loadImage("assets/images/endingBackground3.png");
  img.endingSilouette = loadImage("assets/images/endingSilouette.png");
  img.endingDoor = loadImage("assets/images/endingDoor.png");
  img.accelerateur = loadImage("assets/images/accelerateur.png");
  img.accelerateurActive = loadImage("assets/images/accelerateurActive.png");
  img.frein = loadImage("assets/images/frein.png");
  img.freinActive = loadImage("assets/images/freinActive.png");
  img.parachute = loadImage("assets/images/parachute.png");
  img.parachuteActive = loadImage("assets/images/parachuteActive.png");
  img.shift = loadImage("assets/images/shift.png");
  img.mouse = loadImage("assets/images/mouse.png");

  snd.titleMusic = loadSound("assets/sounds/titleMusic.mp3");
  snd.gameMusic = loadSound("assets/sounds/gameMusic.mp3");
  snd.endMusic = loadSound("assets/sounds/endMusic.mp3");
  snd.lightRain = loadSound("assets/sounds/lightRain.m4a");
  snd.rainForest = loadSound("assets/sounds/rainForest.wav");
  snd.thunder = loadSound("assets/sounds/thunder.wav");
  snd.tree = loadSound("assets/sounds/tree.wav");
  snd.bounce1 = loadSound("assets/sounds/bounce1.wav");
  snd.jump = loadSound("assets/sounds/jump.wav");
  snd.trampoSound = loadSound("assets/sounds/trampoSound.wav");
  snd.parachute = loadSound("assets/sounds/parachute.mp3");
  snd.parachuteClose = loadSound("assets/sounds/parachuteClose.mp3");
  snd.carTreeHit = loadSound("assets/sounds/carTreeHit.wav");
  snd.carHit1 = loadSound("assets/sounds/carHit1.wav");
  snd.carBreak = loadSound("assets/sounds/carBreak.wav");
  snd.carEngine = loadSound("assets/sounds/carEngine.wav");
  snd.carGearSwitch = loadSound("assets/sounds/carGearSwitch.wav");
  snd.carAccelerates = loadSound("assets/sounds/carAccelerates.wav");
  snd.carRain = loadSound("assets/sounds/carRain.wav");
  snd.heavyRain = loadSound("assets/sounds/heavyRain.wav");
  snd.footsteps = loadSound("assets/sounds/footsteps.wav");
  snd.thunderClose = loadSound("assets/sounds/thunderClose.wav");
  snd.doorOpen = loadSound("assets/sounds/doorOpen.wav");
  snd.doorBang = loadSound("assets/sounds/doorBang.mp3");
  snd.stress = loadSound("assets/sounds/stress.wav");

  sndDia.a1 = loadSound("assets/sounds/dialogues/1.wav");
  sndDia.a2 = loadSound("assets/sounds/dialogues/2.wav");
  sndDia.a3 = loadSound("assets/sounds/dialogues/3.wav");
  sndDia.a4 = loadSound("assets/sounds/dialogues/4.wav");
  sndDia.a5 = loadSound("assets/sounds/dialogues/5.wav");
  sndDia.a6 = loadSound("assets/sounds/dialogues/6.wav");
  sndDia.a7 = loadSound("assets/sounds/dialogues/7.wav");
  sndDia.a8 = loadSound("assets/sounds/dialogues/8.wav");
  sndDia.a9 = loadSound("assets/sounds/dialogues/9.wav");
  sndDia.a10 = loadSound("assets/sounds/dialogues/10.wav");
  sndDia.a11 = loadSound("assets/sounds/dialogues/11.wav");
  sndDia.a12 = loadSound("assets/sounds/dialogues/12.wav");
  sndDia.a13 = loadSound("assets/sounds/dialogues/13.wav");
  sndDia.a14 = loadSound("assets/sounds/dialogues/14.wav");
  sndDia.a15 = loadSound("assets/sounds/dialogues/15.wav");
  sndDia.a16 = loadSound("assets/sounds/dialogues/16.wav");
  sndDia.a17 = loadSound("assets/sounds/dialogues/17.wav");
  sndDia.a18 = loadSound("assets/sounds/dialogues/18.wav");
  sndDia.a19 = loadSound("assets/sounds/dialogues/19.wav");
  sndDia.a20 = loadSound("assets/sounds/dialogues/20.wav");
  sndDia.a21 = loadSound("assets/sounds/dialogues/21.wav");
  sndDia.a22 = loadSound("assets/sounds/dialogues/22.wav");
  sndDia.laisseFaire = loadSound("assets/sounds/dialogues/laisseFaire.wav");
  sndDia.ouvreLaPorte = loadSound("assets/sounds/dialogues/ouvreLaPorte.wav");
  sndDia.sacrament = loadSound("assets/sounds/dialogues/sacrament.wav");
  sndDia.tabarnack = loadSound("assets/sounds/dialogues/tabarnack.wav");
  sndDia.reconnait = loadSound("assets/sounds/dialogues/reconnait.wav");


}

/**
Setup canvas and starting properties fo wall, ground, trampo, tree and bird.
*/
function setup() {
  createCanvas(canvasWidth, canvasHeight);
  background(0, 1, 10);
  createArrays();

  //Setting the size of the wall, ground, car and tree
  wall.h = height - wall.y;
  wall.w = width - wall.x;
  ground.h = height - ground.y;
  ground.w = width;
  trampo.y = ground.y - 20;
  tree.x = 0 - tree.w/2 + 25; //TO BE ABLE TO SEE IT FOR TESTING
  tree.y = ground.y - tree.h/2;
  tree.w = img.tree.width;
  tree.h = img.tree.height;
  //Set the bird properties
  bird.distX = bird.endX - bird.beginX;
  bird.distY = bird.endY - bird.beginY;
  car.x = trampo.x - 291/2 //The width of the image used for the car (Puts the car.x in the center of the car sprite)
  car.y = trampo.y - 24 //Height of the car sprite image
}

/**
Deals with functions, game state and the birdTrigger (that should be in it's own function).
*/
function draw() {
  background(0, 1, 10);
  //background(255);

  switch (state) {
    case `titleNoSound`:
      titleScreen();
      break;

    case `title`:
      titleScreen();
      stateDelay++;
      break;

    case `intro`:
      introScene();
      rainDropEffect();
      drawDialogue();
      stateDelay++;
      break;

    case `introEnd`:
      //rainDropEffect();
      controlsTextBox();
      stateDelay++
      break;

    case `bouncing`:
      tunderEffect();
      rainDropEffect();
      backgroundElements();
      treeFalling();
      windControl();
      loverBounce();
      if (easeUp() === false) {
        carControl();
      }
      else {
        carControlEasy();
      }
      foregroundElements();
      break;

    case `parachute`:
      tunderEffect();
      rainDropEffect();
      backgroundElements();
      treeFalling();
      windControl();
      loverParachute();
      if (easeUp() === false) {
        carControl();
      }
      else {
        carControlEasy();
      }
      foregroundElements();
      break;

    case `onGround`:
      tunderEffect();
      rainDropEffect();
      backgroundElements();
      treeFalling();
      windControl();
      loverOnGround();
      if (easeUp() === false) {
        carControl();
      }
      else {
        carControlEasy();
      }
      foregroundElements();
      break;

    case `pogneLe`:
      tunderEffect();
      rainDropEffect();
      backgroundElements();
      windControl();
      loverGrabbed();
      if (easeUp() === false) {
        carControl();
      }
      else {
        carControlEasy();
      }
      foregroundElements();
      break;

    case `ending`:
      ending();
      break;
  }

  //Get the player attention if the Lover is high enough
  if (lover.y < lover.birdReach && bird.go === false && state === `bouncing`) {
    birdTrigger();
  }

  if (bird.go) {
    birdFly();
  }



  console.log(`lover.x: ${lover.x}`);
  console.log(`lover.y: ${lover.y}`);
  console.log(`car.x: ${trampo.x + car.w/2}`);
  console.log(`car.y: ${trampo.y - car.h/2}`);
  console.log(`carMoving: ${carMoving}`);
  console.log(`dia.textSwitch: ${dia.textSwitch}`);
  console.log(`img.delay: ${img.delay}`);
  console.log(`state: ${state}`);
  // console.log(`A: ${endingEvent.a}`);
  // console.log(`B: ${endingEvent.b}`);
  // console.log(`C: ${endingEvent.c}`);
  // console.log(`D: ${endingEvent.d}`);
  // console.log(`E: ${endingEvent.e}`);
  // console.log(`F: ${endingEvent.f}`);
  // console.log(`G: ${endingEvent.g}`);
  // console.log(`H: ${endingEvent.h}`);
}

//Creates the Arrays in the setup of the program
function createArrays() {
  for (let i = 0; i < DROP_NUM; i++) {
    let waterDrop = {
      x: random(25, width - 25),
      y: random (25, height - 25),
      sizeX: 3,
      sizeY: 1,
      speedX: 2.4,
      speedY: 0.8,
      locationColor: undefined,
      opacity: 200,
      timer: random(0, 100)
    };
    waterDrops.push(waterDrop);
  }

  for (let i = 0; i < RAIN_AMOUNT; i++) {
    let rainDrop = {
      x: random(-25, width + 25),
      y1: random(-10, -3000),
      y2: undefined,
      hauteur: 10,
      epaisseur: 1,
      speedY: 20,
      opacity: 70,
      top: -500,
      bottom: width + 500
    };
    rainDrop.y2 = rainDrop.y1 + rainDrop.hauteur;
    rainDrops.push(rainDrop);
  }

  //Creates the arrays of letters for the intro dialogues
  for (let i = 1; i < dia.totalDialogues; i++) {
    let currentText = eval(`dia.a` + i);
    let currentArray = eval(`diaA` + i);

    for (let j = 0; j < currentText.length; j++) {
      let letter = currentText.substring(j, j + 1);
      currentArray.push(letter);
    }
  }
}

//Displays the title screen image
function titleScreen() {
  imageMode(CENTER);
  if (state === `title`) {
    image(img.titleScreen, width/2, height/2);
    waterDropEffect();
  }
  else {
    //Prompts the player to press a key and start the program
    push();
    fill(255);
    textAlign(CENTER);
    textFont(dia.yoster);
    textSize(17);
    text(`Appuyez sur une touche`, width/2, height/2);
    pop();
  }
}

function introScene() {
  push();
  translate(width/2, height/2);
  imageMode(CENTER);

  //Drawing the animated background
  if (frameCount % 30 < 15/2) {
    image(img.introBackground1, 0, 0);
  }
  else if (frameCount % 15 < 15/2) {
    image(img.introBackground2, 0, 0);
  }
  else if (frameCount % 15/2 < 15/2) {
    image(img.introBackground3, 0, 0);
  }

  if (introState) {
    if (frameCount % 10 < 5) {
      image(img.introCarInterior, 0, carMoving + 1);
      image(img.introCar, 0, carMoving + 1);
    }
    else {
      image(img.introCarInterior, 0, carMoving);
      image(img.introCar, 0, carMoving);
    }

    if (frameCount % 15 < 5) {
      image(img.introCarLights, 0, carMoving + 2);
    }
    else {
      image(img.introCarLights, 0, carMoving + 4);
    }
    if (carMoving === 0) {
      snd.carAccelerates.play();
    }
    carMoving += 3;

    if (carMoving > 200) {
      stateDelay = 0;
      state = `introEnd`;
    }
  }
  else {
    if (frameCount % 10 < 5) {
      image(img.introCarInterior, 0, 0 + 1);
      image(img.introCar, 0, 0 + 1);
    }
    else {
      image(img.introCarInterior, 0, 0);
      image(img.introCar, 0, 0);
    }

    if (frameCount % 15 < 5) {
      image(img.introCarLights, 0, 0 + 2);
    }
    else {
      image(img.introCarLights, 0, 0 + 4);
    }
  }

  pop();
}

//Text for dialogues (dia)
function drawDialogue() {
  push();
  textSize(20);
  fill(255);
  textFont(dia.yoster);

  let currentText = eval(`dia.a` + dia.textSwitch);
  let currentTextArray = eval(`diaA` + dia.textSwitch);

  //Changes the colors of the text
  if (currentTextArray[0] === `R` || currentTextArray[0] === `*`) {
    fill(200);
  }
  else if (currentTextArray[0] === `L`) {
    fill(255);
  }
  else if (currentTextArray[0] === `M`) {
    fill (`#FFFECF`);
  }

  //Displays one letter at a time
  if (frameCount % dia.textSpeed === 0 && dia.delay <= currentText.length) {
    dia.delay++;
  }
  let offset = 0
  for (let i = 1; i < dia.delay; i++) {

    if (25 + offset > width - 25) {
      text(currentTextArray[i], 25 + offset - width + 43, 70);
    }
    else {
      text(currentTextArray[i], 25 + offset, 50);
    }

    offset += textWidth(currentTextArray[i]);
  }

  if (dia.delay === currentText.length) {
    dia.done = true;
  }
  pop();
}

//Displays elements in the foreground
function foregroundElements() {
  push();
  imageMode(CORNER);
  image(img.gameForeground, ground.x, ground.y - 40);
  pop();
}

//Displays elements in the background
function backgroundElements() {
  push();
  fill(0);
  //rect(wall.x, wall.y, wall.w, wall.h);
  //rect(ground.x, ground.y, ground.w, ground.h);
  pop();
  push()
  rectMode(CENTER);
  fill(255);
  //rect(house.x, house.y, house.w, house.h);
  imageMode(CENTER);
  image(img.gameBackground, width/2, height/2);
  pop();

  push();



  translate(width/2, height/2);
  imageMode(CENTER);

  if (keyIsDown(32)) {
    image(img.parachuteActive, 0, 0);
  }
  else {
    image(img.parachute, 0, 0);
  }

  if (easeUp() === false) {
    if (keyIsDown(87)) {
      image(img.accelerateurActive, 0, 0);
    }
    else {
      image(img.accelerateur, 0, 0);
    }

    if (keyIsDown(83)) {
      image(img.freinActive, 0, 0);
    }
    else {
      image(img.frein, 0, 0);
    }

    push();
    //Temporaire? Illustrates the active gear
    textSize(32);
    fill(255);
    textFont(dia.yoster);
    if (trampo.gear) {
      text(`D`, width/2 - 47, height/2 - 35);
    }
    else {
      text(`R`, width/2 - 47, height/2 - 35);
    }
    pop();
    image(img.shift, 0, 0);
  }
  else {
    image(img.mouse, 0, 0);
  }
  pop();


}

//Controls the tree that falls the first time you hit the left limit with the car
function treeFalling() {
  if (tree.trigger && trampo.x - trampo.w/2 <= 0) {
    tree.go = true;
    snd.tree.play();
    snd.carTreeHit.play();
    tree.trigger = false;
  }

  if (tree.go) {
    tree.rotation += 0.3;
  }
  if (tree.rotation > 90) {
    tree.go = false;
  }

  //Displays the tree
  push();
  noStroke();
  fill(255);
  rectMode(CENTER);
  imageMode(CENTER);
  translate(tree.x, tree.y + tree.h / 2);
  rotate(radians(tree.rotation));

  //rect(0 , 0 - tree.h / 2, tree.w, tree.h);
  image(img.tree, 0, 0 - tree.h / 2);
  pop();
}

//Randomly activates thunderstuck by ACDC
function tunderEffect() {
  thunder.aleatoire = random();
  thunder.count++;

  if (thunder.aleatoire < 0.001) {
    snd.thunder.play();
    thunder.state = true;
    thunder.count = 0;
  }

  if (thunder.state && thunder.count < 5) {
    background(255);
  }
  if (thunder.state && thunder.count > 10) {
    background(255);
  }
  if (thunder.state && thunder.count > 15) {
    thunder.state = false;
    thunder.count = 0;
  }
}

//Displays little water drops on the title screen
function waterDropEffect() {
  for (let i = 0; i < DROP_NUM; i++) {
    let waterDrop = waterDrops[i];
    waterDrop.locationColor = get(waterDrop.x, waterDrop.y);

    //Timer so the drops are not in sync at the start
    if (waterDrop.timer > 0) {
      waterDrop.timer--;
    }
    //Checking where they are displayed
    else if (waterDrop.locationColor[2] !== 10 || waterDrop.sizeX > 60) { //10 is the blue value of the water section in the background image
      waterDrop.x = random(25, width - 25);
      waterDrop.y = random (25, height - 25);
      waterDrop.sizeX = 3;
      waterDrop.sizeY = 1;
      waterDrop.opacity = 200;
    }
    else {
      waterDrop.sizeX += waterDrop.speedX;
      waterDrop.sizeY += waterDrop.speedY;
      waterDrop.opacity -= 10;

      //Drawing the rainDrops
      push();
      noFill();
      stroke(255, waterDrop.opacity);
      strokeWeight(1);
      ellipse(waterDrop.x, waterDrop.y, waterDrop.sizeX, waterDrop.sizeY);
      pop();
    }
  }
}

//Displays rain in the game section
function rainDropEffect() {
  for (let i = 0; i < RAIN_AMOUNT; i++) {
    let rainDrop = rainDrops[i];

    if (rainDrop.y2 > rainDrop.bottom) {
      rainDrop.x = random(-200, width + 200);
      rainDrop.y1 = rainDrop.top;
      rainDrop.y2 = rainDrop.top + rainDrop.hauteur;
    }
    else {
      rainDrop.y1 += rainDrop.speedY;
      rainDrop.y2 += rainDrop.speedY;
    }

    push();
    rotate(radians(wind.xSpeed*30));
    strokeWeight(rainDrop.epaisseur);
    stroke(255, rainDrop.opacity);
    line(rainDrop.x, rainDrop.y1, rainDrop.x, rainDrop.y2);
    pop();
  }
}

//Randomly changes the wind direction and keeps track of it.
function windControl() {
  wind.trigger = random();

  if (wind.trigger < 0.01) {
    wind.xSpeed += wind.variation;
  }
  else if (wind.trigger > 0.99) {
    wind.xSpeed -= wind.variation;
  }
  wind.xSpeed = constrain(wind.xSpeed, -1, 1);
}

//Function that allows the lover to bounce around
function loverBounce() {
  //push the lover around randomly a bit
  let randomPush = random();
  if (randomPush < 0.01) {
    lover.vx += 0.1;
  }
  else if (randomPush > 0.99) {
    lover.vx -= 0.1;
  }

  //bouce on the trampoline if the ball is on the damn thing!
  if (lover.y + lover.size/2 >= trampo.y - trampo.h && lover.x + lover.size >= trampo.x - trampo.w/2 && lover.x - lover.size <= trampo.x + trampo.w/2) {
    collision = dist(lover.x, lover.y + lover.size/2, trampo.x, trampo.y + trampo.h/2);
    //Bounce in deferent direction dependant on where it hit
    if (collision < 13) {
      lover.vx = 0;
      snd.trampoSound.play();
      trampo.carJumpTrigger = true;
    }
    else if (collision > 13 && lover.x > trampo.x) {
      lover.vx += 2;
      snd.trampoSound.play();
      trampo.carJumpTrigger = true;
    }
    else if (collision > 13 && lover.x < trampo.x) {
      lover.vx -= 2;
      snd.trampoSound.play();
      trampo.carJumpTrigger = true;
    }
    else if (collision > 15 && lover.x > trampo.x) {
      lover.vx += 5;
      snd.trampoSound.play();
      trampo.carJumpTrigger = true;
    }
    else if (collision > 15 && lover.x < trampo.x) {
      lover.vx -= 5;
      snd.trampoSound.play();
      trampo.carJumpTrigger = true;
    }
    else if (collision > 20 && lover.x > trampo.x) {
      lover.vx += 10;
      snd.trampoSound.play();
      trampo.carJumpTrigger = true;
    }
    else if (collision > 20 && lover.x < trampo.x) {
      lover.vx -= 10;
      snd.trampoSound.play();
      trampo.carJumpTrigger = true;
    }
    else if (collision > 30 && lover.x > trampo.x) {
      lover.vx += 15;
      snd.trampoSound.play();
      trampo.carJumpTrigger = true;
    }
    else if (collision > 30 && lover.x < trampo.x) {
      lover.vx -= 15;
      snd.trampoSound.play();
      trampo.carJumpTrigger = true;
    }
    lover.vy = -(lover.vy) - 0.7;
  }
  //Bounce On the floor
  else if (lover.y + lover.size/2 >= ground.y) {
    lover.y = ground.y - lover.size/2;
    lover.vy = -(lover.vy) + 2;
  }
  //Bounce on the car
  else if (lover.y + lover.size/2 >= trampo.y - car.h && lover.x + lover.size >= trampo.x - trampo.w/2 - car.w && lover.x - lover.size <= trampo.x - trampo.w/2 - 40) {
    lover.y = car.y - lover.size/2;
    lover.vy = -(lover.vy) + 2;
  }

  //Check if the lover has stopped bouncing
  if (lover.y >= 472 && lover.y <= 475) {
    lover.counter += 1;
    if (lover.counter > 40) {
      lover.counter = 0;
      lover.vx = 0;
      lover.vy = 0;
      state = `onGround`;
    }

  }
  //Bounce on the walls
  if (lover.x - lover.size <= 0) {
    snd.bounce1.play();
    lover.vx = -(lover.vx);
  }
  if (lover.x + lover.size >= wall.x) {
    snd.bounce1.play();
    lover.vx = -(lover.vx);
  }


  lover.x += lover.vx;
  //Gravity
  lover.vy += lover.ayBouncing;
  lover.y += lover.vy;
  loverDraw();
  loverSound();
}

//Activate the lovers glider
function loverParachute() {
  //Cutdown the vy
  if (lover.parachuteTriggerY && lover.vy < 0) {
    lover.vy += 0.1;
  }
  else {
    lover.parachuteTriggerY = false
  }

  //Cutdowm the vx
  if (lover.parachuteTriggerX && lover.vx > 0.1) {
    lover.vx -= 0.1;
  }
  else if (lover.parachuteTriggerX && lover.vx < -0.1) {
    lover.vx += 0.1;
  }
  else {
    lover.parachuteTriggerX = false;
  }

  //stop on the walls
  if (lover.x - lover.size/2 <= 0) {
    lover.vx = 0.1;
  }
  else if (lover.x + lover.size/2 >= wall.x) {
    lover.vx = -0.1;
  }
  else if (lover.parachuteTriggerX === false) { //Moves following the wind
    lover.ax = -(wind.xSpeed/100);
    lover.vx += lover.ax;
    lover.x += lover.vx;
  }

  if (lover.y > lover.parachuteLimit) { //return to the bouncing mode if it gets to close to the ground
    state = `bouncing`;
    lover.parachuteTriggerX = true;
    lover.parachuteTriggerY = true;
  }

  lover.x += lover.vx;
  //Gravity
  lover.vy += lover.ayParachute;
  lover.y += lover.vy;
  loverDraw();
}

//function that deals with the lover once it's stationnary on the ground
function loverOnGround() {
  lover.y = ground.y - lover.size/2;
  loverDraw();
}

//Deals with the lover once it's made contact with the bird
function loverGrabbed() {
  if (lover.x < wall.x - 50 ) {
    lover.x = bird.x;
    lover.y = bird.y;
  }
  else {
    lover.vx = 2;
    lover.vy = 0.5;
    lover.x += lover.vx;
    lover.y += lover.vy;
  }

  let atTheDoor = dist(lover.x, lover.y, house.x, house.y);
  if (atTheDoor < 15) {
    state = `ending`;
  }
  loverDraw();
}

//Drawing the lover
function loverDraw() {
  imageMode(CENTER);

  switch (state) {
    case `onGround`:
      image(img.loverSpriteStd, lover.x, lover.y);
      break;

    case `bouncing`:
      if (lover.jumpTrigger) {
        image(img.loverSpriteJump, lover.x, lover.y);
      }
      if (lover.vy > 0) {
        lover.jumpTrigger = false;
      }

      if (lover.jumpTrigger === false) {
        push();
        translate(lover.x, lover.y);
        rotate(radians(lover.angle));
        image(img.loverSpriteRot, 0, 0);
        lover.angle += 5;
        pop();
      }
      break;

    case `parachute`:
      image(img.loverSpriteParr, lover.x, lover.y);
      break;

    case `pogneLe`:
      image(img.loverSpriteBird, lover.x, lover.y);
      break;
  }
}

function loverSound() {
  if (lover.y + lover.size/2 >= ground.y && lover.soundTrigger) {
    lover.soundTrigger = false;
    snd.bounce1.play();
  }

  if (lover.y + lover.size/2 < ground.y - 3) {
    lover.soundTrigger = true;
  }
}

//controls the car movments
function carControl() {
  //NOTE: 65: A LEFT // 68: D RIGHT // 87: W FORWARD // 83: S BACKWARDS // 16: SHIFT Change Gear

  //The brand new itteration of car CONTROLS! Gas pedal is W, break is S and SHIFT sitches gears
  //Moves the car if the Car is set to Drive
  if (trampo.gear) {
    if (keyIsDown(87)) {
      trampo.vx -= trampo.accelerationForward;
      if (trampo.decelerationState) {
        snd.carAccelerates.play();
      }
      trampo.decelerationState = false;
    }
    else if (keyIsDown(83) && trampo.vx !== 0) {
      trampo.vx += trampo.break;
      if (trampo.decelerationState) {
        snd.carBreak.play();
      }
      trampo.decelerationState = false;

      if (trampo.vx > 0) {
        trampo.vx = 0;
      }
    }
  }
  //Moves the car if the car is set to backwards
  if (trampo.gear === false) {
    if (keyIsDown(87)) {
      trampo.vx += trampo.accelerationBackward;
      if (trampo.decelerationState) {
        snd.carAccelerates.play();
      }
      trampo.decelerationState = false;
    }
    else if (keyIsDown(83) && trampo.vx !== 0) {
      trampo.vx -= trampo.break;
      if (trampo.decelerationState) {
        snd.carBreak.play();
      }
      trampo.decelerationState = false;

      if (trampo.vx < 0) {
        trampo.vx = 0;
      }
    }
  }

  //Controls the deceleration after a keyRelease
  if (trampo.decelerationState) {
    if (trampo.vx > 0) {
      trampo.vx -= trampo.deceleration;
      if (trampo.vx < 0) {trampo.decelerationState = false;}
    }
    else if (trampo.vx < 0) {
      trampo.vx += trampo.deceleration;
      if (trampo.vx > 0) {trampo.decelerationState = false;}
    }
    if (trampo.vx === 0) {
      trampo.decelerationState = false;
    }
  }

  //Yet Another test with car controls using A and D keys and Shift as a Breaks
  /*
  //Starts the car if iddle
  if (trampo.vx === 0) {
    if (keyIsDown(68)) {
      trampo.vx += trampo.accelerationBackward;
      trampo.decelerationState = false;
    }
    else if (keyIsDown(65)) {
      trampo.vx -= trampo.accelerationForward;
      trampo.decelerationState = false;
    }
  }
  //Moves the car if its moving left
  if (trampo.vx < 0 && keyIsDown(65)) {
    trampo.vx -= trampo.accelerationForward;
    trampo.decelerationState = false;
  }
  //Moves the car if moving Right
  if (trampo.vx > 0 && keyIsDown(68)) {
    trampo.vx += trampo.accelerationBackward;
    trampo.decelerationState = false;
  }
  //Breaks the car if moving Left
  if (trampo.vx < 0 && keyIsDown(16)) {
    trampo.vx += trampo.break;
    trampo.decelerationState = false;

    if (trampo.vx > 0) {
      trampo.vx = 0;
    }
  }
  //Breaks the car if moving Right
  if (trampo.vx > 0 && keyIsDown(16)) {
    trampo.vx -= trampo.break;
    trampo.decelerationState = false;

    if (trampo.vx < 0) {
      trampo.vx = 0;
    }
  }

  //Controls the deceleration after a keyRelease
  if (trampo.decelerationState) {
    if (trampo.vx > 0) {
      trampo.vx -= trampo.deceleration;
      if (trampo.vx < 0) {trampo.decelerationState = false;}
    }
    else if (trampo.vx < 0) {
      trampo.vx += trampo.deceleration;
      if (trampo.vx > 0) {trampo.decelerationState = false;}
    }
    if (trampo.vx === 0) {
      trampo.decelerationState = false;
    }
  }
  */

  //stoping at edges
  if (trampo.x - trampo.w/2 <= 0 && trampo.vx !== 0) {
    trampo.vx = 0;
    trampo.x += 1;
  }
  else if (trampo.x + trampo.w/2 >= wall.x && trampo.vx !== 0) {
    trampo.vx = 0;
    trampo.x -= 1;
  }
  //Stop at the Lover ball
  if (state === `onGround`){
      if (trampo.x + trampo.w/2 > lover.x - lover.size/2 && trampo.x - trampo.w/2 < lover.x + lover.size/2) {
        trampo.vx = 0;
        trampo.x -= 1.5;
      }
      if (trampo.x - trampo.w/2 - car.w - 20 < lover.x + lover.size/2 && trampo.x + trampo.w/2 > lover.x - lover.size/2) {
        trampo.vx = 0;
        trampo.x += 1.5;
      }
  }

  //moving the car
  trampo.x += trampo.vx
  trampoDraw();
  carColisionSound();
}

//Controls the sound the car makes
function carColisionSound() {
  if (trampo.x - trampo.w/2 <= 0 && trampo.carSoundTrigger && tree.trigger === false) {
    trampo.carSoundTrigger = false;
    snd.carHit1.play();
  }
  else if (trampo.x + trampo.w/2 >= wall.x && trampo.carSoundTrigger) {
    trampo.carSoundTrigger = false;
    snd.carHit1.play();
  }

  //Reset the trigger
  if (trampo.x - trampo.w/2 > 20 && trampo.x < width/2) {
    trampo.carSoundTrigger = true;
  }
  else if (trampo.x + trampo.w/2 < wall.x - 20 && trampo.x > width/2) {
    trampo.carSoundTrigger = true;
  }
}

//Controls the car with mouseX
function carControlEasy() {

  if (mouseX !== trampo.mouseTrigger) {
    trampo.x = mouseX;
    trampo.x = constrain(trampo.x, 0 + trampo.w/2, wall.x - trampo.w/2);
  }

  trampoDraw();
}

function easeUp() {
  //Check if the lover reaches mid screen
  if (lover.y < height/3 * 2) {
    difficulty.niceAttempt = true;
  }
  //Checks if the lover crashes on the ground
  if (difficulty.niceAttempt && lover.y + lover.size/2 >= ground.y) {
    difficulty.counter++;
    difficulty.niceAttempt = false;
  }

  if (difficulty.counter === 1) {
    sndDia.sacrament.play();
    difficulty.counter = 2;
  }
  if (difficulty.counter === 3) {
    sndDia.tabarnack.play();
    difficulty.counter = 4;
  }
  if (difficulty.counter === 5) {
    sndDia.laisseFaire.play();
    difficulty.easy = true;
    trampo.mouseTrigger = mouseX;
    difficulty.counter = 6;
  }

  return difficulty.easy;
}

//drawing the trampoline
function trampoDraw() {
  //Changes the sprite if the lover hits the trampoline
  if (trampo.carJumpTrigger) {
    trampo.carSprite = img.carTrampoJump;
    if (lover.y + lover.size/2 < trampo.y - 20) {
      trampo.carJumpTrigger = false;
    }
  }
  else {
    trampo.carSprite = img.carTrampo;
  }

  push();
  noStroke();
  fill(255);
  rectMode(CENTER);
  imageMode(CENTER);
  //rect(trampo.x, trampo.y, trampo.w, trampo.h);
  //Makes the car giggle up and down if it's moving
  if (trampo.vx !== 0 && difficulty.easy !== true) {
    if (frameCount % 10 < 5) {
      image(trampo.carSprite, trampo.x, trampo.y - 1);
    }
    else {
      image(trampo.carSprite, trampo.x, trampo.y);
    }
  }
  else {
    image(trampo.carSprite, trampo.x, trampo.y);
  }
  pop();
}

//Controls the movments of the bird object
function birdFly() {
  bird.pct += bird.step;
  if (bird.pct < 1) {
    bird.x = bird.beginX + bird.pct * bird.distX;
    bird.y = bird.beginY + pow(bird.pct, bird.exponent) * bird.distY;
  }

  birdDraw();
  //reset the bird
  if (bird.x >= bird.endX - 15 && bird.y <= bird.endY + 10) {
    bird.x = bird.beginX;
    bird.y = bird.beginY;
    bird.pct = 0;
    bird.go = false;
  }
  //check the bird and lover distance and grab the lover if close enough
  let proximity = dist(lover.x, lover.y, bird.x, bird.y);
  if (proximity < lover.size + 5) {
    state = `pogneLe`;
  }
}

//Draws the bird. DAMN!
function birdDraw() {
  imageMode(CENTER);

  if (frameCount % 20 < 5) {
    image(img.birdSprite1, bird.x, bird.y);
  }
  else {
    image(img.birdSprite2, bird.x, bird.y);
  }
}

//Draws a sign to signal the player that the lover is within reach of the bird
function birdTrigger() {
  if (frameCount % 20 < 10) {
    push();
    rectMode(CENTER);
    noStroke();
    fill(255, 0, 0);
    rect(birdSign.xRect, birdSign.yRect, birdSign.w, birdSign.h, birdSign.radius);
    fill(255);
    triangle(birdTriangle.x1, birdTriangle.y1, birdTriangle.x2, birdTriangle.y2, birdTriangle.x3, birdTriangle.y3);
    textSize(15);
    textAlign(CENTER);
    text(birdSign.text, birdSign.xRect, birdSign.yRect + birdSign.h/2 - 4);
    pop();
  }
}

//Text box explaining the controls
function controlsTextBox() {
  push();
  textAlign();
  textFont(dia.yoster);
  translate(width/2, height/2);
  textSize(15);

  push();
  rectMode(CENTER);
  strokeWeight(5);
  stroke(255);
  noFill();
  rect(0, 0, width - 230, height - 330);
  pop();

  fill(255);
  text(`W: Pédale d'Accélérateur
S: Pédale de Frein
SHIFT: Levier de vitesse, Drive ou Reverse
SPACEBAR: Saut OU Parachute

Appuyer sur une touche pour continuer`, -width/4, 0 - 45);
  pop();
}

//Controls the keyboard inputs
function keyPressed() {
  if (state === `titleNoSound`) {
    snd.titleMusic.play();
    snd.lightRain.loop();
    state = `title`;
  }

  else if (state === `title` && stateDelay > 1) {
    stateDelay = 0;
    snd.titleMusic.stop();
    snd.lightRain.stop();
    snd.carRain.loop();
    sndDia.a1.play();
    state = `intro`;
  }

  else if (state === `intro` && stateDelay > 1) {
    if (dia.textSpeed === dia.slow && dia.done === false) {
      stateDelay = 0;
      dia.textSpeed = dia.fast;
    }
    else if (dia.textSwitch < dia.totalDialogues) {
      if (dia.done === true || dia.textSpeed === dia.fast) {
        dia.textSwitch++;
        stateDelay = 0;
        dia.done = false;
        dia.delay = 0;
        dia.textSpeed = dia.slow;

        //Stop the last dialogue
        let pastTextSwitch = dia.textSwitch - 1;
        let pastDialogue = eval(`sndDia.a` + pastTextSwitch);
        pastDialogue.stop();

        //Play the new dialogue
        let currentDialogue = eval(`sndDia.a` + dia.textSwitch);
        currentDialogue.play();

      }
    }

    else if (dia.textSwitch === dia.totalDialogues) {
    let currentDialogue = eval(`sndDia.a` + dia.textSwitch);
    currentDialogue.stop();
    stateDelay = 0;
    introState = true;
    }
  }

  /*
  else if (state === `intro` && stateDelay > 1) {
    stateDelay = 0;
    dia.textSpeed = dia.fast;
  }
  else if (state === `intro` && stateDelay > 1) {
    stateDelay = 0;
    dia.textSpeed = dia.slow;
    introState = `c2`;
  }
  else if (introState === `c2` && stateDelay > 1) {
    stateDelay = 0;
    dia.textSpeed = dia.slow;
    introState = `c3`;
  }
  else if (introState === `c3` && stateDelay > 1) {
    stateDelay = 0;
    dia.textSpeed = dia.slow;
    introState = `c4`;
  }
  else if (introState === `c4` && stateDelay > 1) {
    stateDelay = 0;
    dia.textSpeed = dia.slow;
    introState = `c5`;
  }
  else if (introState === `c5` && stateDelay > 1) {
    stateDelay = 0;
    dia.textSpeed = dia.slow;
    introState = `b1`;
  }
  else if (introState === `b1` && stateDelay > 1) {
    stateDelay = 0;
    dia.textSpeed = dia.slow;
    introState = `a2`;
  }
  else if (introState === `a2` && stateDelay > 1) {
    stateDelay = 0;
    dia.textSpeed = dia.slow;
    introState = `b3`;
  }
  else if (introState === `b3` && stateDelay > 1) {
    stateDelay = 0;
    dia.textSpeed = dia.slow;
    introState = `b4`;
  }
  else if (introState === `b4` && stateDelay > 1) {
    stateDelay = 0;
    dia.textSpeed = dia.slow;
    introState = `b5`;
  }
  else if (introState === `b5` && stateDelay > 1) {
    stateDelay = 0;
    dia.textSpeed = dia.slow;
    introState = `a4`;
  }
  else if (introState === `a4` && stateDelay > 1) {
    stateDelay = 0;
    dia.textSpeed = dia.slow;
    introState = `a5`;
  }
  else if (introState === `a5` && stateDelay > 1) {
    stateDelay = 0;
    dia.textSpeed = dia.slow;
    introState = `a6`;
  }
  else if (introState === `a6` && stateDelay > 1) {
    stateDelay = 0;
    dia.textSpeed = dia.slow;
    introState = `b7`;
  }
  else if (introState === `b7` && stateDelay > 1) {
    stateDelay = 0;
    dia.textSpeed = dia.slow;
    introState = `a7`;
  }
  else if (introState === `a7` && stateDelay > 1) {
    stateDelay = 0;
    dia.textSpeed = dia.slow;
    introState = `a8`;
  }
  else if (introState === `a8` && stateDelay > 1) {
    stateDelay = 0;
    dia.textSpeed = dia.slow;
    introState = `a9`;
  }
  else if (introState === `a9` && stateDelay > 1) {
    stateDelay = 0;
    dia.textSpeed = dia.slow;
    introState = `a10`;
  }
  else if (introState === `a10` && stateDelay > 1) {
    stateDelay = 0;
    dia.textSpeed = dia.slow;
    introState = `a11`;
  }
  else if (introState === `a11` && stateDelay > 1) {
    stateDelay = 0;
    dia.textSpeed = dia.slow;
    introState = `a12`;
  }
  else if (introState === `a12` && stateDelay > 1) {
    stateDelay = 0;
    dia.textSpeed = dia.slow;
    introState = `a13`;
  }
  else if (introState === `a13` && stateDelay > 1) {
    stateDelay = 0;
    dia.textSpeed = dia.slow;
    introState = `b8`;
  }
  else if (introState === `b8` && stateDelay > 1) {
    stateDelay = 0;
    dia.textSpeed = dia.slow;
    introState = `b9`;
  }
  else if (introState === `b9` && stateDelay > 1) {
    stateDelay = 0;
    dia.textSpeed = dia.slow;
    introState = `a14`;
  }
  else if (introState === `a14` && stateDelay > 1) {
    stateDelay = 0;
    dia.textSpeed = dia.slow;
    introState = `a15`;
  }
  else if (introState === `a15` && stateDelay > 1) {
    stateDelay = 0;
    dia.textSpeed = dia.slow;
    introState = `end`;
  }
  */

  else if (state === `introEnd` && stateDelay > 1) {
    stateDelay = 0;
    //Getting out the car sound
    snd.carRain.stop();
    snd.gameMusic.loop();
    snd.rainForest.loop();
    snd.carEngine.loop();
    state = `onGround`;
  }
  else if (keyCode === 16) {
    snd.carGearSwitch.play();
    trampo.gear = !trampo.gear; //Puts the car in Drive or Backwards with the SHIFT key
  }
  /* Used by the original shitty car controls
  else if (keyCode === 65) { //LEFT A
    trampo.vx -= 0.3;
  }
  else if (keyCode === 68) { //RIGHT D
    trampo.vx += 0.3;
  }
  */
  else if (keyCode === 8 && state !== `title` && state !== `ending` && state !== `titleNoSound`) { //BACKSPACE
    state = `ending`;
  }
  else if (keyCode === 32 && state === `onGround`) { //SPACEBAR
    state = `bouncing`;
    snd.jump.play();
    lover.jumpTrigger = true;
    lover.vy = -5;
    lover.y = ground.y - 15;
  }
  else if (keyCode === 32 && state === `bouncing` === lover.y < lover.parachuteLimit && state !== `title` && lover.y > lover.birdReach) {
    snd.parachute.play();
    lover.parachuteTriggerX = true;
    lover.parachuteTriggerY = true;
    state = `parachute`;
  }
  else if (keyCode === 32 && state === `parachute` && lover.y > lover.birdReach) {
    snd.parachuteClose.play();
    lover.parachuteTriggerX = true;
    lover.parachuteTriggerY = true;
    state = `bouncing`;
  }
  else if (keyCode === 32 && state === `bouncing` && lover.y < lover.birdReach) {
    bird.go = true;
  }
}

function keyReleased() {
  //Decelerates the car if you stop pressing the gas pedal
  if (keyCode === 87 || keyCode === 83) {
    trampo.decelerationState = true;
  }
  /* old car control keys
  if (keyCode === 65 || keyCode === 68) {
    trampo.decelerationState = true;
  }
  */
}

//End screens once the lover has reached the house
function ending() {
  imageMode(CENTER);
  translate(width/2, height/2);

  //Plays the THUNDER sound
  if (endingEvent.e && snd.stress.isPlaying() === false) {
    snd.lightRain.loop();
    snd.thunderClose.play();


    endingEvent.e = false;
    endingEvent.f = true;
    thunder.state = true;
    thunder.count = 0;
  }

  //Displays the Thunder visual effect
  if (endingEvent.f) {
    thunder.count++;

    if (thunder.state && thunder.count < 5) {
      background(255);
    }
    if (thunder.state && thunder.count > 10) {
      background(255);
    }
    if (thunder.state && thunder.count > 15) {
      thunder.state = false;
      thunder.count = 0;
    }
    if (thunder.state === false) {
      endingEvent.f = false;
      endingEvent.g = true;
    }

  }

  //Plays the footsteps and HeavyRain
  if (endingEvent.a) {
    snd.gameMusic.stop();
    snd.carEngine.stop();
    snd.heavyRain.loop();
    sndDia.ouvreLaPorte.play();
    snd.footsteps.play();

    endingEvent.a = false;
    endingEvent.b = true;
  }
  if (endingEvent.b && snd.footsteps.isPlaying() === false) { //Plays the doorBang
    snd.doorBang.play();
    endingEvent.b = false;
    endingEvent.c = true;
    endingEvent.d = true;
  }

  if (endingEvent.d && snd.doorBang.isPlaying() === false) { //Plays the stress sound
    snd.heavyRain.stop();
    snd.stress.play();
    endingEvent.d = false;
    endingEvent.e = true;
  }

  //Displays the house
  if (endingEvent.c && snd.doorBang.isPlaying() === false) {

      image(img.endingSilouette, 0, 0);
      rainDropEffect();

      if (snd.stress.isPlaying()) {
        image(img.endingDoor, 0, 0);
      }

    if (frameCount % 30 < 15/2) {
      image(img.endingBackground1, 0, 0);
    }
    else if (frameCount % 15 < 15/2) {
      image(img.endingBackground2, 0, 0);
    }
    else if (frameCount % 15/2 < 15/2) {
      image(img.endingBackground3, 0, 0);
    }

    //Displays the final images with hardcoded numbers :(
    if (endingEvent.g && snd.thunderClose.isPlaying() === false) {
      img.delay++;
      image(img.whoAreYou, 0, 0);
      if (img.delay === 1) {
        snd.stress.play();
      }

      if (img.delay > 200 && img.delay < 550) {
        image(img.noLove, 0, 0);
        if (img.delay === 500) {
          sndDia.reconnait.play();
        }
      }
      else if (img.delay > 550) {
        image(img.deception, 0, 0);
        //if (img.delay === 349) {snd.endMusic.play();}
        if (img.delay > 650) {
          snd.lightRain.stop();
          snd.doorOpen.play(); //Used to create a weird sound because it plays every frame
          img.zoom += 2;
          img.deception.resize(width+img.zoom, height+img.zoom); //Zoom on the guys face with distortion caused by the width and height being different
        }
        if (img.delay > 900) {
          snd.doorOpen.stop();
          endingEvent.g = false;
          endingEvent.h = true;
          endingEvent.c = false;
        }
      }
    }

    //Final blackScreen and music
    if (endingEvent.h) {
      //snd.doorOpen.stop();
      snd.lightRain.stop();
      snd.endMusic.play();
      endingEvent.h = false;
    }

  }
}
