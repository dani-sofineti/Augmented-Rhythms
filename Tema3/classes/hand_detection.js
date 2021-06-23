import Hand from './hand.js';

export default class HandDetection {
  constructor(calculator) {
    this.calculator = calculator;
  }

  init() {
    this.initializeElements();
    this.initializeHolistic();
    this.initializeCamera();
    this.hand = new Hand(this.calculator);
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
      selfieMode: true,
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
      this.hand.updateLandmarks(results.rightHandLandmarks);
      this.hand.draw(this.canvasCtx);
    }
    if (results.leftHandLandmarks) {
      this.hand.updateLandmarks(results.leftHandLandmarks);
      this.hand.draw(this.canvasCtx);
    }
    this.canvasCtx.restore();
  }
}