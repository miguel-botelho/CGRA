/**
 * MyRobotHandler
 * @constructor
 */
 function MyRobotHandler(scene) {
 	CGFobject.call(this,scene);
	
 	this.robot = new MyRobot(this.scene);
 	this.initBuffers();
 };

 MyRobotHandler.prototype = Object.create(CGFobject.prototype);
 MyRobotHandler.prototype.constructor = MyRobotHandler;

MyRobotHandler.prototype.display = function() {
	
	this.scene.pushMatrix();
	this.scene.rotate(this.robot.rotacao, 0, 1, 0);
	this.scene.rotate(-Math.PI/1.2, 0, 1, 0);
	this.scene.translate(0, 0, this.robot.viagem);
	this.robot.display();
	this.scene.popMatrix();
	
};