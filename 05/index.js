function a05start(r1, r2) {
	console.log("loading assignment 5...");
	console.log('r1',r1);
	console.log('r2',r2);

	let xtk = initXTK(r1);
	let threejs = initThreeJS(r2);

	// helper code for ThreeJS + dat.gui:
	var controller = {
		'threejs_color': 0xffffff,
		'rotateX': () => {
			xtk.cubes[0].transform.rotateX(20);
			threejs.cubes[0].rotateX(20);
		},
		'rotateY': () => {
			xtk.cubes[0].transform.rotateY(20);
			threejs.cubes[0].rotateY(20);
		},
		'rotateZ': () => {
			xtk.cubes[0].transform.rotateZ(20);
			threejs.cubes[0].rotateZ(20);
		},
		'add new': () => {
			addCubeXTK(xtk);
			addCubeThreeJS(threejs);
		}
	};

	var gui = new dat.GUI();

	addDatGuiXTK(gui, xtk.cubes[0]);
	addDatGuiThreeJS(gui, controller, threejs.cubes[0]);
	addDatGuiBoth(gui, controller);
}

function initXTK(container) {
	console.log('initializing xtk');
	var r = new X.renderer3D();
	r.container=container.id;
	r.init();
	var c = new X.cube();
	r.add(c);
	r.camera.focus = [0, 0, 0];
	r.render();

	return {renderer: r, cubes: [c]};
}

function addCubeXTK(obj){
	var c = new X.cube();
	c.center = [50, 50, 50];
	obj.renderer.add(c);
	obj.renderer.render();
	obj.cubes.push(c);

	//return obj;
}

function initThreeJS(container, gui, controller) {
	console.log('initializing Three.js');
	scene = new THREE.Scene();

	// set up camera
	let fov = 75;
	let ratio = container.clientWidth / container.clientHeight;
	let zNear = 1;
	let zFar = 1000;
	camera = new THREE.PerspectiveCamera(fov, ratio, zNear, zFar);
	camera.position.set( 0, 0, 100);

	// set up renderer
	renderer = new THREE.WebGLRenderer({antialias:true});
	renderer.setSize( container.clientWidth, container.clientHeight );
	container.appendChild(renderer.domElement );

	// set up lighting
	ambientLight = new THREE.AmbientLight( 0x404040 );
	scene.add( ambientLight );

	light = new THREE.DirectionalLight( 0xffffff, 5.0);
	light.position.set( 10, 100, 10 );
	scene.add(light);

	// Add a cube
	geometry = new THREE.BoxGeometry( 10, 10, 10);
	material = new THREE.MeshStandardMaterial({ color: 0xffffff });
	cube = new THREE.Mesh( geometry, material);
	scene.add(cube);

	// Trackball
	controls = new THREE.TrackballControls( camera, container );

	animate();

	return {scene: scene, cubes: [cube]};
}

function addCubeThreeJS(obj) {
	geometry = new THREE.BoxGeometry(10, 10, 10);
	material = new THREE.MeshStandardMaterial({ color: 0xffffff });
	ncube = new THREE.Mesh(geometry, material);
	ncube.position.set(50, 50, 50);
	obj.scene.add(ncube);
	obj.cubes.push(ncube);

	//return obj;
}

function animate() {
	requestAnimationFrame(animate);

	controls.update();

	renderer.render(scene, camera);
}

function addDatGuiXTK(gui, object) {
	var xtkUI = gui.addFolder('XTK Cube');

	xtkUI.add(object, 'visible');
	xtkUI.add(object, 'opacity', 0, 1).onChange(() => {
		object.modified();
	});
	xtkUI.addColor(object, 'color');

	xtkUI.open();
}

function addDatGuiThreeJS(gui, controller, object) {
	var threejsUI = gui.addFolder('Three.js Cube');

	threejsUI.add(object, 'visible');
	threejsUI.add(object.material, 'opacity', 0, 1).onChange(() => {
		object.material.transparent = true;
		// the opacity doesn't seem to change, but I don't know why.
		//console.log(object);
	});
	threejsUI.addColor(controller, 'threejs_color').onChange(() => {
		object.material.color.set(controller.threejs_color);
	});

	threejsUI.open();
}

function addDatGuiBoth(gui, controller) {
	var both = gui.addFolder('Both Cubes');

	both.add(controller, 'rotateX');
	both.add(controller, 'rotateY');
	both.add(controller, 'rotateZ');
	both.add(controller, 'add new');

	both.open();
}