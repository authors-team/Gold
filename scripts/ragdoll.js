class Ragdoll {
  constructor( bodyLib, x, y, scale, options ){
    this._bodyparts     =   bodyLib.bodyparts;
    this._constraints   =   bodyLib.constraints;

    this._scale = scale = typeof scale === 'undefined' ? 1 : scale;
    
    let bodies = [];
    let constraints = [];

    //////  Create Body Parts   //////
    for (let i = 0; i < this._bodyparts.length; i++ ) {
      let bodypart = this._bodyparts[i];
      
      let opts = Common.extend( bodypart.options, options );
      // let opts = bodypart.options;

      let body = Bodies.rectangle( x + this._scale * bodypart.x, y + this._scale * bodypart.y,  this._scale * bodypart.xSize,  this._scale * bodypart.ySize, opts );
      bodies.push( body );

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
        constraints.push( Constraint.create( options ) );
    }

    //////  Create Composite   //////
    this._person = Composite.create({
        bodies: bodies,
        constraints: constraints
    });

    World.add( world, this._person );

    }

  show(){
    let bodies = this._person.bodies;
    for( let i = 0; i < bodies.length; i++  ){

      let pos = bodies[i].position;
      let angle = bodies[i].angle;

      let bodypart = this._bodyparts[i];
      let xSize = this._scale * bodypart.xSize;
      let ySize = this._scale *  bodypart.ySize;

      push();
        translate( pos.x, pos.y );
        rotate(angle);
        rectMode(CENTER);
        strokeWeight(1);
        stroke(255);
        fill(127);
        rect(0, 0, xSize, ySize, 10);
      pop();        
    }
  }
}



















