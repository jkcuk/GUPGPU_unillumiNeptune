import * as THREE from 'three';
import { Util } from '../Util.js';

class SphereShape {
	centre;
	radius;
	radius2;	// radius^2
	nTheta0;	// unit vector in the direction of theta = 0 (north pole)
	nPhi0;	// unit vector in the direction of phi = 0 (on the equator)
	nPhi90;	// unit vector in the direction of phi = 90° (on the equator)

	static unitSphereShape = new SphereShape( 
		new THREE.Vector3(0, 0, 0),	// centre
		1,	// radius
		new THREE.Vector3(0, 0, 1),	// theta0
		new THREE.Vector3(1, 0, 0),	// phi0
		new THREE.Vector3(0, 1, 0)	// phi90
	);
	
	constructor(
		centre,
		radius,
		theta0,
		phi0,
		phi90
	) {
		// console.log("SphereShape.constructor(", centre, ", ", radius, ", ", theta0, ", ", phi0, ", ", phi90, ")");
		this.centre = centre;
		this.radius = radius;
		this.radius2 = radius*radius;
		this.nTheta0 = theta0.normalize();
		this.nPhi0 = Util.getPartPerpendicularTo1( phi0, this.nTheta0 ).normalize(); // phi0.clone().sub(phi0.clone().projectOnVector(this.nTheta0)).normalize();
		this.nPhi90 = Util.getPartPerpendicularTo2( phi90, this.nTheta0, this.nPhi0 ).normalize();
	}

	static getSphereShape(
		centre,
		radius
	) {
		return new SphereShape(
			centre,
			radius,
			Util.zHat,
			Util.xHat,
			Util.yHat
		);
	}

	setRadius(radius) {
		this.radius = radius;
		this.radius2 = radius * radius;
	}
}

export { SphereShape };