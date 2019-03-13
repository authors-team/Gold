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

var ragdollLib = {
  bodyparts:    [
                  { x: 0, y: -65, xSize: 34,  ySize: 40, 
                    options:  {
                                label: 'head',
                                isStatic: false, 
                                chamfer: { radius: 15 },
                                collisionFilter: { group: 1 }
                              } 
                  },
                  { x: 0, y: 0, xSize: 55,  ySize: 80, 
                    options:  {
                                label: 'chest',
                                restitution: 0.9, 
                                chamfer: { radius: 25 },
                                collisionFilter: { group: -1 }
                              } 
                  },
                  { x: -45, y: -15, xSize: 20, ySize: 40, 
                    options:  {
                                label: 'leftUpperArm',
                                restitution: 0.9,   
                                chamfer: { radius: 10 },
                                collisionFilter: { group: -1 }
                              } 
                  },
                  { x: -45, y: 40, xSize: 20, ySize: 60, 
                    options:  { 
                                label: 'leftLowerArm',
                                restitution: 0.9,
                                collisionFilter: { group: -1 }
                              } 
                  },
                  { x: 45, y: -15, xSize: 20, ySize: 40,
                    options:  {
                                label: 'rightUpperArm',
                                restitution: 0.9,  
                                chamfer: { radius: 10 },
                                collisionFilter: { group: -1 }
                              } 
                  },
                  { x: 45, y: 40, xSize: 20, ySize: 60, 
                    options:  { 
                                label: 'rightLowerArm',
                                restitution: 0.9,
                                collisionFilter: { group: -1 }
                              } 
                  },
                  { x: -15, y: 65, xSize: 20, ySize: 40, 
                    options:  {
                                label: 'leftUpperLeg',
                                restitution: 0.9,  
                                chamfer: { radius: 10 },
                                collisionFilter: { group: -1 }
                              } 
                  },
                  { x: -20, y: 120, xSize: 20, ySize: 60,
                    options:  { 
                                label: 'leftLowerLeg',
                                restitution: 0.9,
                                collisionFilter: { group: -1 }
                              } 
                  },
                  { x: 15, y: 65, xSize: 20, ySize: 40, 
                    options:  {
                                label: 'rightUpperLeg',
                                restitution: 0.9, 
                                chamfer: { radius: 10 },
                                collisionFilter: { group: -1 }
                              } 
                  },
                  { x: 20, y: 120, xSize: 20, ySize: 60,
                    options:  { 
                                label: 'rightLowerLeg',
                                restitution: 0.9,
                                collisionFilter: { group: -1 }
                              } 
                  },
                ],
  constraints:  [
                  { label: 'headToChest', bodyA: 'head', bodyB: 'chest', pointA: { x: 0, y: 25 }, pointB: { x: 0, y: -35 }, stiffness: 0.8 },
                  { label: 'chestToLeftUpperArm', bodyA: 'chest', bodyB: 'leftUpperArm', pointA: { x: -24, y: -23 }, pointB: { x: 0, y: -8 }, stiffness: 0.8 },
                  { label: 'leftUpperToLowerArm', bodyA: 'leftUpperArm', bodyB: 'leftLowerArm', pointA: { x: 0, y: 15 }, pointB: { x: 0, y: -25 }, stiffness: 0.8 },
                  { label: 'chestToRightUpperArm', bodyA: 'chest', bodyB: 'rightUpperArm', pointA: { x: 24, y: -23 }, pointB: { x: 0, y: -8 }, stiffness: 0.8 },
                  { label: 'rightUpperToLowerArm', bodyA: 'rightUpperArm', bodyB: 'rightLowerArm', pointA: { x: 0, y: 15 }, pointB: { x: 0, y: -25 }, stiffness: 0.8},
                  { label: 'chestToLeftUpperLeg', bodyA: 'chest', bodyB: 'leftUpperLeg', pointA: { x: -10, y: 30 }, pointB: { x: 0, y: -10 }, stiffness: 0.8 },
                  { label: 'leftUpperToLowerLeg', bodyA: 'leftUpperLeg', bodyB: 'leftLowerLeg', pointA: { x: 0, y: 20 }, pointB: { x: 0, y: -20 }, stiffness: 0.8 },
                  { label: 'chestToRightUpperLeg', bodyA: 'chest', bodyB: 'rightUpperLeg',  pointA: { x: 10, y: 30 }, pointB: { x: 0, y: -10 }, stiffness: 0.8 },
                  { label: 'rightUpperToLowerLeg', bodyA: 'rightUpperLeg', bodyB: 'rightLowerLeg', pointA: { x: 0, y: 20 }, pointB: { x: 0, y: -20 }, stiffness: 0.8 },
                  { label: 'legToLeg', bodyA: 'leftLowerLeg', bodyB: 'rightLowerLeg', pointA: { x: 0, y:0 }, pointB: { x: 0, y:0 }, stiffness: 0.01 }
                ]
};

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

  ragdoll = new Ragdoll( ragdollLib, width / 2, height / 2, 1 );
  // coin = new Coin( width / 2, 100, radius );

  var options = {
    isStatic: true
  }
  ground = Bodies.rectangle( width / 2, height, width, 100, options);

  World.add( world, [ mouseConstraint, ground ] );
  // World.add( world, ground );
}

function draw() {
  background(51);
  Engine.update(engine);

  if ( mouseConstraint.body ) { // is there a body selected?
    var pos = mouseConstraint.body.position;
    var offset = mouseConstraint.constraint.pointB;
    var m = mouseConstraint.mouse.position;
    stroke(0, 255, 0);
    // line(coin.body.position.x + offset.x, coin.body.position.y + offset.y, m.x, m.y);
  }
  
  ragdoll.show();
  // coin.show();
  noStroke(255);
  fill(170);
  rectMode(CENTER);
  groundPos = ground.position;
  rect(groundPos.x, groundPos.y, width, 100);
}


