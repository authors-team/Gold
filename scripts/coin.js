function Coin( x, y, radius ){
	this.radius = radius;
	
	var options = {
		density: 0.05,
		friction: 0.01,
		frictionAir: 0.00001,
		restitution: 0.1,
	};

	// this.body = Bodies.circle( x, y, radius, [options], [maxSides] );
	this.body = Bodies.circle ( x, y, radius, options );
	World.add( world, this.body );
}

Coin.prototype.removeFromWorld = function(){
	World.remove( world, this.body );
}

Coin.prototype.show = function(){
	pos = this.body.position;
	push();
	translate( pos.x, pos.y );
	rectMode(CENTER);
	noStroke();
	circle( 0, 0, this.radius );
	fill(127);

	pop();
}

Coin.prototype.isOffScreen = function() {
    var pos = this.body.position;
    return pos.y > height + this.radius;
  }

Coin.prototype.setPosition = function(){
	pos = {
		x: width / 2,
		y: 100
	};

	Body.translate( this.body, {x: -10, y: 20});
	console.log(this.body.position);
}