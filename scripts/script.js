
var Engine 	= Matter.Engine,
  	World 	= Matter.World,
  	Bodies 	= Matter.Bodies,
  	Body		= Matter.Body;

var engine;
var world;
var ground;
var coin;

function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  
  coin = new Coin( width / 2, 100, 100 );

  var options = {
    isStatic: false
  }
  ground = Bodies.rectangle( width / 2, height, width, 100, options);
  World.add( world, ground );

}

function draw() {
  background(51);
  Engine.update(engine);

  if ( coin.isOffScreen() ){}
  coin.show();
  noStroke(255);
  fill(170);
  rectMode(CENTER);
  groundPos = ground.position;
  rect(groundPos.x, groundPos.y, width, 100);
}
