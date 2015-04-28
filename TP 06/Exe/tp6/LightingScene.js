var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 30;
var BOARD_B_DIVISIONS = 100;

function LightingScene() {
	CGFscene.call(this);
}

LightingScene.prototype = Object.create(CGFscene.prototype);
LightingScene.prototype.constructor = LightingScene;

LightingScene.prototype.LinhaComandos = function () {
	console.log("Doing something...\n");
};

LightingScene.prototype.init = function(application) {
	CGFscene.prototype.init.call(this, application);

	this.Light1 = true;
	this.Light2 = true;
	this.Light3 = true;
	this.Light4 = true;
	this.Clock = true;
	this.Speed = 3;

	this.initCameras();

	this.enableTextures(true);

	this.initLights();

	this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
	this.gl.clearDepth(100.0);
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
	this.gl.depthFunc(this.gl.LEQUAL);

	this.axis = new CGFaxis(this);

	// Scene elements
	this.table = new MyTable(this, 0, 1, 0, 1);
	this.floor = new MyQuad(this, 0, 10, 0, 12);
	this.left_wall = new MyQuad(this, -0.5, 1.5, -0.5, 1.5);
	this.wall = new MyQuad(this, 0, 1, 0, 1);
	this.boardA = new Plane(this, BOARD_A_DIVISIONS, -0.25, 1.25,0, 1);
	this.boardB = new Plane(this, BOARD_B_DIVISIONS, 0, 1, 0, 1);
	this.cylinder = new MyCylinder(this, 20, 20);
	this.clock = new MyClock(this, 12, 1);
	this.planeHandler = new MyAeroplaneHandler(this);
	this.robot = new MyRobotHandler(this);

	// Materials
	this.materialDefault = new CGFappearance(this);
	
	this.materialA = new CGFappearance(this);
	this.materialA.setAmbient(0.3,0.3,0.3,1);
	this.materialA.setDiffuse(0.6,0.6,0.6,1);
	this.materialA.setSpecular(0,0.2,0.8,1);
	this.materialA.setShininess(120);

	this.materialB = new CGFappearance(this);
	this.materialB.setAmbient(0.3,0.3,0.3,1);
	this.materialB.setDiffuse(0.6,0.6,0.6,1);
	this.materialB.setSpecular(0.8,0.8,0.8,1);	
	this.materialB.setShininess(120);

	this.tableAppearance = new CGFappearance(this);
	this.tableAppearance.loadTexture("../resources/images/table.png");
	this.tableAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
	this.tableAppearance.setSpecular(0.2, 0.2, 0.2, 1);
	this.tableAppearance.setShininess(10);
	this.tableAppearance.setDiffuse(0.8, 0.8, 0.8, 1);
	
	this.floorAppearance = new CGFappearance(this);
	this.floorAppearance.loadTexture("../resources/images/floor.png");
	this.floorAppearance.setTextureWrap('REPEAT', 'REPEAT');
	this.floorAppearance.setSpecular(0.2, 0.2, 0.2, 1);
	this.floorAppearance.setShininess(10);
	this.floorAppearance.setDiffuse(0.8, 0.8, 0.8, 1);

	this.window = new CGFappearance(this);
	this.window.loadTexture("../resources/images/window.png");
	this.window.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

	this.cylinderAppearance = new CGFappearance(this);
	this.cylinderAppearance.loadTexture("../resources/images/window.png");
	this.cylinderAppearance.setTextureWrap('REPEAT', 'REPEAT');
	this.cylinderAppearance.setSpecular(0.2, 0.2, 0.2, 1);
	this.cylinderAppearance.setShininess(10);
	this.cylinderAppearance.setDiffuse(0.8, 0.8, 0.8, 1);

	this.wallAppearance = new CGFappearance(this);
	this.wallAppearance.loadTexture("../resources/images/wall.png");
	this.wallAppearance.setTextureWrap('REPEAT', 'REPEAT');
	this.wallAppearance.setSpecular(0.2, 0.2, 0.2, 1);
	this.wallAppearance.setShininess(10);
	this.wallAppearance.setDiffuse(0.8, 0.8, 0.8, 1);
	
	this.slidesAppearance = new CGFappearance(this);
	this.slidesAppearance.loadTexture("../resources/images/slides.png");
	this.slidesAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
	this.slidesAppearance.setSpecular(0.2, 0.2, 0.2, 1);
	this.slidesAppearance.setShininess(10);
	this.slidesAppearance.setDiffuse(0.8, 0.8, 0.8, 1);

	this.boardAppearance = new CGFappearance(this);
	this.boardAppearance.loadTexture("../resources/images/board.png");
	this.boardAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
	this.boardAppearance.setSpecular(0.5, 0.5, 0.5, 1);
	this.boardAppearance.setShininess(100);
	this.boardAppearance.setDiffuse(0.3, 0.3, 0.3, 1);

	this.setUpdatePeriod(1);

};

LightingScene.prototype.initCameras = function() {
	this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
};

