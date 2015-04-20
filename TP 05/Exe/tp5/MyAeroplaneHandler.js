/**
 * MyAeroplaneHandlerHandler
 * @constructor
 */
 function MyAeroplaneHandler(scene) {
 	CGFobject.call(this,scene);
	
	this.delta = 0;
	this.lastCurrTime = 0;
	this.distanceX = 14;
	this.turnX = 0;
	this.turnY = 0;
	this.distanceY = 4.5;
 	this.plane = new MyAeroplane(this.scene);
 	this.plane.setTravelTime(1);
 	this.initBuffers();
 };

 MyAeroplaneHandler.prototype = Object.create(CGFobject.prototype);
 MyAeroplaneHandler.prototype.constructor = MyAeroplaneHandler;

MyAeroplaneHandler.prototype.display = function() {
	
	this.scene.pushMatrix();
	if (this.distanceX - 1 <= this.plane.travelTime) {
		if (this.distanceY + this.distanceX - 2 <= this.plane.travelTime)
		{
			this.scene.translate(-this.distanceX + 1, -this.distanceY + 0.5, 0);
		}
		else
		{	
			this.scene.translate(-this.distanceX + 0.01, 0, 0);
			this.scene.rotate(Math.PI / 2, 0, 0, 1);
			this.scene.translate(-this.plane.travelTime + this.distanceX - 1, 0, 0);	
		}
	}
	else
	{
		this.scene.translate(-this.plane.travelTime, 0, 0);
	}
	this.plane.display();
	this.scene.popMatrix();
	
};

 MyAeroplaneHandler.prototype.update = function(currTime) {
	this.delta = currTime - this.lastCurrTime;
    this.lastCurrTime = currTime;
 	this.plane.setTravelTime(this.plane.travelTime + (360 / (60 * 3) / (this.delta / 10)) );
};