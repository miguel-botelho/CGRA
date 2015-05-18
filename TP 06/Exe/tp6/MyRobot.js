/**
 * MyRobot
 * @constructor
 */
 function MyRobot(scene, posX, posY, posZ, angulo) {
 	CGFobject.call(this,scene);
 	this.initBuffers();
 	this.rotacao = angulo;
 	this.viagem = 0;
 	this.animation = "OFF";
 	this.posY = posY;
 	this.posX = posX;
	this.posZ = posZ;

	this.braco = 0;
	this.braco1 = 0;
	this.roda = 0;
	this.roda1 = 0;
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
 	console.log("roda: %d\n", this.roda);
 	if (rotation > 0)
 	{
 		if (this.roda <= 5)
		{
			this.roda += rotation;
		}
		else this.roda = 5;

		if (this.roda1 >= -5)
		{
			this.roda1 += rotation;
		}
		else this.roda1 = -5;
 	}
 	
 	else
 	{
 		if (this.roda >= -5)
		{
			this.roda += rotation;
		}
		else this.roda = -5;

		if (this.roda1 <= 5)
		{
			this.roda1 += rotation;
		}
		else this.roda1 = 5;
 	}
 };

 MyRobot.prototype.setTravel = function(travel) {
 	if (travel > 0)
 	{
 		if (this.braco <= 0.4)
 		{
 			this.braco += Math.abs(travel) * Math.sin(Math.PI/18);
 		}
 		else this.braco = 0.4;

 		if (this.braco1 >= -0.4)
 		{
 			this.braco1 -= Math.abs(travel) * Math.sin(Math.PI/18);
 		}
 		else this.braco1 = -0.4;

	this.posX += Math.abs(travel) * Math.sin(this.rotacao);
 	this.posZ += Math.abs(travel) * Math.cos(this.rotacao);
 	}
 	else
 	{
 		if (this.braco >= -0.4)
 		{
 			this.braco -= Math.abs(travel) * Math.sin(Math.PI/18);
 		}
 		else this.braco = -0.4;

 		if (this.braco1 <= 0.4)
 		{
 			this.braco1 += Math.abs(travel) * Math.sin(Math.PI/18);
 		}
 		else this.braco1 = 0.4;

 	this.posX -= Math.abs(travel) * Math.sin(this.rotacao);
 	this.posZ -= Math.abs(travel) * Math.cos(this.rotacao);		
 	}
 };

 MyRobot.prototype.animateArm = function() {
 	this.tempX = this.posX;
	this.tempY = this.posY;
	this.tempZ = this.posZ;
	this.tempRotacao = this.rotacao;
	this.tempB = this.braco;
	this.tempB1 = this.braco1;

 	if (this.animation == "ON")
 		this.animation = "OFF";
	else this.animation = "ON";
 };