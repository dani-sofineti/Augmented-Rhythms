import HandInteraction from "./hand_interaction.js";
import configCamera from "../config/config_camera.js";

export default class HandDetection {
    
    init() {
        this.initializeElements();
        this.initializeHolistic();
        this.initializeCamera(); 
        this.handInteraction = new HandInteraction();
    }

    initializeElements() {
        this.videoElement = document.getElementById('video-input');
        this.canvasElement = document.getElementById('canvas-output');
        this.canvasCtx = this.canvasElement.getContext('2d');
    }

    initializeHolistic() {
        this.holistic = new Holistic({locateFile: (file) => {
          return `${configCamera.handDetection.url}${file}`
        }});
        this.holistic.setOptions(configCamera.handDetection.options);
        this.holistic.onResults(this.onResults.bind(this));
    }

    initializeCamera() {
        const camera = new Camera(
          this.videoElement, {
            onFrame: async () => {
              await this.holistic.send({image: this.videoElement});
            },
            width: configCamera.cameraWidth,
            height: configCamera.cameraHeight
          }
        )
        camera.start();
    }

    onResults(results) {
        this.canvasCtx.save();
        this.canvasCtx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
        this.canvasCtx.drawImage(
            results.image, 0, 0, this.canvasElement.width, this.canvasElement.height);

        if (results.rightHandLandmarks) {
          this.handInteraction.updateLandmarks(results.rightHandLandmarks);
          this.handInteraction.draw(this.canvasCtx, results.rightHandLandmarks);
          this.handInteraction.identifyRaisedFingers();
          this.handInteraction.playAtRaisedFingersStep();
        }
        this.canvasCtx.restore();
    }
}