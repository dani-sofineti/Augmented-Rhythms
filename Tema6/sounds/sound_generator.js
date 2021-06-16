export default class SoundGenerator {
    constructor() {
        this.synth = new Tone.Synth().toDestination();
    }

    generateSound() {
        this.synth.triggerAttackRelease("C4", "8n");
    }
    
}