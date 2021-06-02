import HandDetection from './hand_detection.js'
import Shape from './shape.js'

export default class App {

    init() {
        // this.initializeShape();
        this.initializeMediaPipe();
    }

    initializeShape() {
        this.shape = new Shape('black');
        this.shape.init();
    }

    initializeMediaPipe() {
        const handDetection = new HandDetection(this.shape);
        handDetection.init();
    }
}