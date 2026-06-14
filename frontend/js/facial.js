const video =
document.getElementById("video");

const startCamera =
document.getElementById("startCamera");

const captureBtn =
document.getElementById("captureBtn");

const capturedImage =
document.getElementById("capturedImage");

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

            console.log(
                "Camera Started"
            );

        }

        catch(error){

    console.error(error);

    alert(error.name);

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

        console.log(
            "Image Captured"
        );

    }
);