/**
 * MyRobot
 * @constructor
 */
 function MyRobot(scene) {
 	CGFobject.call(this,scene);
 	this.initBuffers();
 	this.rotacao = 0;
 	this.viagem = 0;
 };

 MyRobot.prototype = Object.create(CGFobject.prototype);
 MyRobot.prototype.constructor = MyRobot;

 MyRobot.prototype.initBuffers = function() {

	this.indices = [
 	];
 	this.vertices = [
 	];
 	this.normals = [
 	];

	// TRIANGULO DA ESQUERDA
 	this.vertices.push(0.5, 0.3, 0);
 	this.vertices.push(-0.5, 0.3, 0);
 	this.vertices.push(0, 0.3, 2);
 	
	this.normals.push(0, 1, 0);
	this.normals.push(0, 1, 0);
	this.normals.push(0, 1, 0);

 	this.indices.push(0, 1, 2);

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();

 };

 MyRobot.prototype.setRotate = function(rotation) {
 	this.rotacao += rotation;
 };

 MyRobot.prototype.setTravel = function(travel) {
 	this.viagem +=travel;
 };