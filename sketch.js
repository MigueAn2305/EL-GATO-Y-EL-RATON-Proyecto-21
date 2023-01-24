var SETUP = 0;
var PLAY = 1;
var END1 = 2;
var END2 = 3;
var gameState = SETUP;
var gato, raton, scena, limite1, limite2, limite3;
var gatoImg, ratonImg, obstaculoImg, scenaImg;
var ratonGroup, ob1Group1, ob1Group2, ob1Group3, ob2Group1, ob2Group2, ob2Group3, ob2Group4, ob3Group1, ob3Group2, ob3Group3, ob3Group4, ob4Group1, ob4Group2, ob4Group3, ob4Group4;
var score = 50;
var score1 = 0;

function preload(){
    obstaculoImg = loadImage("obstaculo.png");
    gatoImg = loadImage("gato1.png");
    ratonImg = loadImage("raton.png");
    scenaImg = loadImage("scena.jpg");

}

function setup() {
    createCanvas(600,600);

    scena = createSprite(300,300);
    scena.addImage(scenaImg);
    scena.scale = 1.1
    
    gato = createSprite(300,525,50,50);
    gato.addImage(gatoImg);
    gato.scale = 0.3;
    gato.setCollider("circle",0,-20,90);

    limite3 = createSprite(300,50,600,100);
    limite1 = createSprite(50,300,100,600);
    limite2 = createSprite(550,300,100,600);
    limite1.shapeColor = (rgb(249, 80, 1));
    limite2.shapeColor = (rgb(249, 80, 1));
    limite3.shapeColor = (rgb(249, 80, 1));

    ratonGroup = new Group();
    ob1Group1 = new Group();
    ob1Group2 = new Group();
    ob1Group3 = new Group();
    ob2Group1 = new Group();
    ob2Group2 = new Group();
    ob2Group3 = new Group();
    ob2Group4 = new Group();
    ob3Group1 = new Group();
    ob3Group2 = new Group();
    ob3Group3 = new Group();
    ob3Group4 = new Group();
    ob4Group1 = new Group();
    ob4Group2 = new Group();
    ob4Group3 = new Group();
    ob4Group4 = new Group();
}
function draw() {
    background(200);
    drawSprites();
    
    if(gameState === SETUP) { 
        fill("black");
        textSize(20);
        text("Preciona,(espacio) para jugar",175,20)
        if(keyDown("space")) {
            gameState = PLAY;
        }
    }
    if(gameState === PLAY) {
        continuoRaton();

        if(scena.y > 600) {
            scena.y = 300;
        }
        gato.x = World.mouseX;
        if(gato.isTouching(ratonGroup)) {
            ratonGroup.destroyEach();
            if(score < 100) {
                score = score +10;
            } 
        }
        if(frameCount % 60 === 0) {
            score = score -2;
        }
        var rand = Math.round(random(1,4));
        if(World.frameCount % 80 === 0) {
            switch(rand) {
                case 1:obstacleFunction_1();
                break;
                case 2:obstacleFunction_2();
                break;
                case 3:obstacleFunction_3();
                break;
                case 4:obstacleFunction_4();
                break;
                default:break;

            }
        }
        if(gato.y > 600) {
            gameState = END1;
        }
        if(score === 0) {
            gameState = END2;
        }

        
        if(score >= 1 && score <= 20) {
            fill("black");
            textSize(15);
            text("Mucha Hambre!",400,75);
        }
        if(score >= 21 && score <= 40) {
            fill("black");
            textSize(15);
            text("Poca Hambre!",400,75);
        }
        if(score >= 41 && score <= 60) {
            fill("black");
            textSize(15);
            text("Normal",400,75);
        }
        if(score >= 61 && score <= 80) {
            fill("black");
            textSize(15);
            text("Esta Lleno!",400,75);
        }
        if(score >= 81 && score <= 100) {
            fill("black");
            textSize(15);
            text("Apunto De Explotar!",360,75);
        }
        if(score > 100){
            fill("black");
            textSize(15);
            text("Ah Ejercitarse!",400,75);
        }
        score1 = score1 + Math.round(frameCount/180);
    }

    if(gameState === END1) {
        scena.velocityY = 0;
        fill("black");
        textSize(20);
        text("GAME OVER", 250, 30);
    }

    if(gameState === END2) {
        scena.velocityY = 0;
        fill("black");
        textSize(20);
        text("GAME OVER", 250, 30);
    }

    ob1Group1.displace(gato);
    ob1Group2.displace(gato);
    ob1Group3.displace(gato);
    ob2Group1.displace(gato);
    ob2Group2.displace(gato);
    ob2Group3.displace(gato);
    ob2Group4.displace(gato);
    ob3Group1.displace(gato);
    ob3Group2.displace(gato);
    ob3Group3.displace(gato);
    ob3Group4.displace(gato);
    ob4Group1.displace(gato);
    ob4Group2.displace(gato);
    ob4Group3.displace(gato);
    ob4Group4.displace(gato);
    limite1.displace(gato);
    limite2.displace(gato);


    ob1Group1.displace(ratonGroup);
    ob1Group2.displace(ratonGroup);
    ob1Group3.displace(ratonGroup);
    ob2Group1.displace(ratonGroup);
    ob2Group2.displace(ratonGroup);
    ob2Group3.displace(ratonGroup);
    ob2Group4.displace(ratonGroup);
    ob3Group1.displace(ratonGroup);
    ob3Group2.displace(ratonGroup);
    ob3Group3.displace(ratonGroup);
    ob3Group4.displace(ratonGroup);
    ob4Group1.displace(ratonGroup);
    ob4Group2.displace(ratonGroup);
    ob4Group3.displace(ratonGroup);
    ob4Group4.displace(ratonGroup);
    limite1.displace(ratonGroup);
    limite2.displace(ratonGroup);

    fill("black");
    textSize(15);
    text("Alimento: " + score + "%",400,50);
    text("Hambre:",300,75);
    text("score:" + score1,110,50);

 
}

