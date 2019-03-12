function Ragdoll(x, y, scale, options) {
  scale = typeof scale === 'undefined' ? 1 : scale;

  var headOptions = Common.extend({
    label: 'head',
    collisionFilter: {
      group: Body.nextGroup(true)
    }
  }, options);

  var chestOptions = Common.extend({
    label: 'chest',
    collisionFilter: {
      group: Body.nextGroup(true)
    }
  }, options);

  var leftUpperArmOptions = Common.extend({
    label:'left-upper-arm',
    collisionFilter: {
      group: Body.nextGroup(true)
    }
  }, options);

  var leftLowerArmOptions = Common.extend({}, leftUpperArmOptions, {
    label: 'left-lower-arm'
  });

  var rightUpperArmOptions = Common.extend({
    label:'right-upper-arm',
    collisionFilter: {
      group: Body.nextGroup(true)
    }
  }, options);

  var rightLowerArmOptions = Common.extend({}, rightUpperArmOptions, {
    label: 'right-lower-arm'
  });

  var leftUpperLegOptions = Common.extend({
      label: 'left-upper-leg',
      collisionFilter: {
          group: Body.nextGroup(true)
      }
  }, options);

  var leftLowerLegOptions = Common.extend({}, leftUpperLegOptions, {
    label:'left-lower-leg'
  });

  var rightUpperLegOptions = Common.extend({
      label: 'right-upper-leg',
      collisionFilter: {
          group: Body.nextGroup(true)
      }
  }, options);

  var rightLowerLegOptions = Common.extend({}, rightUpperLegOptions, {
    label: 'right-lower-leg'
  });


  this.bodyLibrary ={
    head: {
      xOffset: x + 0,
      yOffset: y - 60,
      xScale: scale * 34,
      yScale: scale * 40
    },
    chest:{
      xOffset: 0,
      yOffset: 0, 
      xScale: 55,
      yScale: 80
    },
    rightUpperArm:{
      xOffset: 39,
      yOffset: -15, 
      xScale: 20,
      yScale: 40      
    }
  }

  
  var hLib = this.bodyLibrary.head;
  var head = Bodies.rectangle( hLib.xOffset, hLib.yOffset, hLib.xScale, hLib.yScale, headOptions);
  var chest = Bodies.rectangle( x, y, 55 * scale, 80 * scale, chestOptions);
  var rightUpperArm = Bodies.rectangle(x + 39 * scale, y - 15 * scale, 20 * scale, 40 * scale, rightUpperArmOptions);
  var rightLowerArm = Bodies.rectangle(x + 39 * scale, y + 25 * scale, 20 * scale, 60 * scale, rightLowerArmOptions);
  var leftUpperArm = Bodies.rectangle(x - 39 * scale, y - 15 * scale, 20 * scale, 40 * scale, leftUpperArmOptions);
  var leftLowerArm = Bodies.rectangle(x - 39 * scale, y + 25 * scale, 20 * scale, 60 * scale, leftLowerArmOptions);
  var leftUpperLeg = Bodies.rectangle(x - 20 * scale, y + 57 * scale, 20 * scale, 40 * scale, leftUpperLegOptions);
  var leftLowerLeg = Bodies.rectangle(x - 20 * scale, y + 97 * scale, 20 * scale, 60 * scale, leftLowerLegOptions);
  var rightUpperLeg = Bodies.rectangle(x + 20 * scale, y + 57 * scale, 20 * scale, 40 * scale, rightUpperLegOptions);
  var rightLowerLeg = Bodies.rectangle(x + 20 * scale, y + 97 * scale, 20 * scale, 60 * scale, rightLowerLegOptions);

  var chestToRightUpperArm = Constraint.create({
      bodyA: chest,
      pointA: {
          x: 24 * scale,
          y: -23 * scale
      },
      pointB: {
          x: 0,
          y: -8 * scale
      },
      bodyB: rightUpperArm,
      stiffness: 0.6
  });

  var chestToLeftUpperArm = Constraint.create({
      bodyA: chest,
      pointA: {
          x: -24 * scale,
          y: -23 * scale
      },
      pointB: {
          x: 0,
          y: -8 * scale
      },
      bodyB: leftUpperArm,
      stiffness: 0.6
  });

  var chestToLeftUpperLeg = Constraint.create({
      bodyA: chest,
      pointA: {
          x: -10 * scale,
          y: 30 * scale
      },
      pointB: {
          x: 0,
          y: -10 * scale
      },
      bodyB: leftUpperLeg,
      stiffness: 0.6
  });

  var chestToRightUpperLeg = Constraint.create({
      bodyA: chest,
      pointA: {
          x: 10 * scale,
          y: 30 * scale
      },
      pointB: {
          x: 0,
          y: -10 * scale
      },
      bodyB: rightUpperLeg,
      stiffness: 0.6
  });

  var upperToLowerRightArm = Constraint.create({
      bodyA: rightUpperArm,
      bodyB: rightLowerArm,
      pointA: {
          x: 0,
          y: 15 * scale
      },
      pointB: {
          x: 0,
          y: -25 * scale
      },
      stiffness: 0.6
  });

  var upperToLowerLeftArm = Constraint.create({
      bodyA: leftUpperArm,
      bodyB: leftLowerArm,
      pointA: {
          x: 0,
          y: 15 * scale
      },
      pointB: {
          x: 0,
          y: -25 * scale
      },
      stiffness: 0.6
  });

  var upperToLowerLeftLeg = Constraint.create({
      bodyA: leftUpperLeg,
      bodyB: leftLowerLeg,
      pointA: {
          x: 0,
          y: 20 * scale
      },
      pointB: {
          x: 0,
          y: -20 * scale
      },
      stiffness: 0.6
  });

  var upperToLowerRightLeg = Constraint.create({
      bodyA: rightUpperLeg,
      bodyB: rightLowerLeg,
      pointA: {
          x: 0,
          y: 20 * scale
      },
      pointB: {
          x: 0,
          y: -20 * scale
      },
      stiffness: 0.6
  });

  var headContraint = Constraint.create({
      bodyA: head,
      pointA: {
          x: 0,
          y: 25 * scale
      },
      pointB: {
          x: 0,
          y: -35 * scale
      },
      bodyB: chest,
      stiffness: 0.6
  });

  var legToLeg = Constraint.create({
      bodyA: leftLowerLeg,
      bodyB: rightLowerLeg,
      stiffness: 0.01
  });


  this.person = Composite.create({
      bodies: [
          head, chest, 
          leftUpperArm, leftLowerArm,
          rightUpperArm, rightLowerArm,
          leftUpperLeg, leftLowerLeg, 
          rightUpperLeg, rightLowerLeg
      ],
      constraints: [
          upperToLowerLeftArm, upperToLowerRightArm, chestToLeftUpperArm, 
          chestToRightUpperArm, headContraint, upperToLowerLeftLeg, 
          upperToLowerRightLeg, chestToLeftUpperLeg, chestToRightUpperLeg,
          legToLeg
      ]
  });

  World.add( world, this.person );
}

Ragdoll.prototype.show = function(){
  var pos = this.person.bodies[1].position;
  var angle = this.person.bodies[1].angle;
  var lib = this.bodyLibrary.head;
  push();
    translate( pos.x, pos.y );
    rotate(angle);
    rectMode(CENTER);
    strokeWeight(1);
    stroke(255);
    fill(127);
    rect(0, 0, lib.xScale, lib.yScale);
  pop();
}



















