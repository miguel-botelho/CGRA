/**
 * MyRobot
 * @constructor
 */
 function MyRobot(scene, posX, posY, posZ, angulo) {
 	CGFobject.call(this,scene);
 	this.initBuffers();
 	this.rotacao = angulo;
 	this.viagem = 0;
 	this.posY = posY;
 	this.posX = posX;
	this.posZ = posZ;

	this.braco = 0;
	this.braco1 = 0;
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
 	console.log("braco: \n", this.braco);
 	if (travel > 0)
 	{
 		if (this.braco <= 0.4)
 		{
 			this.braco += 0.1 * Math.sin(Math.PI/18);
 		}
 		else this.braco = 0.4;

 		if (this.braco1 >= -0.4)
 		{
 			this.braco1 -= 0.1 * Math.sin(Math.PI/18);
 		}
 		else this.braco1 = -0.4;

	this.posX += 0.3 * Math.sin(this.rotacao);
 	this.posZ += 0.3 * Math.cos(this.rotacao);
 	}
 	else
 	{
 		if (this.braco >= -0.4)
 		{
 			this.braco -= 0.1 * Math.sin(Math.PI/18);
 		}
 		else this.braco = -0.4;

 		if (this.braco1 <= 0.4)
 		{
 			this.braco1 += 0.1 * Math.sin(Math.PI/18);
 		}
 		else this.braco1 = 0.4;

 	this.posX -= 0.3 * Math.sin(this.rotacao);
 	this.posZ -= 0.3 * Math.cos(this.rotacao);		
 	}
 };

 MyRobot.prototype.animateArm = function() {

 };