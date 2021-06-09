export default class QuestionGenerator {

    constructor(soundGenerator){
        this.soundGenerator = soundGenerator;
        this.answerItems = [];
    }

    init() {
        this.initQuestionParams();
        this.createQuestion();
        this.createAnswers();
    }

    initQuestionParams() {
        this.question = 'Care este cel mai înalt vârf muntos din România?';
        this.answers = [
            {
                answerOption: 'Vârful Negoiu',
                isCorrect: false,
            },
            {
                answerOption: 'Vârful Moldoveanu',
                isCorrect: true
            },
            {
                answerOption: 'Vârful Omu',
                isCorrect: false
            }
        ];
        this.questionContainer = document.getElementById('question-container');
        this.answerContainer = document.getElementById('answer-container');
    }

    createQuestion() {
        const questionElement = document.createElement('div');
        questionElement.classList.add('question');
        questionElement.innerText = this.question;
        this.questionContainer.append(questionElement);
    }

    createAnswers() { 
        this.answers.forEach((answer) => {
            const answerEl = document.createElement('div')
            answerEl.classList.add('answer');
            answer.isCorrect ? answerEl.classList.add('is-correct') : answerEl.classList.add('is-false');
            answerEl.addEventListener('click', () => {
                this.verifyAnswer(answerEl);
            });
            answerEl.innerText = answer.answerOption;
            this.answerContainer.append(answerEl);
            this.answerItems.push(answerEl);
        });
    }

    verifyAnswer(answerEl) { 
        if (answerEl.classList.contains('is-correct')) {
            if (!answerEl.classList.contains('answer-correct'))
                answerEl.classList.add('answer-correct');
                this.soundGenerator.generateCorrectAnswerSound();
        } else {
            if (!answerEl.classList.contains('answer-false'))
                answerEl.classList.add('answer-false');
                this.soundGenerator.generateIncorrectAnswerSound();
        }
    }
}