function continuoRaton() {
    if(frameCount % 180 === 0) {
        var raton = createSprite(200, -1);
        raton.velocityY = 3;
        raton.addImage(ratonImg);
        raton.scale = 0.2;
        raton.x = Math.round(random(150,450));
        raton.lifetime = 200;
        ratonGroup.add(raton);
        raton.depth = limite3.depth;
        limite3.depth = limite3.depth +1;
    }
}

function obstacleFunction_1() {
    var obstacle1_1 = createSprite(140,-1);
    obstacle1_1.addImage(obstaculoImg);
    obstacle1_1.scale = 0.2;
    obstacle1_1.velocityY = (3 + score1/100);
    obstacle1_1.lifetime = 250;

    var obstacle1_2 = createSprite(220,-1);
    obstacle1_2.addImage(obstaculoImg);
    obstacle1_2.scale = 0.2;
    obstacle1_2.velocityY = (3 + score1/100);
    obstacle1_2.lifetime = 250;

    var obstacle1_3 = createSprite(380,-1);
    obstacle1_3.addImage(obstaculoImg);
    obstacle1_3.scale = 0.2;
    obstacle1_3.velocityY =  (3 + score1/100);
    obstacle1_3.lifetime = 250;

    ob1Group1.add(obstacle1_1);
    ob1Group2.add(obstacle1_2);
    ob1Group3.add(obstacle1_3);

    obstacle1_1.depth = limite3.depth;
    limite3.depth = limite3.depth +1;
    obstacle1_2.depth = limite3.depth;
    limite3.depth = limite3.depth +1;
    obstacle1_3.depth = limite3.depth;
    limite3.depth = limite3.depth +1;
    
}

