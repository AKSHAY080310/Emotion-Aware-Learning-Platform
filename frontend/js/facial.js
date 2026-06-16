const video =
document.getElementById("video");

const startCamera =
document.getElementById("startCamera");

const captureBtn =
document.getElementById("captureBtn");

const capturedImage =
document.getElementById("capturedImage");

const imageFile =
document.getElementById("imageFile");

const uploadImageBtn =
document.getElementById("uploadImageBtn");

const uploadedPreview =
document.getElementById("uploadedPreview");

const emotionText =
document.getElementById("emotion");

const confidenceText =
document.getElementById("confidence");

startCamera.addEventListener(
    "click",
    async () => {

        try {

            const stream =
            await navigator.mediaDevices.getUserMedia({
                video: true
            });

            video.srcObject =
            stream;

        }

        catch(error){

            console.error(error);

            alert(
                "Camera Not Available"
            );

        }

    }
);

captureBtn.addEventListener(
    "click",
    () => {

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

    }
);

uploadImageBtn.addEventListener(
    "click",
    async () => {

        const file =
        imageFile.files[0];

        if(!file){

            alert(
                "Please select an image"
            );

            return;
        }

        const reader =
        new FileReader();

        reader.onload =
        function(event){

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

        try{

            const response =
            await fetch(
                "https://emotion-recognition-wy5e.onrender.com/predict_face",
                {
                    method: "POST",
                    body: formData
                }
            );

            const data =
            await response.json();

            console.log(data);

            if(data.emotion){

                emotionText.innerText =
                data.emotion;

                confidenceText.innerText =
                data.confidence + "%";

            }
            else{

                emotionText.innerText =
                "Prediction Failed";

            }

        }

        catch(error){

            console.error(error);

            alert(
                "Backend Connection Error"
            );

        }

    }
);