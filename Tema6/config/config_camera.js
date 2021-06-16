const configCamera = {
    cameraWidth: 780,
    cameraHeight: 439,
    cameraNormalizedWidth: 745,
    cameraNormalizedHeight: 414,
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

export default configCamera;