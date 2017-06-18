(function(){
     
      const LANG_EN = 'EN';
      const LANG_ES = 'ES';
    
      var set_Lang = ( navigator.language == 'es' ) ? LANG_ES : LANG_EN;
    
      var scene, camera, renderer, controls, clock, time;
      var skyBg, guy, text_box;
      var room_wireframe, floor;
      var effect = null;
      var current_popup = [];
      var popup_msg, popup_msg2, say_hello, say_godbye;
    
      if ( set_Lang == 'EN' ){
          popup_msg = ["Hi!!!","I'm a webapp","I'm using WebGL","and web audio API","What's your name?"];
          popup_msg2 = ["Hi","enjoy this app"];
          say_hello = 'Hi ';
          say_godbye = 'You are welcome, bye bye';
      }
      else{
          popup_msg = ["Hola!!!","Soy una webapp","Utilizo WebGL","y API de web audio","Como te llamas?"];
          popup_msg2 = ["Hola","Disfruta de esta app"];
          say_hello = 'Hola ';
          say_godbye = 'De nada, un placer';
      }
    
      var msg_idx = 0;
      var msg_reset_trigger = false;
      var commands;

      function init() {

        renderer = new THREE.WebGLRenderer( { antialias: true } );
        renderer.setSize( window.innerWidth, window.innerHeight );
        scene = new THREE.Scene(); 
        camera = new THREE.PerspectiveCamera( 85, window.innerWidth / window.innerHeight, 1, 100000 );
        camera.position.set(0, 0, 15); 
        
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) { 
          effect = new THREE.StereoEffect(renderer); 
        }
        
        clock = new THREE.Clock();
        controls = new THREE.OrbitControls(camera,renderer.domElement);
        controls.noKeys = true;
        controls.noPan = true;
        controls.noZoom = true;
        
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
          controls.target.set( camera.position.x + 0.15, camera.position.y, camera.position.z ); }

        //PANORAMA
        var bgMap = new THREE.TextureLoader().load( "assets/panorama9.jpg" );
        var bgMaterial  = new THREE.MeshBasicMaterial( { map: bgMap } );
        var bgGeometry = new THREE.SphereGeometry( 5000, 60, 40 );
        skyBg = new THREE.Mesh( bgGeometry, bgMaterial );
        skyBg.scale.set(-1,1,1);
        scene.add( skyBg ); 
        
        //HELPERS  
        var f_g = new THREE.BoxGeometry( 6000, 5000, 7000 );
		var f_m = new THREE.MeshNormalMaterial( { transparent: true, opacity: 0.5 } );
		floor = new THREE.Mesh( f_g, f_m );
        room_wireframe = new THREE.WireframeHelper( floor, 0xffffff );
        floor.scale.set(-1,1,1);
        
        //MODELS
        var texture = new THREE.Texture();
        var guy_textureLoader = new THREE.ImageLoader();
            guy_textureLoader.load( 'assets/drone_d.png', function ( image ) {
            texture.image = image;
            texture.needsUpdate = true;
        } );

        var guy_modelLoader = new THREE.OBJLoader();
        guy_modelLoader.load( 'models/drone.obj', function ( object ) {
              guy = object;
              guy.traverse( function ( child ) {
                  if ( child instanceof THREE.Mesh ) {
                      child.material = new THREE.MeshBasicMaterial( { map: texture } );
                  }
              } );
              guy.scale.set(300,300,300);
              guy.position.z = -2400;
              guy.position.x = -100;
              guy.position.y = -500;
              guy.rotation.y = 3.2;
              scene.add( guy );
        } );
        
        Reticulum.init(camera, {
            proximity: false,
            clickevents: true,
            reticle: {
                visible: true,
                restPoint: 1000, //Defines the reticle's resting point when no object has been targeted
                color: 0xffffff,
                innerRadius: 0.01,
                outerRadius: 0.02,
                hover: {
                    color: 0x00cccc,
                    innerRadius: 0.02,
                    outerRadius: 0.024,
                    speed: 5,
                    vibrate: 50 //Set to 0 or [] to disable
                }
            },
            fuse: {
                visible: true,
                duration: 2.5,
                color: 0x00fff6,
                innerRadius: 0.045,
                outerRadius: 0.06,
                vibrate: 0, //Set to 0 or [] to disable
                clickCancelFuse: false //If users clicks on targeted object fuse is canceled
            }
        }); 
        scene.add(camera);
        
        var dynamicTexture = new THREEx.DynamicTexture(1400,512);
	    dynamicTexture.context.font	= "bolder 80px Verdana";
        
        var txt_geometry = new THREE.BoxGeometry( 1300, 500, 0.01);
        var txt_material = new THREE.MeshBasicMaterial({ map	: dynamicTexture.texture })
        text_box = new THREE.Mesh( txt_geometry, txt_material );
        text_box.visible = false;
        scene.add( text_box );
        text_box.position.z = -2200;
        text_box.position.x = 1150;
        text_box.position.y = 200;
        text_box.rotation.y = -0.3;
        
        var guyHelper_geo	= new THREE.BoxGeometry( 600, 2000, 600);
        var guyHelper_mt	= new THREE.MeshNormalMaterial({transparent: true, opacity: 0.01});
        var guyHelper	= new THREE.Mesh( guyHelper_geo, guyHelper_mt );
        scene.add( guyHelper );
        guyHelper.position.z = -2200;
        guyHelper.position.x = -100;
        guyHelper.position.y = -500;
        
        current_popup = popup_msg;
        
              Reticulum.add( guyHelper, {
                onGazeOut: function(){
                  if(current_popup == popup_msg2){
                    current_popup = popup_msg;
                    msg_idx = 0;
                  }
                  
                },
                onGazeLong: function(){
                      if(msg_idx < current_popup.length && current_popup == popup_msg){
                        popupLoop(current_popup);
                      }
                }
                });

                if (annyang) {
                  var despedida = function() {
                    //if(current_popup == popup_msg2 && msg_idx == current_popup.length){
                      text_box.visible = false;
                      var popup_msg3 = [];
                      popup_msg3[0] = say_godbye;
                      current_popup = popup_msg3;
                      msg_idx = 0;
                      popupLoopFinal(current_popup);
                      setTimeout(function(){ 
                        text_box.visible = false; 
                        msg_idx = 0;
                        current_popup = popup_msg;
                      }, 6000);
                    //} 
                  };
                    
                  var escucha = function(tag) {
                    if(current_popup == popup_msg && msg_idx == current_popup.length){
                      text_box.visible = false;
                      popup_msg2[0] = say_hello;
                      popup_msg2[0] += tag;
                      current_popup = popup_msg2;
                      msg_idx = 0;
                      popupLoop(current_popup);
                      setTimeout(function(){ 
                        popupLoop(current_popup);
                      }, 2000);
                      setTimeout(function(){ 
                        text_box.visible = false; 
                        msg_idx = 0;
                        //
                      }, 6000);
                    } 
                  };
                  
                    
                if ( set_Lang == 'EN' ){
                    annyang.setLanguage('en');
                    commands = {
                    'Thank you': despedida,
                    'Thanks': despedida,
                    '(Hi) (My name is) (I am) *search': escucha,
                    '(I am) *search': escucha
                  };
                }
                else {
                    annyang.setLanguage('es');
                    commands = {
                        '(Muchas) gracias': despedida,
                        '(Hola) (Yo) me llamo *search': escucha,
                        '(Hola) (Yo) soy *search': escucha,
                    };       
                }
                    
                  annyang.debug();
                  annyang.addCommands(commands);
                  //annyang.setLanguage('en');
                }
        
        enableHelperMode(false);
        document.body.appendChild( renderer.domElement );   
        window.addEventListener('deviceorientation', setOrientationControls, true); 
     
        function popupLoop(msg_list){
            dynamicTexture.clear('#000000').drawText(msg_list[msg_idx], 40, 256, '#ffffff');
            dynamicTexture.texture.needsUpdate  = true;

            if(msg_idx < msg_list.length){
              msg_idx++;
              setTimeout(function(){ 
                  var voice_msg = new SpeechSynthesisUtterance(msg_list[msg_idx-1]);
                  window.speechSynthesis.speak(voice_msg);
                  console.log(voice_msg.text)
                  setTimeout(function(){ 
                    if(msg_idx == msg_list.length)
                        annyang.start({autoRestart: false, continuous: false});
                    }, 4000);
              }, 500);
            }
            text_box.visible = true;
             
        }
          
        function popupLoopFinal(msg_list){
            dynamicTexture.clear('#000000').drawText(msg_list[msg_idx], 40, 256, '#ffffff');
            dynamicTexture.texture.needsUpdate  = true;

            if(msg_list.length == 1){
              setTimeout(function(){ 
                  var voice_msg = new SpeechSynthesisUtterance(msg_list[0]);
                  window.speechSynthesis.speak(voice_msg);
                  console.log(voice_msg.text)
                  annyang.abort();
              }, 500);
            }
            text_box.visible = true;
             
        }
        
      }

      /* ---------------- FUNCTIONS ---------------- */

      //ANIMATION LOOP
      function animate() {
        time = clock.getElapsedTime();
        if(guy){
            guy.position.y = Math.cos(time*2)*80;
            guy.rotation.z = Math.cos(time)*0.2;
            guy.rotation.x = -Math.cos(time)*0.3;
        }
            
        requestAnimationFrame( animate );
        renderer.render( scene, camera );
        update(clock.getDelta());
        render(clock.getDelta());
      }

      //RESIZE
      function resize() {
        var width = window.innerWidth;
        var height = window.innerHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
        if(effect)
          effect.setSize(width, height);
      }
      
      //UPDATE
      function update(dt) {
        resize();
        camera.updateProjectionMatrix();
        controls.update(dt);
        Reticulum.update();
      }

      //STEREO UPDATE
      function render(dt) {
        if(effect)
          effect.render(scene, camera);
      }

      //FULLSCREEN
      function fullscreen() {
        if (document.body.requestFullscreen) {
          document.body.requestFullscreen();
        } else if (document.body.msRequestFullscreen) {
          document.body.msRequestFullscreen();
        } else if (document.body.mozRequestFullScreen) {
          document.body.mozRequestFullScreen();
        } else if (document.body.webkitRequestFullscreen) {
          document.body.webkitRequestFullscreen();
        }
      }

      //DEVICEORIENTATION
      function setOrientationControls(e) {
          if (!e.alpha) {return;}
          controls = new THREE.DeviceOrientationControls(camera, true);
          controls.connect();
          controls.update();
          renderer.domElement.addEventListener('click', fullscreen, false);
          window.removeEventListener('deviceorientation', setOrientationControls, true);
      }

      function enableHelperMode(control){
        if(control){
          if( !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            camera.position.z = 8000;
            controls.noPan = false;
            controls.noZoom = false;
            scene.add( room_wireframe );
            scene.add( floor );
          }
        }
      }

      init();
      animate();
})();