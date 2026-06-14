const recordBtn =
document.getElementById("recordBtn");

const statusText =
document.getElementById("status");

const player =
document.getElementById("audioPlayer");

const audioFile =
document.getElementById("audioFile");

const uploadAudioBtn =
document.getElementById("uploadAudioBtn");

const emotionText =
document.getElementById("emotion");

const confidenceText =
document.getElementById("confidence");

let mediaRecorder;
let audioChunks = [];

recordBtn.addEventListener(
    "click",
    async () => {

        try {

            const stream =
            await navigator.mediaDevices.getUserMedia({
                audio: true
            });

            mediaRecorder =
            new MediaRecorder(stream);

            audioChunks = [];

            mediaRecorder.ondataavailable =
            (event) => {

                audioChunks.push(
                    event.data
                );

            };

            mediaRecorder.onstop =
            () => {

                const audioBlob =
                new Blob(
                    audioChunks,
                    {
                        type: "audio/webm"
                    }
                );

                const audioURL =
                URL.createObjectURL(
                    audioBlob
                );

                player.src =
                audioURL;

                statusText.innerText =
                "Recording Complete";

            };

            mediaRecorder.start();

            statusText.innerText =
            "Recording...";

            setTimeout(() => {

                mediaRecorder.stop();

            }, 5000);

        }

        catch(error){

            console.error(error);

            statusText.innerText =
            "Microphone Error";

        }

    }
);

uploadAudioBtn.addEventListener(
    "click",
    async () => {

        const file =
        audioFile.files[0];

        if(!file){

            alert(
                "Please select an audio file"
            );

            return;
        }

        const formData =
        new FormData();

        formData.append(
            "audio",
            file
        );

        try{

            statusText.innerText =
            "Predicting...";

            console.log("Sending request...");

            const response =
            await fetch(
                "http://127.0.0.1:5000/predict_audio",
                {
                    method: "POST",
                    body: formData
                }
            );

            console.log("Response received");

            const data =
            await response.json();

            console.log(data);

            if(data.emotion){

                emotionText.innerText =
                data.emotion;

                confidenceText.innerText =
                "N/A";

                statusText.innerText =
                "Prediction Complete";

            }
            else{

                statusText.innerText =
                "Prediction Failed";

            }

        }
        catch(error){

            console.error(error);

            statusText.innerText =
            "Backend Connection Error";

        }

    }
);