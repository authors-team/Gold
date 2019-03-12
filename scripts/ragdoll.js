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


  var head = Bodies.rectangle(x, y - 60 * scale, 34 * scale, 40 * scale, headOptions);
  var chest = Bodies.rectangle(x, y, 55 * scale, 80 * scale, chestOptions);
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
      stiffness: 0.6,
      render: {
          visible: false
      }
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
      stiffness: 0.6,
      render: {
          visible: false
      }
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
      stiffness: 0.6,
      render: {
          visible: false
      }
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
      stiffness: 0.6,
      render: {
          visible: false
      }
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
      stiffness: 0.6,
      render: {
          visible: false
      }
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
      stiffness: 0.6,
      render: {
          visible: false
      }
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
      stiffness: 0.6,
      render: {
          visible: false
      }
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
      stiffness: 0.6,
      render: {
          visible: false
      }
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
      stiffness: 0.6,
      render: {
          visible: false
      }
  });

  var legToLeg = Constraint.create({
      bodyA: leftLowerLeg,
      bodyB: rightLowerLeg,
      stiffness: 0.01,
      render: {
          visible: false
      }
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
}

Ragdoll.prototype.show = function(){
  pos = this.body.position;
  push();
  translate( pos.x, pos.y );
  rectMode(CENTER);
  noStroke();
  circle( 0, 0, this.radius );
  fill(127);

  pop();
}



















