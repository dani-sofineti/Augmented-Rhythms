
export default class SoundPlayer {
    
    previouslyRaisedFingers = null;
    interval = null;

    init(soundGenerator, currentlyRaisedFingers) {
        this.currentlyRaisedFingers = currentlyRaisedFingers.length;
        this.soundGenerator = soundGenerator;
        this.playSound();
    }

    playSound() {
        if (this.currentlyRaisedFingers !== this.previouslyRaisedFingers) {
            if (this.interval) clearInterval(this.interval);
            this.interval = setInterval(() => {
                this.soundGenerator.generateSound();
            }, (this.currentlyRaisedFingers + 1) * 300);
            this.previouslyRaisedFingers = this.currentlyRaisedFingers.valueOf();
        }
    }
}