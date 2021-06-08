import Hand from './hand.js'

export default class RightHand extends Hand {

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
        ctx.fillStyle = 'darkred';
        ctx.font = '26px Arial';
        ctx.fillText(
            `Fingers right hand: ${this.fingers.length}`,
            x * 780 - 35,
            y * 439 - 25
        );
        ctx.restore();
    }
}