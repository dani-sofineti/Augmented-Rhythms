import HandDetection from '../hand/hand_detection.js'

export default class App {
    videoOutput = document.getElementById('canvas-output');
    init() {
        this.initializeMediaPipe();
    }

    initializeMediaPipe() {
        const handDetection = new HandDetection();
        handDetection.init();
    }
}