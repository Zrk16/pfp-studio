import * as faceapi from 'face-api.js';

const MODEL_URL = '/models';

export async function loadModels() {
    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
    await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
}

export async function detectFace(image) {
    const detections = await faceapi
        .detectSingleFace(image, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks();

    return detections || null;
}