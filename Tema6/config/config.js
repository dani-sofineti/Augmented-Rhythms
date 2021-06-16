const config = {
    handDetection: {
        url: 'https://cdn.jsdelivr.net/npm/@mediapipe/holistic/',
        options: {
            modelComplexity: 1,
            smoothLandmarks: true,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5
        }
    }
}

export default config;