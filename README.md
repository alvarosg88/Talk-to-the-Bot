# Talk-to-the-Bot
A WebGL demo that combines virtual reality, speech recognition and synthetic voice from the web browser.<br/><br/>
It shows a panorama picture that contains an interactive 3D model that allows the user to interact with voice commands and a VR interaction pointer. <strong>The app is configured to work in English and Spanish detecting the browser language atuomatically</strong>.<br/><br/>
<strong>This demo currently works 100% only in Google Chrome and Google Chrome for Android</strong>. You'll find errors and issues with speech recognition in other browsers, and synthetic voice only works in Chrome as an experimental Javascript API.

# Install and run
- Download or clone the source files and run it in a local web server using Google Chrome or Google Chrome for Android.<br/>
- <strong>When it runs from Android, the app will setup automatically for VR mode</strong>. Then tap the screen and the app will setup the browser window in fullscreen mode. You can use a Google Cardboard or any other third-party VR glasses to enjoy the experience. The screen will split in stereoscopic mode and you'll notice that the camera moves using the device's accelerometer.
- Use the VR pointer ( using the mouse in desktop ) to interact with the small floating 3D robot. It will show you small text boxes at her side and the sythetic voice API will reproduce the text in Google Chrome. The speech sequence is started and stopped by pointing in or out of the robot.
- When the robot asks for your name, Chrome will ask you about allow the microphone for the speech recognition. You must allow it in order to talk to the app. 
- Then... say your name! The speech commands are configured to say it in different ways ( "I am..." or "My name is..." ), and the synthetic voice will salute you using your given name.
- Finally, if you say "Thanks" or "Thank you" after the salute, the robot will answer again.

# Practical cases

This is a very simple implementation of a sort of "VR bot". It can be taken to the next level using conversational platforms such as API.ai or any other information API using AJAX requests in Javascript. Replacing the synthetic voice with recorded audio would increase the quality of the final product.

# Implementation

A list of the libraries and assets used for this demo:

- WebGL implementation : <a href="https://github.com/mrdoob/three.js/" target="blank">three.js r83 by Mr. Doob</a>
- Stereoscopic view : <a href="https://github.com/mrdoob/three.js/blob/73edfb8e72070da688517bdc1b34024ddfde8b08/examples/js/effects/StereoEffect.js" target="blank">StereoEffect.js for three.js by Mr. Doob</a>
- Device Orientation Controls : <a href="https://github.com/mrdoob/three.js/blob/6c7f000734f8579da37fb39e5c2e9e5e2dfb14f8/examples/js/controls/DeviceOrientationControls.jss" target="blank">DeviceOrientationControls.js for three.js by richt & WestLangley</a>
- VR Pointer : <a href="https://github.com/skezo/Reticulum" target="blank">Reticulum 2.0.2 by Skezo</a>
- Speech recognition : <a href="https://github.com/TalAter/annyang" target="blank">Annyang 2.4.0 by Tal Ater</a>
- <a href="https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis" target="blank">SpeechSynthesis API in MDN</a>
- three.js OBJLoader.js
- THREEX dynamic texture extension by Jerome Etienne
- 3D Model: <a href="https://sketchfab.com/models/ce248709dea64ec1844e8dd9b614f7c0" target="blank">"Drone" by Renafox</a>
