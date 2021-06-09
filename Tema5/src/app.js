import HandDetection from './hand_detection.js';
import QuestionGenerator from './question_generator.js';
import SoundGenerator from './sound_generator.js';

export default class App {
    init() {
        this.initializeSoundGenerator();
        this.initualizeQuestion();
        this.initializeMediaPipe();
    }
    
    initializeSoundGenerator() {
        this.soundGenerator = new SoundGenerator();
        this.soundGenerator.init();
    }

    initualizeQuestion() {
        this.question = new QuestionGenerator(this.soundGenerator);
        this.question.init();
    }

    initializeMediaPipe() {
       const handInteraction = new HandDetection(this.question); 
       handInteraction.init();
    }
}