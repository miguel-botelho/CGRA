/**
 * MyFloor
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyFloor(scene) {
	CGFobject.call(this,scene);

	this.cubo1=new MyUnitCube(this.scene);

	this.cubo1.initBuffers();

};

MyFloor.prototype = Object.create(CGFobject.prototype);
MyFloor.prototype.constructor=MyFloor;

MyFloor.prototype.display = function () {
	
	this.scene.pushMatrix();
	this.scene.scale(8,0.1,6);
	this.scene.translate(0,0.5,0);
	this.cubo1.display();
	this.scene.popMatrix();
};
