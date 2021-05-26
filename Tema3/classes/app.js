import HandDetection from './hand_detection.js';
import Calculator from './calculator.js'

export default class App {
  init() {
    this.initializeGrid();
    this.initializeMediaPipe();
  }

  initializeGrid() {
    this.calculator = new Calculator({
        rootId: 'grid-container',
        rowClass: 'grid-row',
        cellClass: 'grid-cell',
        cellValueClass: 'grid-cell-value'
        
    });
    this.calculator.init();
  }

  initializeMediaPipe() {
    const handDetection = new HandDetection(this.calculator);
    handDetection.init();
  }
}