function obstacleFunction_2() {
    var obstacle2_1 = createSprite(140,-1);
    obstacle2_1.addImage(obstaculoImg);
    obstacle2_1.scale = 0.2;
    obstacle2_1.velocityY = (3 + score1/100);
    obstacle2_1.lifetime = 250;

    var obstacle2_2 = createSprite(220,-1);
    obstacle2_2.addImage(obstaculoImg);
    obstacle2_2.scale = 0.2;
    obstacle2_2.velocityY = (3 + score1/100);
    obstacle2_2.lifetime = 250;

    var obstacle2_3 = createSprite(380,-1);
    obstacle2_3.addImage(obstaculoImg);
    obstacle2_3.scale = 0.2;
    obstacle2_3.velocityY = (3 + score1/100);
    obstacle2_3.lifetime = 250;

    var obstacle2_4 = createSprite(460,-1);
    obstacle2_4.addImage(obstaculoImg);
    obstacle2_4.scale = 0.2;
    obstacle2_4.velocityY = (3 + score1/100);
    obstacle2_4.lifetime = 250;

    ob2Group1.add(obstacle2_1);
    ob2Group2.add(obstacle2_2);
    ob2Group3.add(obstacle2_3);
    ob2Group4.add(obstacle2_4);

    obstacle2_1.depth = limite3.depth;
    limite3.depth = limite3.depth +1;
    obstacle2_2.depth = limite3.depth;
    limite3.depth = limite3.depth +1;
    obstacle2_3.depth = limite3.depth;
    limite3.depth = limite3.depth +1;
    obstacle2_4.depth = limite3.depth;
    limite3.depth = limite3.depth +1;
    
}

function obstacleFunction_3() {
    var obstacle3_1 = createSprite(140,-1);
    obstacle3_1.addImage(obstaculoImg);
    obstacle3_1.scale = 0.2;
    obstacle3_1.velocityY = (3 + score1/100);
    obstacle3_1.lifetime = 250;

    var obstacle3_2 = createSprite(220,-1);
    obstacle3_2.addImage(obstaculoImg);
    obstacle3_2.scale = 0.2;
    obstacle3_2.velocityY = (3 + score1/100);
    obstacle3_2.lifetime = 250;

    var obstacle3_3 = createSprite(300,-1);
    obstacle3_3.addImage(obstaculoImg);
    obstacle3_3.scale = 0.2;
    obstacle3_3.velocityY = (3 + score1/100);
    obstacle3_3.lifetime = 250;

    var obstacle3_4 = createSprite(380,-1);
    obstacle3_4.addImage(obstaculoImg);
    obstacle3_4.scale = 0.2;
    obstacle3_4.velocityY = (3 + score1/100);
    obstacle3_4.lifetime = 250;

    ob3Group1.add(obstacle3_1);
    ob3Group2.add(obstacle3_2);
    ob3Group3.add(obstacle3_3);
    ob3Group4.add(obstacle3_4);

    obstacle3_1.depth = limite3.depth;
    limite3.depth = limite3.depth +1;
    obstacle3_2.depth = limite3.depth;
    limite3.depth = limite3.depth +1;
    obstacle3_3.depth = limite3.depth;
    limite3.depth = limite3.depth +1;
    obstacle3_4.depth = limite3.depth;
    limite3.depth = limite3.depth +1;
    
}
function obstacleFunction_4() {
    var obstacle4_1 = createSprite(220,-1);
    obstacle4_1.addImage(obstaculoImg);
    obstacle4_1.scale = 0.2;
    obstacle4_1.velocityY = (3 + score1/100);
    obstacle4_1.lifetime = 250;

    var obstacle4_2 = createSprite(300,-1);
    obstacle4_2.addImage(obstaculoImg);
    obstacle4_2.scale = 0.2;
    obstacle4_2.velocityY = (3 + score1/100);
    obstacle4_2.lifetime = 250;

    var obstacle4_3 = createSprite(380,-1);
    obstacle4_3.addImage(obstaculoImg);
    obstacle4_3.scale = 0.2;
    obstacle4_3.velocityY = (3 + score1/100);
    obstacle4_3.lifetime = 250;

    var obstacle4_4 = createSprite(460,-1);
    obstacle4_4.addImage(obstaculoImg);
    obstacle4_4.scale = 0.2;
    obstacle4_4.velocityY = (3 + score1/100);
    obstacle4_4.lifetime = 250;

    ob4Group1.add(obstacle4_1);
    ob4Group2.add(obstacle4_2);
    ob4Group3.add(obstacle4_3);
    ob4Group4.add(obstacle4_4);
    
    obstacle4_1.depth = limite3.depth;
    limite3.depth = limite3.depth +1;
    obstacle4_2.depth = limite3.depth;
    limite3.depth = limite3.depth +1;
    obstacle4_3.depth = limite3.depth;
    limite3.depth = limite3.depth +1;
    obstacle4_4.depth = limite3.depth;
    limite3.depth = limite3.depth +1;
}
