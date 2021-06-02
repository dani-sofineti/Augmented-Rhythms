
export default class Shape {
    constructor(background) {
        this.squareContainer = document.getElementById('shape-container');
        this.background = background;
    }

    init() {
        this.drawShape()
    }

    drawShape() {
        const shape = document.createElement('div');
        shape.height = this.side;
        shape.width = this.side;
        shape.style.background = this.background;
        shape.id = 'shape';
        this.squareContainer.append(shape);
    }
}