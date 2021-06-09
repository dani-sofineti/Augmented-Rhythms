export default class Hand {
    constructor(question) {
        this.question = question;
    }
    
    isItemPressed(item) {
        const clientRect = item.getBoundingClientRect();
        const indexFingerX = this.indexFingerTip.x * 780 + 20;
        const indexFingerY = this.indexFingerTip.y * 439 + 20;
        const itemX = clientRect.x;
        const itemY = clientRect.y;
        if (item.classList.contains('recently-activated-by-touch')) return;
        return (
            indexFingerX > itemX && indexFingerX < clientRect.right &&
            indexFingerY > itemY && indexFingerY < clientRect.bottom
        )
    }
  
    updateLandmarks(landmarks) {
      this.landmarks = landmarks;
    }
  
    draw() {
      this.indexFingerTip = this.landmarks && this.landmarks[8];
      if (this.indexFingerTip) {
          const isPressed = this.indexFingerTip.z < -0.11;
          if (isPressed) {
              this.question.answerItems.forEach((answerEl) => {
                  if (this.isItemPressed(answerEl)) {
                      if (this.alreadyAnswered(answerEl)) return;
                      this.question.verifyAnswer(answerEl)
                      answerEl.classList.add('recently-activated-by-touch');
                      setTimeout(() => {
                        answerEl.classList.remove('recently-activated-by-touch');
                      }, 1000);
                  }
              });
          }
      }
    }

    alreadyAnswered (answerEl) {
        return (
            answerEl.classList.contains('answer-false') || answerEl.classList.contains('answer-correct')
        );
    }
}