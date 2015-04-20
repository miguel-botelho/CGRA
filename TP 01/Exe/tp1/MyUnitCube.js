/**
 * MyUnitCube
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyUnitCube(scene) {
	CGFobject.call(this,scene);

	this.initBuffers();
};

MyUnitCube.prototype = Object.create(CGFobject.prototype);
MyUnitCube.prototype.constructor=MyUnitCube;

MyUnitCube.prototype.initBuffers = function () {
	this.vertices = [
            -0.5, 0.5, 0.5, //0
            0.5, 0.5, 0.5, //1
            0.5, -0.5, 0.5, //2
            -0.5, -0.5, 0.5, //3
            -0.5, 0.5, -0.5, //4 
            0.5, 0.5, -0.5, //5
            0.5, -0.5, -0.5, //6
            -0.5, -0.5, -0.5 //7
			];

	this.indices = [
            3, 2, 1,
			3, 1, 0, //face frente
			2, 6, 5,
			2, 5, 1, //face direita
			6, 7, 4,
			6, 4, 5, //face tras
			7, 3, 0,
			7, 0, 4, //face esquerda
			0, 1, 5,
			0, 5, 4, //face cima
			7, 6, 2,
			7, 2, 3 //face baixo
        ];
		
	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};
