class Ragdoll {
  constructor( bodyLib, x, y, scale, options ){
    this._bodyparts     = bodyLib.bodyparts;
    this._constraints   = bodyLib.constraints;

    this._scale = scale = typeof scale === 'undefined' ? 1 : scale;
    
    let bodies = [];
    let constraints = [];

    //////  Create Body Parts   //////
    for (let i = 0; i < this._bodyparts.length; i++ ) {
      let bodypart = this._bodyparts[i];
      let opts = Common.extend( bodypart.options, options );
      // console.log( bodypart.options.label );


      let body = Bodies.rectangle( x + this._scale * bodypart.x, y + this._scale * bodypart.y,  this._scale * bodypart.xSize,  this._scale * bodypart.ySize, opts );
      bodies.push( body );
      console.log( bodies[i].collisionFilter );
    }

    //////  Create Constraints   //////

    function searchBodyLabels( nameKey, myArray ){
        for (let i = 0; i < myArray.length; i++) {
            if ( myArray[i].label === nameKey ) {
                return myArray[i];
            }
        }
    }

    for (let i = 0; i < this._constraints.length; i++ ) {
        let options = this._constraints[i];

        options.bodyA = searchBodyLabels( options.bodyA, bodies );
        options.bodyB = searchBodyLabels( options.bodyB, bodies );
        constraints.push(Constraint.create( options ));
    }

    //////  Create Composite   //////
    this._person = Composite.create({
        bodies: bodies,
        constraints: constraints
    });

    World.add( world, this._person );

    }

  show(){
    let bod = this._person.bodies;
    for( let i = 0; i < bod.length; i++  ){
      let pos = this._person.bodies[i].position;
      let angle = this._person.bodies[i].angle;
      let bodypart = this._bodyparts[i];
      push();
        translate( pos.x, pos.y );
        rotate(angle);
        rectMode(CENTER);
        strokeWeight(1);
        stroke(255);
        fill(127);
        rect(0, 0, this._scale * bodypart.xSize, this._scale *  bodypart.ySize);
      pop();        
    }
  }
}



















