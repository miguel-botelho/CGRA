/**
 * MyRobotHandler
 * @constructor
 */
 function MyRobotHandler(scene, posX, posY, posZ, angulo) {
 	CGFobject.call(this,scene);
	
 	this.robot = new MyRobot(this.scene, posX, posY, posZ, angulo);
 	this.cilindro = new MyCylinder(this.scene, 20, 20);
 	this.topo = new MyCircle(this.scene, 20)
 	this.roda = new MyCylinder(this.scene, 20, 20);
	this.sphere = new MyLamp(this.scene, 20, 20);


	this.wheel = new CGFappearance(scene);
	this.wheel.loadTexture("../resources/images/wheel.png");
	this.wheel.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
	this.wheel.setSpecular(0.5, 0.5, 0.5, 1);
	this.wheel.setShininess(100);
	this.wheel.setDiffuse(0.3, 0.3, 0.3, 1);

	this.head = new CGFappearance(scene);
	this.head.loadTexture("../resources/images/head.png");
	this.head.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
	this.head.setSpecular(1, 1, 1, 1);
	this.head.setShininess(100);
	this.head.setDiffuse(1, 1, 1, 1);

	this.androidHead = new CGFappearance(scene);
	this.androidHead.loadTexture("../resources/images/androidHead.png");
	this.androidHead.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
	this.androidHead.setSpecular(1, 1, 1, 1);
	this.androidHead.setShininess(100);
	this.androidHead.setDiffuse(1, 1, 1, 1);

	this.rim = new CGFappearance(scene);
	this.rim.loadTexture("../resources/images/rim.jpg");
	this.rim.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
	this.rim.setSpecular(0.5, 0.5, 0.5, 1);
	this.rim.setShininess(100);
	this.rim.setDiffuse(0.3, 0.3, 0.3, 1);

	this.green = new CGFappearance(scene);
	this.green.setSpecular(0.64, 0.78, 0.22, 1);
	this.green.setShininess(1);
	this.green.setDiffuse(0.64, 0.78, 0.22, 1);

	this.red = new CGFappearance(scene);
	this.red.setSpecular(1, 0, 0, 1);
	this.red.setShininess(1);
	this.red.setDiffuse(1, 0, 0, 1);

	this.blue = new CGFappearance(scene);
	this.blue.setSpecular(0, 0, 1, 1);
	this.blue.setShininess(1);
	this.blue.setDiffuse(0, 0, 1, 1);


 	this.initBuffers();
 };

 MyRobotHandler.prototype = Object.create(CGFobject.prototype);
 MyRobotHandler.prototype.constructor = MyRobotHandler;

MyRobotHandler.prototype.display = function() {
	
	this.scene.pushMatrix();
	
	/* MOVIMENTO DO ROBOT */
	this.scene.translate(this.robot.posX, this.robot.posY, this.robot.posZ);		
	this.scene.rotate(this.robot.rotacao, 0, 1, 0);


	/* RODAS DO ROBOT */
	this.scene.pushMatrix();
	this.scene.translate(0.5, -2.5, 0);
	this.scene.scale(0.5, 0.5, 0.5);
	this.scene.rotate(Math.PI / 2, 0, 1, 0);
	
	/* PARTE DE FORA 1 */
	this.scene.pushMatrix();
	this.scene.rotate(-this.robot.posX, 0, 0, 1);
	this.rim.apply();
	this.topo.display();
	this.scene.popMatrix();

	/* PARTE DE FORA 2 */
	this.scene.pushMatrix();
	this.scene.rotate(Math.PI, 1, 0, 0);
	this.scene.translate(0, 0, -1);
	this.scene.rotate(-this.robot.posX, 0, 0, 1);
	this.topo.display();
	this.scene.popMatrix();
	
	/* RODA 1 */
	this.wheel.apply();
	this.roda.display();

	/* BRACO 1 COM ESFERA */
	this.scene.pushMatrix();
	this.scene.materialDefault.apply();
	this.scene.translate(0.3, 2, 0.5);
	this.scene.rotate(-Math.PI/2, 1, 0, 0);

	this.scene.pushMatrix();
	this.scene.scale(0.5, 0.5, 0.5);
	this.scene.translate(0, 0, 5);
	this.green.apply();
	this.sphere.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.scale(0.5, 0.5, 0.5);
	this.scene.rotate(Math.PI, 1, 0, 0);
	this.sphere.display();
	this.scene.popMatrix();

	this.scene.scale(0.5, 0.5, 2.5);
	this.cilindro.display();
	this.scene.popMatrix();

	/* PARTE DE FORA 3 */
	this.scene.pushMatrix();
	this.scene.rotate(Math.PI, 1, 0, 0);
	this.scene.translate(0, 0, 2);
	this.rim.apply();
	this.scene.rotate(-this.robot.posX, 0, 0, 1);
	this.topo.display();
	this.scene.popMatrix();

	this.scene.translate(0, 0, -3);

	this.scene.pushMatrix();
	/* PARTE DE FORA 4 */
	this.scene.pushMatrix();
	this.scene.rotate(-this.robot.posX, 0, 0, 1);
	this.topo.display();
	this.scene.popMatrix();
	/* RODA 2 */
	this.wheel.apply();
	this.roda.display();

	/* BRACO 2 COM ESFERA*/
	this.scene.pushMatrix();
	this.green.apply();
	this.scene.translate(0.3, 2, 0.5);
	this.scene.rotate(-Math.PI/2, 1, 0, 0);

	this.scene.pushMatrix();
	this.scene.scale(0.5, 0.5, 0.5);
	this.scene.translate(0, 0, 5);
	this.sphere.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.scale(0.5, 0.5, 0.5);
	this.scene.rotate(Math.PI, 1, 0, 0);
	//this.scene.translate(0, 0, 1);
	this.sphere.display();
	this.scene.popMatrix();

	this.scene.scale(0.5, 0.5, 2.5);
	this.cilindro.display();
	this.scene.popMatrix();

	this.scene.popMatrix();

	this.scene.popMatrix();

	/* FAZER A CABEÇA */
	this.scene.pushMatrix();
	this.scene.rotate(Math.PI/1.5, 0, 1, 0);
	this.scene.rotate(-Math.PI/2, 1, 0, 0);
	this.scene.scale(0.5, 0.5, 0.5);
	this.androidHead.apply();
	this.sphere.display();
	this.scene.popMatrix();

	/* CORPO DO ROBOT */
	this.scene.rotate(Math.PI/2, 1, 0, 0);
	this.scene.scale(0.5, 0.5, 2.5);
	if (this.scene.currRobotAppearance == 'Red')
		this.red.apply();
	else if (this.scene.currRobotAppearance == 'Green')
		this.green.apply();
	else if (this.scene.currRobotAppearance == 'Blue')
		this.blue.apply();
	else this.scene.materialDefault.apply();
	this.cilindro.display();

 	/* TAMPO DE BAIXO DO ROBOT */
	this.scene.pushMatrix();
	this.scene.rotate(Math.PI, 1, 0, 0);
	this.scene.translate(0, 0, -1);
	this.scene.materialDefault.apply(); 
	this.topo.display();
	this.scene.popMatrix();

	/* TAMPO DE CIMA DO ROBOT */
	this.topo.display();
	
	

	this.scene.popMatrix();
	
};