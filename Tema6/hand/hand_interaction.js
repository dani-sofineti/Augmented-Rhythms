import SoundPlayer from '../sounds/sound_player.js';
import SoundGenerator from '../sounds/sound_generator.js';
import configCamera from "../config/config_camera.js";
import configSound from '../config/config_sound.js'

export default class HandInteraction {

    constructor() {
        this.fingers = [];
        this.soundPlayer = new SoundPlayer();
        this.soundGenerator = new SoundGenerator();
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
            `${this.fingers.length} Fingers [at ${(this.fingers.length + 1) * configSound.soundPace} miliseconds]`,
            x * configCamera.cameraNormalizedWidth,
            y * configCamera.cameraNormalizedHeight
        );
        ctx.restore();
    }

    updateLandmarks(landmarks) {
        this.landmarks = landmarks;
        // thumb orientation points
        this.thumbTip = landmarks && landmarks[4];
        this.indexMcp = landmarks && landmarks[5];
        // index orientation points
        this.indexTip = landmarks && landmarks[8]; 
        this.indexBase = landmarks && landmarks[6];
        // middle orientation points
        this.middleTip = landmarks && landmarks[12];
        this.middleBase = landmarks && landmarks[10];
        //ring orientation points
        this.ringTip = landmarks && landmarks[16];
        this.ringBase = landmarks && landmarks[14];
        //pinky orientation points
        this.pinkyTip = landmarks && landmarks[20];
        this.pinkyBase = landmarks && landmarks[18];
    }

    identifyRaisedFingers() {
        this.thumbFingerCheck('Thumb');
        this.indexFingerCheck('Index');
        this.middleFingerCheck('Middle');  
        this.ringFingerCheck('Ring');
        this.pinkyFingerCheck('Pinky');
    }

    playAtRaisedFingersStep() {
        this.soundPlayer.init(this.soundGenerator, this.fingers);
    }

    thumbFingerCheck(fingerName) {
        if (!this.thumbTip && !this.thumbBase) return;
        const {x: x1, y: y1} = this.thumbTip;
        const {x: x2, y: y2} = this.indexMcp;
        const distance = Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2))
        if (distance > 0.08) {
            if (!this.fingers.includes(fingerName)) {
                this.fingers.push(fingerName)
            }
        } else {
            if (this.fingers.includes(fingerName)) {
                this.fingers = this.fingers.filter(item => item !== fingerName);
            }        
        }
    }

    indexFingerCheck(fingerName) {
        if (!this.indexTip && !this.indexBase) return;
        const {y: y1} = this.indexTip;
        const {y: y2} = this.indexBase;
        this.compareCoordinates(y1, y2, fingerName);
    }

    middleFingerCheck(fingerName) {
        if (!this.middleTip && !this.middleBase) return;
        const {y: y1} = this.middleTip;
        const {y: y2} = this.middleBase;
        this.compareCoordinates(y1, y2, fingerName);
    }

    ringFingerCheck(fingerName) {
        if (!this.ringTip && !this.ringBase) return;
        const {y: y1} = this.ringTip;
        const {y: y2} = this.ringBase;
        this.compareCoordinates(y1, y2, fingerName);
    }

    pinkyFingerCheck(fingerName) {
        if (!this.pinkyTip && !this.pinkyBase) return;
        const {y: y1} = this.pinkyTip;
        const {y: y2} = this.pinkyBase;
        this.compareCoordinates(y1, y2, fingerName);
    }

    compareCoordinates(y1, y2, fingerName) {
        if (y1 < y2) {
            if (!this.fingers.includes(fingerName)) {
                this.fingers.push(fingerName)
            }
        }
        else {
            if (this.fingers.includes(fingerName)) {
                this.fingers = this.fingers.filter(item => item !== fingerName);
            } 
        }
    }
}