(function (globals) {
    "use strict";

    // Set up namespace
    let DAT = (globals.DAT = {
        _namespace: true,
    });

    DAT.SkyBox = function (container) {

        // Ensure browser is compliant
        if (!Detector.webgl) {
            Detector.addGetWebGLMessage(container);
            return;
        }

        let scene = null,
            camera = null,
            renderer = null,
            controls = null;

        function _startScene(theme) {
            scene = new THREE.Scene();

            camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 45, 30000);
            camera.position.set(-900, -200, -900);
                  
            renderer = new THREE.WebGLRenderer({
                antialias: true
            });

            renderer.setSize(window.innerWidth, window.innerHeight);
            container.appendChild(renderer.domElement);

            controls = new THREE.OrbitControls(camera);
            controls.minDistance = 100;
            controls.maxDistance = 5000;

            let materialArray = [];
            let texture_ft = new THREE.TextureLoader().load('img/theme/' + theme + '/' + theme + '_ft.jpg');
            let texture_bk = new THREE.TextureLoader().load('img/theme/' + theme + '/' + theme + '_bk.jpg');
            let texture_up = new THREE.TextureLoader().load('img/theme/' + theme + '/' + theme + '_up.jpg');
            let texture_dn = new THREE.TextureLoader().load('img/theme/' + theme + '/' + theme + '_dn.jpg');
            let texture_rt = new THREE.TextureLoader().load('img/theme/' + theme + '/' + theme + '_rt.jpg');
            let texture_lf = new THREE.TextureLoader().load('img/theme/' + theme + '/' + theme + '_lf.jpg');

            materialArray.push(new THREE.MeshBasicMaterial({
                map: texture_ft
            }));
            materialArray.push(new THREE.MeshBasicMaterial({
                map: texture_bk
            }));
            materialArray.push(new THREE.MeshBasicMaterial({
                map: texture_up
            }));
            materialArray.push(new THREE.MeshBasicMaterial({
                map: texture_dn
            }));
            materialArray.push(new THREE.MeshBasicMaterial({
                map: texture_rt
            }));
            materialArray.push(new THREE.MeshBasicMaterial({
                map: texture_lf
            }));

            for (let i = 0; i < 6; i++) {
                materialArray[i].side = THREE.BackSide;
            }

            let skyboxGeo = new THREE.BoxGeometry(10000, 10000, 10000);
            let skybox = new THREE.Mesh(skyboxGeo, materialArray);
            scene.add(skybox);
            _animate();
        }

        function _animate() {
            controls.update();
            renderer.render(scene, camera);
            requestAnimationFrame(_animate);
        }

        this.startScene = function (theme) {
            _startScene(theme);
            return 0;
        };

    };
})(this);