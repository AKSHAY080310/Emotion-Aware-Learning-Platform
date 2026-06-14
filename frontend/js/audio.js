const recordBtn =
document.getElementById("recordBtn");

const statusText =
document.getElementById("status");

const player =
document.getElementById("audioPlayer");

let mediaRecorder;
let audioChunks = [];

recordBtn.addEventListener(
    "click",
    async () => {

        try {

            const stream =
            await navigator.mediaDevices.getUserMedia({
                audio:true
            });

            console.log(
                "MIC ACCESS GRANTED"
            );

            mediaRecorder =
            new MediaRecorder(stream);

            audioChunks = [];

            mediaRecorder.ondataavailable =
            (event) => {

                console.log(
                    "Chunk Received"
                );

                audioChunks.push(
                    event.data
                );
            };

            mediaRecorder.onstop =
            () => {

                console.log(
                    "Recording Stopped"
                );

                const audioBlob =
                new Blob(
                    audioChunks,
                    {
                        type:
                        "audio/webm"
                    }
                );

                console.log(
                    audioBlob
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

            console.error(
                error
            );

        }

    }
);