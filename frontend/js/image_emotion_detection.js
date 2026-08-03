const emotionQuestions = [

    {
        image: "../assets/images/happy_human.jpg",
        answer: "Happy"
    },

    {
        image: "../assets/images/sad_human.jpg",
        answer: "Sad"
    },

    {
        image: "../assets/images/angry_human.jpg",
        answer: "Angry"
    },

    {
        image: "../assets/images/fear_human.jpg",
        answer: "Fear"
    },

    {
        image: "../assets/images/surprise_human.jpg",
        answer: "Surprise"
    },

    {
        image: "../assets/images/disgust_human.jpg",
        answer: "Disgust"
    },

    {
        image: "../assets/images/neutral_human.jpg",
        answer: "Neutral"
    }

];

const emotionOptions = [
    "Happy",
    "Sad",
    "Angry",
    "Fear",
    "Surprise",
    "Disgust",
    "Neutral"
];

let shuffledQuestions = [];
let currentQuestionIndex = 0;
let emotionScore = 0;



function shuffleEmotionQuestions() {

    shuffledQuestions =
        [...emotionQuestions];

    for(
        let i = shuffledQuestions.length - 1;
        i > 0;
        i--
    ){

        const j =
            Math.floor(
                Math.random() * (i + 1)
            );

        [
            shuffledQuestions[i],
            shuffledQuestions[j]
        ] =
        [
            shuffledQuestions[j],
            shuffledQuestions[i]
        ];
    }
}



function renderEmotionIdentification() {

    shuffleEmotionQuestions();

    currentQuestionIndex = 0;
    emotionScore = 0;

    showEmotionQuestion();
}


function showEmotionQuestion() {

    const question =
        shuffledQuestions[
            currentQuestionIndex
        ];

    let html = `

        <div class="emotion-identification">

            <h2>
                Emotion Identification
            </h2>

            <p>
                Look at the image and
                identify the emotion.
            </p>

            <img
                src="${question.image}"
                alt="Emotion"
                class="emotion-image"
            >

            <div class="emotion-options">
    `;

    emotionOptions.forEach(emotion => {

        html += `

            <button
                class="emotion-option-btn"
                onclick="checkEmotionAnswer('${emotion}')"
            >

                ${emotion}

            </button>

        `;
    });

    html += `

            </div>

            <p>
                Question
                ${currentQuestionIndex + 1}
                /
                ${shuffledQuestions.length}
            </p>

        </div>

    `;

    document.getElementById(
        "content"
    ).innerHTML = html;
}



function checkEmotionAnswer(
    selectedEmotion
) {

    const question =
        shuffledQuestions[
            currentQuestionIndex
        ];

    if(
        selectedEmotion ===
        question.answer
    ){
        emotionScore++;
    }

    currentQuestionIndex++;

    if(
        currentQuestionIndex <
        shuffledQuestions.length
    ){

        showEmotionQuestion();

    }else{

        showEmotionResult();
    }
}


function showEmotionResult() {

    trackActivity(
        "Emotion Identification"
    );

    let performanceMessage = "";

    const percentage =
        (
            emotionScore /
            shuffledQuestions.length
        ) * 100;

    if(percentage >= 80){

        performanceMessage =
            "Excellent Emotion Recognition!";

    }else if(percentage >= 60){

        performanceMessage =
            "Good Job! Keep Practicing.";

    }else{

        performanceMessage =
            "Practice More To Improve Recognition.";
    }

    document.getElementById(
        "content"
    ).innerHTML = `

        <div class="emotion-result">

            <h2>
                Activity Completed!
            </h2>

            <h3>

                Score:
                ${emotionScore}
                /
                ${shuffledQuestions.length}

            </h3>

            <p>

                ${performanceMessage}

            </p>

            <button
                onclick="renderEmotionIdentification()"
            >

                Play Again

            </button>

        </div>

    `;
}