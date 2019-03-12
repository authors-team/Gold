class Ragdoll {
  constructor( lib, x, y, scale, options ){
    this._library = lib;
    this._scale = scale = typeof scale === 'undefined' ? 1 : scale;
    let bodies = [];

    let headOptions = Common.extend({
      label: 'head',
      collisionFilter: {
        group: Body.nextGroup(true)
      }
    }, options);

    let chestOptions = Common.extend({
      label: 'chest',
      collisionFilter: {
        group: Body.nextGroup(true)
      }
    }, options);

    let leftUpperArmOptions = Common.extend({
      label:'left-upper-arm',
      collisionFilter: {
        group: Body.nextGroup(true)
      }
    }, options);

    let leftLowerArmOptions = Common.extend({}, leftUpperArmOptions, {
      label: 'left-lower-arm'
    });

    let rightUpperArmOptions = Common.extend({
      label:'right-upper-arm',
      collisionFilter: {
        group: Body.nextGroup(true)
      }
    }, options);

    let rightLowerArmOptions = Common.extend({}, rightUpperArmOptions, {
      label: 'right-lower-arm'
    });

    let leftUpperLegOptions = Common.extend({
        label: 'left-upper-leg',
        collisionFilter: {
            group: Body.nextGroup(true)
        }
    }, options);

    let leftLowerLegOptions = Common.extend({}, leftUpperLegOptions, {
      label:'left-lower-leg'
    });

    let rightUpperLegOptions = Common.extend({
        label: 'right-upper-leg',
        collisionFilter: {
            group: Body.nextGroup(true)
        }
    }, options);

    let rightLowerLegOptions = Common.extend({}, rightUpperLegOptions, {
      label: 'right-lower-leg'
    });

    for (let i = 0; i < this._library.length; i++ ) {
      let lib = this._library[i];
      let opts = {
        label: lib.label
      }
      let body = Bodies.rectangle( x + this._scale * lib.x, y + this._scale * lib.y,  this._scale * lib.xSize,  this._scale * lib.ySize, opts );
      bodies.push( body );
    }

    // let chestToRightUpperArm = Constraint.create({
    //     bodyA: chest,
    //     pointA: {
    //         x: 24 * scale,
    //         y: -23 * scale
    //     },
    //     pointB: {
    //         x: 0,
    //         y: -8 * scale
    //     },
    //     bodyB: rightUpperArm,
    //     stiffness: 0.6
    // });

    // let chestToLeftUpperArm = Constraint.create({
    //     bodyA: chest,
    //     pointA: {
    //         x: -24 * scale,
    //         y: -23 * scale
    //     },
    //     pointB: {
    //         x: 0,
    //         y: -8 * scale
    //     },
    //     bodyB: leftUpperArm,
    //     stiffness: 0.6
    // });

    // let chestToLeftUpperLeg = Constraint.create({
    //     bodyA: chest,
    //     pointA: {
    //         x: -10 * scale,
    //         y: 30 * scale
    //     },
    //     pointB: {
    //         x: 0,
    //         y: -10 * scale
    //     },
    //     bodyB: leftUpperLeg,
    //     stiffness: 0.6
    // });

    // let chestToRightUpperLeg = Constraint.create({
    //     bodyA: chest,
    //     pointA: {
    //         x: 10 * scale,
    //         y: 30 * scale
    //     },
    //     pointB: {
    //         x: 0,
    //         y: -10 * scale
    //     },
    //     bodyB: rightUpperLeg,
    //     stiffness: 0.6
    // });

    // let upperToLowerRightArm = Constraint.create({
    //     bodyA: rightUpperArm,
    //     bodyB: rightLowerArm,
    //     pointA: {
    //         x: 0,
    //         y: 15 * scale
    //     },
    //     pointB: {
    //         x: 0,
    //         y: -25 * scale
    //     },
    //     stiffness: 0.6
    // });

    // let upperToLowerLeftArm = Constraint.create({
    //     bodyA: leftUpperArm,
    //     bodyB: leftLowerArm,
    //     pointA: {
    //         x: 0,
    //         y: 15 * scale
    //     },
    //     pointB: {
    //         x: 0,
    //         y: -25 * scale
    //     },
    //     stiffness: 0.6
    // });

    // let upperToLowerLeftLeg = Constraint.create({
    //     bodyA: leftUpperLeg,
    //     bodyB: leftLowerLeg,
    //     pointA: {
    //         x: 0,
    //         y: 20 * scale
    //     },
    //     pointB: {
    //         x: 0,
    //         y: -20 * scale
    //     },
    //     stiffness: 0.6
    // });

    // let upperToLowerRightLeg = Constraint.create({
    //     bodyA: rightUpperLeg,
    //     bodyB: rightLowerLeg,
    //     pointA: {
    //         x: 0,
    //         y: 20 * scale
    //     },
    //     pointB: {
    //         x: 0,
    //         y: -20 * scale
    //     },
    //     stiffness: 0.6
    // });

    // let headContraint = Constraint.create({
    //     bodyA: head,
    //     pointA: {
    //         x: 0,
    //         y: 25 * scale
    //     },
    //     pointB: {
    //         x: 0,
    //         y: -35 * scale
    //     },
    //     bodyB: chest,
    //     stiffness: 0.6
    // });

    // let legToLeg = Constraint.create({
    //     bodyA: leftLowerLeg,
    //     bodyB: rightLowerLeg,
    //     stiffness: 0.01
    // });


    // this._person = Composite.create({
    //     bodies: [
    //         head, chest, 
    //         leftUpperArm, leftLowerArm,
    //         rightUpperArm, rightLowerArm,
    //         leftUpperLeg, leftLowerLeg, 
    //         rightUpperLeg, rightLowerLeg
    //     ],
    //     constraints: [
    //         upperToLowerLeftArm, upperToLowerRightArm, chestToLeftUpperArm, 
    //         chestToRightUpperArm, headContraint, upperToLowerLeftLeg, 
    //         upperToLowerRightLeg, chestToLeftUpperLeg, chestToRightUpperLeg,
    //         legToLeg
    //     ]
    // });

   this._person = Composite.create({
        bodies: bodies,
        constraints: []
    });

    World.add( world, this._person );

  }

  show(){
    let bod = this._person.bodies;
    for( let i = 0; i < bod.length; i++  ){
      let pos = this._person.bodies[i].position;
      let angle = this._person.bodies[i].angle;
      let lib = this._library[i];
      push();
        translate( pos.x, pos.y );
        rotate(angle);
        rectMode(CENTER);
        strokeWeight(1);
        stroke(255);
        fill(127);
        rect(0, 0, this._scale * lib.xSize, this._scale *  lib.ySize);
      pop();        
    }
  }
}



















