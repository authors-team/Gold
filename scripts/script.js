
var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Common = Matter.Common,
    Composite = Matter.Composite,
    Constraint = Matter.Constraint,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint;

        
var engine,
		world,
		mouse;

var ground;
var coin;
var radius = 20;
var ragdoll;

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;

  //////	 MOUSE 	//////
  var canvasMouse = Mouse.create( canvas.elt ); // get canvas from p5
  canvasMouse.pixelRatio = pixelDensity(); // accounting for high res monitors

  var options = {
  	mouse: canvasMouse,
  	constraint: {
			stiffness: 0.2,
			length: 0.5,
			angularStiffness: 0.0,
			render: {
			    visible: false
			}
		}
  };

  mouseConstraint = MouseConstraint.create( engine, options );
  // mouseConstraint.mouse.element.removeEventListener("mousewheel", mouseConstraint.mouse.mousewheel);
  // mouseConstraint.mouse.element.removeEventListener("DOMMouseScroll", mouseConstraint.mouse.mousewheel);


  ragdoll = new Ragdoll( width / 2, height / 2 );
  coin = new Coin( width / 2, 100, radius );

  var options = {
    isStatic: true
  }
  ground = Bodies.rectangle( width / 2, height, width, 100, options);

  World.add( world, [ mouseConstraint, ground ] );
}

function draw() {
  background(51);
  Engine.update(engine);

  if ( coin.isOffScreen() ){}

  if ( mouseConstraint.body ) { // is there a body selected?
  	// console.log("true");
    var pos = mouseConstraint.body.position;
    var offset = mouseConstraint.constraint.pointB;
    var m = mouseConstraint.mouse.position;
    stroke(0, 255, 0);
    line(coin.body.position.x + offset.x, coin.body.position.y + offset.y, m.x, m.y);
  }
  
  coin.show();
  noStroke(255);
  fill(170);
  rectMode(CENTER);
  groundPos = ground.position;
  rect(groundPos.x, groundPos.y, width, 100);
}