LightingScene.prototype.initLights = function() {
	//this.setGlobalAmbientLight(0.5,0.5,0.5, 1.0);
	this.setGlobalAmbientLight(0,0,0);
	this.shader.bind();
	// Positions for four lights
	this.lights[0].setPosition(4, 6, 1, 1);
	this.lights[1].setPosition(10.5, 6.0, 1.0, 1.0);
	this.lights[2].setPosition(10.5, 6.0, 5.0, 1.0);
	this.lights[3].setPosition(4, 6.0, 5.0, 1.0);

	this.lights[0].setAmbient(0, 0, 0, 1);
	this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[0].setSpecular(1.0,1.0,0.0,1.0);
	this.lights[0].enable();

	this.lights[1].setAmbient(0, 0, 0, 1);
	this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[1].enable();

	this.lights[2].setAmbient(0, 0, 0, 1);
	this.lights[2].setSpecular(1.0,1.0,1.0,1.0);
	this.lights[2].setConstantAttenuation(0);
	//this.lights[2].setLinearAttenuation(0.2);
	this.lights[2].setLinearAttenuation(1);
	this.lights[2].setQuadraticAttenuation(0);
	this.lights[2].enable();

	this.lights[3].setAmbient(0, 0, 0, 1);
	this.lights[3].setSpecular(1.0,1.0,0.0,1.0);
	this.lights[3].setConstantAttenuation(0);
	this.lights[3].setLinearAttenuation(0);
	this.lights[3].setQuadraticAttenuation(0.2);
	this.lights[3].enable();


	this.shader.unbind();
};

LightingScene.prototype.updateLights = function() {
	for (i = 0; i < this.lights.length; i++)
		this.lights[i].update();
}


LightingScene.prototype.display = function() {
	this.shader.bind();
	
	/* INICIO COMANDOS */
	if (this.Light1 == false)
	{
		this.lights[0].disable();
	}
	else this.lights[0].enable();

	if (this.Light2 == false)
	{
		this.lights[1].disable();
	}
	else this.lights[1].enable();

	if (this.Light3 == false)
	{
		this.lights[2].disable();
	}
	else this.lights[2].enable();

	if (this.Light4 == false)
	{
		this.lights[3].disable();
	}
	else this.lights[3].enable();
	
	if (this.Clock == true)
	{
		this.setUpdatePeriod(100);
	}
	else this.setUpdatePeriod(0);

	/* FIM COMANDOS */

	// ---- BEGIN Background, camera and axis setup

	// Clear image and depth buffer everytime we update the scene
	this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
	this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

	// Initialize Model-View matrix as identity (no transformation)
	this.updateProjectionMatrix();
	this.loadIdentity();

	// Apply transformations corresponding to the camera position relative to the origin
	this.applyViewMatrix();

	// Update all lights used
	this.updateLights();

	// Draw axis
	this.axis.display();

	this.materialDefault.apply();

	// ---- END Background, camera and axis setup

	
	// ---- BEGIN Geometric transformation section

	// ---- END Geometric transformation section


	// ---- BEGIN Primitive drawing section

	// Floor
	this.pushMatrix();
		this.translate(7.5, 0, 7.5);
		this.rotate(-90 * degToRad, 1, 0, 0);
		this.scale(15, 15, 0.2);
		this.floorAppearance.apply();
		this.floor.display();
	this.popMatrix();

	// Left Wall
	this.pushMatrix();
		this.translate(0, 4, 7.5);
		this.rotate(90 * degToRad, 0, 1, 0);
		this.scale(15, 8, 0.2);
		this.window.apply();
		this.left_wall.display();
	this.popMatrix();

	// Plane Wall
	this.pushMatrix();
		this.translate(7.5, 4, 0);
		this.scale(15, 8, 0.2);
		this.wallAppearance.apply();
		this.wall.display();
	this.popMatrix();

	// First Table
	this.pushMatrix();
		this.translate(5, 0, 8);
		this.tableAppearance.apply();
		this.table.display();
	this.popMatrix();

	// Second Table
	this.pushMatrix();
		this.translate(12, 0, 8);
		this.tableAppearance.apply();
		this.table.display();
	this.popMatrix();

	// Board A
	this.pushMatrix();
	this.translate(4, 4.5, 0.2);
	this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
	this.slidesAppearance.apply();
	this.boardA.display();
	this.popMatrix();

	// Board B
	this.pushMatrix();
	this.translate(10.5, 4.5, 0.2);
	this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
	this.boardAppearance.apply();
	this.boardB.display();
	this.popMatrix();

	// Coluna A
	this.pushMatrix();
	this.translate(14, 5, 14);
	this.rotate(Math.PI / 2, 1, 0, 0);
	this.scale(1, 1, 5);
	this.cylinderAppearance.apply();
	this.cylinder.display();
	this.popMatrix();

	// Coluna B
	this.pushMatrix();
	this.translate(1, 5, 14);
	this.rotate(Math.PI / 2, 1, 0, 0);
	this.scale(1, 1, 5);
	this.cylinderAppearance.apply();
	this.cylinder.display();
	this.popMatrix();

	// Relógio
	this.pushMatrix();
	this.translate(7.2, 7.2, 0.5);
	this.rotate(Math.PI, 1, 0, 0);
	this.scale(0.7, 0.7, 0.4);
	this.clock.display();
	this.popMatrix();

	// Avião
	/*
	this.pushMatrix();
	this.translate(this.planeHandler.distanceX, 4.5, 8);
	this.materialDefault.apply();
	this.planeHandler.display();
	this.popMatrix();
	*/

	// Robot
	this.pushMatrix();
	this.translate(8, 5, 8);
	this.robot.display();
	this.popMatrix();
	// ---- END Primitive drawing section

	this.shader.unbind();
};

LightingScene.prototype.update = function(currTime) {
 	this.clock.update(currTime);
 	this.planeHandler.update(currTime);
};