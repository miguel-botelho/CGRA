/**
 * MyInterface
 * @constructor
 */
 
 
function MyInterface() {
	//call CGFinterface constructor 
	CGFinterface.call(this);
};

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

/**
 * init
 * @param {CGFapplication} application
 */
MyInterface.prototype.init = function(application) {
	// call CGFinterface init
	CGFinterface.prototype.init.call(this, application);
	
	// init GUI. For more information on the methods, check:
	//  http://workshop.chromeexperiments.com/examples/gui
	
	this.gui = new dat.GUI();

	// add a button:
	// the first parameter is the object that is being controlled (in this case the scene)
	// the identifier 'doSomething' must be a function declared as part of that object (i.e. a member of the scene class)
	// e.g. LightingScene.prototype.doSomething = function () { console.log("Doing something..."); }; 

	this.gui.add(this.scene, 'LinhaComandos');	

	// add a group of controls (and open/expand by defult)
	
	var lights=this.gui.addFolder("Lights");
	lights.open();

	

	// add two check boxes to the group. The identifiers must be members variables of the scene initialized in scene.init as boolean
	// e.g. this.option1=true; this.option2=false;
	
	var i = 1;
	for (; i <= this.scene.luzesUtilizadas; i++)
	{
		var temp = 'Light'+i;
		lights.add(this.scene, temp)
	}
	
	// add a slider
	// must be a numeric variable of the scene, initialized in scene.init e.g.
	// this.speed=3;
	// min and max values can be specified as parameters
	
	this.gui.add(this.scene, 'Speed', 0, 2);
	this.gui.add(this.scene, 'Clock');
	this.gui.add(this.scene, 'currRobotAppearance', this.scene.robotAppearanceList);

	return true;
};

/**
 * processKeyboard
 * @param event {Event}
 */
MyInterface.prototype.processKeyboard = function(event) {
	// call CGFinterface default code (omit if you want to override)
	CGFinterface.prototype.processKeyboard.call(this,event);
	// Check key codes e.g. here: http://www.asciitable.com/
	// or use String.fromCharCode(event.keyCode) to compare chars
	
	// for better cross-browser support, you may also check suggestions on using event.which in http://www.w3schools.com/jsref/event_key_keycode.asp
	switch (event.keyCode)
	{
		case (97):
			if (this.scene.robot.robot.animation == "OFF")
			{
				console.log("Key 'A' pressed"); // rodar esquerda
				this.scene.robot.robot.setRotate(Math.PI / 10);
			}
			break;
		case (100):
			if (this.scene.robot.robot.animation == "OFF")
			{
				console.log("Key 'D' pressed"); // rodar direita
				this.scene.robot.robot.setRotate(-Math.PI / 10);
			}
			break;
		case (115):
			if (this.scene.robot.robot.animation == "OFF")
			{
				console.log("Key 'S' pressed"); // andar atras
				this.scene.robot.robot.setTravel(-this.scene.Speed);
			}
			break;
		case (119):
			if (this.scene.robot.robot.animation == "OFF")
			{
				console.log("Key 'W' pressed"); // andar frente
				this.scene.robot.robot.setTravel(this.scene.Speed);
			}
			break;
		case (65):
			if (this.scene.robot.robot.animation == "OFF")
			{
				console.log("Key 'A' pressed"); // rodar esquerda
				this.scene.robot.robot.setRotate(Math.PI / 10);
			}
			break;
		case (68):
			if (this.scene.robot.robot.animation == "OFF")
			{
				console.log("Key 'D' pressed"); // rodar direita
				this.scene.robot.robot.setRotate(-Math.PI / 10);
			}
			break;
		case (83):
			if (this.scene.robot.robot.animation == "OFF")
			{
				console.log("Key 'S' pressed"); // andar atras
				this.scene.robot.robot.setTravel(-this.scene.Speed);
			}
			break;
		case (87):
			if (this.scene.robot.robot.animation == "OFF")
			{	
				console.log("Key 'W' pressed"); // andar frente
				this.scene.robot.robot.setTravel(this.scene.Speed);
			}
			break;
		case (72):
			console.log("Key 'H' pressed"); //animacao fag
			this.scene.robot.robot.animateArm();
			break;
		case (104):
			console.log("Key 'H' pressed"); //animacao fag
			this.scene.robot.robot.animateArm();
			break;
	};
};