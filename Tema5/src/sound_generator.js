export default class SoundGenerator {
    
    init() {
        this.synth = new Tone.Synth().toDestination();
    }

    generateCorrectAnswerSound() {
        this.synth.triggerAttackRelease("A6", "8n");
    }

    generateIncorrectAnswerSound() {
        this.synth.triggerAttackRelease("A2", "8n");
    }
}