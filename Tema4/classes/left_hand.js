import Hand from './hand.js'

export default class LeftHand extends Hand {

    constructor() {
        super();
    }

    draw(ctx, landmarks) {
        drawLandmarks(ctx, landmarks);
        this.writeHandInfo(ctx)
    }

    writeHandInfo(ctx) {
        if (!this.indexTip) return;
        const {x, y} = this.indexTip;
        ctx.save();
        ctx.fillStyle = 'black';
        ctx.font = '26px Arial';
        ctx.fillText(
            `Fingers left hand: ${this.fingers.length}`,
            x * 780 - 35,
            y * 439 - 25
        );
        ctx.restore();
    }
}