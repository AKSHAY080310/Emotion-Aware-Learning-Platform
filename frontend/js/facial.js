const video = document.getElementById("video");
const startCamera = document.getElementById("startCamera");
const captureBtn = document.getElementById("captureBtn");
const capturedImage = document.getElementById("capturedImage");

const imageFile = document.getElementById("imageFile");
const uploadImageBtn = document.getElementById("uploadImageBtn");
const uploadedPreview = document.getElementById("uploadedPreview");

const emotionText = document.getElementById("emotion");
const confidenceText = document.getElementById("confidence");

let stream = null;

console.log("FACIAL.JS LOADED");

/* Start Camera */

startCamera.addEventListener(
    "click",
    async () => {

        try {

            stream =
                await navigator.mediaDevices.getUserMedia({
                    video: true
                });

            video.style.display = "block";
            video.srcObject = stream;

        }

        catch (error) {

            console.error(error);

            alert(
                "Camera Not Available"
            );

        }

    }
);

/* Capture Face + Predict */

captureBtn.addEventListener(
    "click",
    async () => {

        try {

            const canvas =
                document.getElementById(
                    "canvas"
                );

            const ctx =
                canvas.getContext(
                    "2d"
                );

            canvas.width =
                video.videoWidth;

            canvas.height =
                video.videoHeight;

            ctx.drawImage(
                video,
                0,
                0
            );

            const imageData =
                canvas.toDataURL(
                    "image/jpeg"
                );

            capturedImage.src =
                imageData;

            capturedImage.style.display =
                "block";

            canvas.toBlob(
                async (blob) => {

                    const formData =
                        new FormData();

                    formData.append(
                        "image",
                        blob,
                        "capture.jpg"
                    );

                    try {

                        const response =
                            await fetch(
                                "/predict_face",
                                {
                                    method: "POST",
                                    body: formData
                                }
                            );

                        if (!response.ok) {

                            emotionText.innerText =
                                "Server Error";

                            confidenceText.innerText =
                                "-";

                            return;
                        }

                        const data =
                            await response.json();

                        emotionText.innerText =
                            data.emotion;

                        confidenceText.innerText =
                            data.confidence + "%";

                    }

                    catch (error) {

                        console.error(error);

                        emotionText.innerText =
                            "Prediction Failed";

                        confidenceText.innerText =
                            "-";

                    }

                },
                "image/jpeg"
            );

            if (stream) {

                stream.getTracks().forEach(
                    track => track.stop()
                );

                video.srcObject = null;

                video.style.display = "none";
            }

        }

        catch (error) {

            console.error(error);

            emotionText.innerText =
                "Prediction Failed";

            confidenceText.innerText =
                "-";

        }

    }
);

/* Upload Image Prediction */

uploadImageBtn.addEventListener(
    "click",
    async () => {

        const file =
            imageFile.files[0];

        if (!file) {

            alert(
                "Please select an image"
            );

            return;
        }

        const reader =
            new FileReader();

        reader.onload =
            function (event) {

                uploadedPreview.src =
                    event.target.result;

            };

        reader.readAsDataURL(
            file
        );

        const formData =
            new FormData();

        formData.append(
            "image",
            file
        );

        try {

            const response =
                await fetch(
                    "/predict_face",
                    {
                        method: "POST",
                        body: formData
                    }
                );

            if (!response.ok) {

                emotionText.innerText =
                    "Server Error";

                confidenceText.innerText =
                    "-";

                return;
            }

            const data =
                await response.json();

            if (data.emotion) {

                emotionText.innerText =
                    data.emotion;

                confidenceText.innerText =
                    data.confidence + "%";

            }

            else {

                emotionText.innerText =
                    "Prediction Failed";

                confidenceText.innerText =
                    "-";

            }

        }

        catch (error) {

            console.error(error);

            emotionText.innerText =
                "Connection Error";

            confidenceText.innerText =
                "-";

            alert(
                "Backend Connection Error"
            );

        }

    }
);