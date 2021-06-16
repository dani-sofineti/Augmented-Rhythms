import HandInteraction from "./hand_interaction.js";
import config from "../config/config.js";

export default class HandDetection {
    
    constructor(shape) {
      this.shape = shape;
    }

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
          return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`;
        }})
        
        this.holistic.setOptions({
          modelComplexity: 1,
          smoothLandmarks: true,
          minDetectionConfidence: 0.5,
          minTrackingConfidence: 0.5
        });
    
        this.holistic.onResults(this.onResults.bind(this));
    }

    initializeCamera() {
        const camera = new Camera(
          this.videoElement, {
            onFrame: async () => {
              await this.holistic.send({image: this.videoElement});
            },
            width: 780,
            height: 439
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