// select elements we are interested in, cache them
var button = document.getElementById("enterSixTwo");
var button41 = document.getElementById("enterFourOne");
var btnZoomIn = document.getElementById("enterZoomIn");
var btnZoomOut = document.getElementById("enterZoomOut");
var deleteMesh = document.getElementById("delMesh"); 
var button10 = document.getElementById("enterOneZero");
var colorSel = document.getElementById("colorSel");
var pageRefresh = document.getElementById("reload");

function refreshPage(){
	location.reload();
}



var colorRGB = 0xFFC0CB; //pink
colorSel.classList.toggle("pinkRGB");
// yellow: 0xffff00
		// green: 0x00ff00
		// pink: 0xFFC0CB
		// white: 0xFFFFFF
		// purple: 0x800080
		// dark yellow: 0x808000
		// light grey: 0xC0C0C0

function changeColor(){
	if(colorRGB === 0xFFFFFF){ //white
		colorRGB = 0xC0C0C0; //ltgrey
		colorSel.classList.toggle("whiteRGB");
		colorSel.classList.toggle("greyRGB");

	} else if (colorRGB === 0xC0C0C0){ //ltgrey
		colorRGB = 0xFFC0CB; //pink
		colorSel.classList.toggle("greyRGB");
		colorSel.classList.toggle("pinkRGB");


	} else if (colorRGB === 0xFFC0CB){ //pink
		colorRGB = 0xFFFFFF; //white
		colorSel.classList.toggle("whiteRGB");
		colorSel.classList.toggle("pinkRGB");
	}
	// colorSel.classList.add("pinkRGB");
	// classList.remove
	
}

function deleteLastMesh(){
	scene.children.pop(); // pops last mesh off of the array
}

function zoomInAfterClick(){
	camera.position.z -=1 ;
}

function zoomOutAfterClick(){
	camera.position.z +=1 ;
}

function addOneZero(){

		// var geometry = new THREE.BoxGeometry( 1, 1, 1 ); << to create a cube
		var geometry = new THREE.DodecahedronGeometry(1, 0); 
		// .DodecahedronGeometry(Radius, detail); play with second number


		var material = new THREE.MeshBasicMaterial( { color: colorRGB,
			wireframe: true } );
		// yellow: 0xffff00
		// green: 0x00ff00
		// pink: 0xFFC0CB
		// white: 0xFFFFFF
		var cube = new THREE.Mesh( geometry, material );

		cube.position.set( 2, 0, 0);

		scene.add( cube );

		// camera.position.z = 5;


		// begin: render scene and animate
		var animate = function () {
			requestAnimationFrame( animate );

			cube.rotation.x += 0.01;
			cube.rotation.y += 0.01;

			renderer.render( scene, camera );
		};

		animate();
		// end: render scene and animate
		
}

function addSixTwoAfterClick(){

	// var geometry = new THREE.BoxGeometry( 1, 1, 1 ); << to create a cube
	var geometry = new THREE.DodecahedronGeometry(6, 2); 
	// .DodecahedronGeometry(1, N); play with second number


	var material = new THREE.MeshBasicMaterial( { color: colorRGB,
		wireframe: true } );
	// yellow: 0xffff00
	// green: 0x00ff00
	var cube = new THREE.Mesh( geometry, material );
	scene.add( cube );

	camera.position.z = 15;


	// begin: render scene and animate
	var animate = function () {
		requestAnimationFrame( animate );

		cube.rotation.x += 0.001;
		cube.rotation.y += 0.001;

		renderer.render( scene, camera );
	};

	animate();
	// end: render scene and animate
}

function addFourOneAfterClick(){

	// var geometry = new THREE.BoxGeometry( 1, 1, 1 ); << to create a cube
	var geometry = new THREE.DodecahedronGeometry(4, 1); 
	// .DodecahedronGeometry(1, N); play with second number


	var material = new THREE.MeshBasicMaterial( { color: colorRGB,
		wireframe: true } );
	// yellow: 0xffff00
	// green: 0x00ff00
	var cube = new THREE.Mesh( geometry, material );

	// cube.position.set( 2, 0, 0);
	


	scene.add( cube );

	// camera.position.z = 5;


	// begin: render scene and animate
	var animate = function () {
		requestAnimationFrame( animate );

		cube.rotation.x += 0.001;
		cube.rotation.y += 0.001;

		renderer.render( scene, camera );
	};

	animate();
	// end: render scene and animate
}


// click button >> if anyone clicks btn, run this fnxn
button.addEventListener("click", addSixTwoAfterClick);
button41.addEventListener("click", addFourOneAfterClick);
button10.addEventListener("click", addOneZero);
btnZoomIn.addEventListener("click", zoomInAfterClick);
btnZoomOut.addEventListener("click", zoomOutAfterClick);
deleteMesh.addEventListener("click", deleteLastMesh);
colorSel.addEventListener("click", changeColor);
pageRefresh.addEventListener("click", refreshPage);



// resize when window resized [responsive!]
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;
  
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

// end resize when window resized [responsive!]





// get x y coordinate (screen coord) logged in console upon click
var canvas = document.getElementsByTagName("canvas")[0];

function getCursorPosition(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    console.log("x: " + x + " y: " + y);
}

canvas.addEventListener("mousedown", function (e) { getCursorPosition(canvas, e);});
// end: get x y coordinate logged in console upon click





// get x y z coordinate (three js coord) logged in console upon click
var vec = new THREE.Vector3(); // create once and reuse
var pos = new THREE.Vector3(); // create once and reuse

function getCursorPosition2(canvas, event) {
vec.set(
    ( event.clientX / window.innerWidth ) * 2 - 1,
    - ( event.clientY / window.innerHeight ) * 2 + 1,
    0.5 );

vec.unproject( camera );

vec.sub( camera.position ).normalize();

var distance = - camera.position.z / vec.z;

pos.copy( camera.position ).add( vec.multiplyScalar( distance ) );
console.log(pos);

		// var geometry = new THREE.BoxGeometry( 1, 1, 1 ); << to create a cube
		var geometry = new THREE.DodecahedronGeometry(1, 0); 
		// .DodecahedronGeometry(Radius, detail); play with second number


		var material = new THREE.MeshBasicMaterial( { color: colorRGB,
			wireframe: true } );
		// yellow: 0xffff00
		// green: 0x00ff00
		// pink: 0xFFC0CB
		// white: 0xFFFFFF
		var cube = new THREE.Mesh( geometry, material );

		cube.position.set( pos.x, pos.y, 0);

		scene.add( cube );

		// camera.position.z = 5;


		// begin: render scene and animate
		var animate = function () {
			requestAnimationFrame( animate );

			cube.rotation.x += 0.01;
			cube.rotation.y += 0.01;

			renderer.render( scene, camera );
		};

		animate();
		// end: render scene and animate
}

canvas.addEventListener("mousedown", function (e) { getCursorPosition2(canvas, e);});


// end get x y z coordinate (three js coord) logged in console upon click









