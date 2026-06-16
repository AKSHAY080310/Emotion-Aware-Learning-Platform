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
let recordedBlob = null;

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

                if(event.data.size > 0){

                    audioChunks.push(
                        event.data
                    );

                }

            };

            mediaRecorder.onstop =
            async () => {

                const audioBlob =
                new Blob(
                    audioChunks,
                    {
                        type: "audio/webm"
                    }
                );

                recordedBlob =
                audioBlob;

                console.log(
                    "Recording Complete"
                );

                console.log(
                    "Chunks:",
                    audioChunks.length
                );

                console.log(
                    "Blob Size:",
                    audioBlob.size
                );

                const audioURL =
                URL.createObjectURL(
                    audioBlob
                );

                player.src =
                audioURL;

                player.load();

                statusText.innerText =
                "Predicting...";

                const formData =
                new FormData();

                formData.append(
                    "audio",
                    recordedBlob,
                    "recorded.webm"
                );

                try {

                    const response =
                    await fetch(
                        "https://emotion-recognition-1-daeh.onrender.com/predict_audio",
                        {
                            method: "POST",
                            body: formData
                        }
                    );

                    const data =
                    await response.json();

                    console.log(
                        "Backend Response:",
                        data
                    );

                    if(data.emotion){

                        emotionText.innerText =
                        data.emotion;

                        confidenceText.innerText =
                        data.confidence + "%";

                        statusText.innerText =
                        "Prediction Complete";

                    }
                    else{

                        statusText.innerText =
                        "Prediction Failed";

                        console.error(
                            data.error
                        );

                    }

                }
                catch(error){

                    console.error(error);

                    statusText.innerText =
                    "Backend Error";

                }

            };

            mediaRecorder.start();

            statusText.innerText =
            "Recording...";

            setTimeout(() => {

                if(
                    mediaRecorder &&
                    mediaRecorder.state !== "inactive"
                ){

                    mediaRecorder.stop();

                }

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

            const response =
            await fetch(
                "http://localhost:5000/predict_audio",
                {
                    method: "POST",
                    body: formData
                }
            );

            const data =
            await response.json();

            console.log(
                "Backend Response:",
                data
            );

            if(data.emotion){

                emotionText.innerText =
                data.emotion;

                confidenceText.innerText =
                data.confidence + "%";

                statusText.innerText =
                "Prediction Complete";

            }
            else{

                statusText.innerText =
                "Prediction Failed";

                console.error(
                    data.error
                );

            }

        }
        catch(error){

            console.error(error);

            statusText.innerText =
            "Backend Connection Error";

        }

    }
);