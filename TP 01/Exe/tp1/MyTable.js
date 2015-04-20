/**
 * MyTable
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyTable(scene) {
	CGFobject.call(this,scene);

	this.cubo1=new MyUnitCube(this.scene);

	this.cubo1.initBuffers();
};

MyTable.prototype = Object.create(CGFobject.prototype);
MyTable.prototype.constructor=MyTable;

MyTable.prototype.display = function () {
	
	// TAMPO


	this.scene.pushMatrix();
	this.scene.translate(0,3.5+0.15,0);
	this.scene.scale(5,0.3,3);
	this.cubo1.display();
	this.scene.popMatrix();


	this.scene.pushMatrix();
	this.scene.translate(-(5/2-0.3),3.5/2,-(3/2-0.3));
	this.scene.scale(0.3,3.5,0.3);
	this.cubo1.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(-(5/2-0.3),3.5/2,(3/2-0.3));
	this.scene.scale(0.3,3.5,0.3);
	this.cubo1.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate((5/2-0.3),3.5/2,-(3/2-0.3));
	this.scene.scale(0.3,3.5,0.3);
	this.cubo1.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate((5/2-0.3),3.5/2,(3/2-0.3));
	this.scene.scale(0.3,3.5,0.3);
	this.cubo1.display();
	this.scene.popMatrix();


};
