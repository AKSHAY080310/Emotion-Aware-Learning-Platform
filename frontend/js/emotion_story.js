const storyEmotions = [
    "Happy",
    "Sad",
    "Angry",
    "Fear",
    "Surprise",
    "Disgust",
    "Neutral"
];

const emotionStories = [

    {
        title: "Ravi's Birthday Adventure",

        intro: `
            Ravi woke up excited because it was his birthday.
            His friends were coming to celebrate with him.
        `,

        questions: [
            {
                text: "When Ravi saw the birthday gifts, he felt",
                answer: "Happy"
            },
            {
                text: "Later, he could not find his favorite toy and felt",
                answer: "Sad"
            },
            {
                text: "A balloon suddenly burst near him and he felt",
                answer: "Fear"
            },
            {
                text: "His little brother accidentally broke one of his toys and Ravi felt",
                answer: "Angry"
            },
            {
                text: "His friends brought a huge cake that he wasn't expecting and Ravi felt",
                answer: "Surprise"
            }
        ]
    },

    {
        title: "A Day at School",

        intro: `
            Ananya went to school early in the morning.
            Many interesting things happened during the day.
        `,

        questions: [
            {
                text: "When Ananya got full marks in a test, she felt",
                answer: "Happy"
            },
            {
                text: "She later lost her favorite pencil and felt",
                answer: "Sad"
            },
            {
                text: "A classmate pushed her notebook off the desk and she felt",
                answer: "Angry"
            },
            {
                text: "The teacher suddenly announced a surprise presentation and she felt",
                answer: "Fear"
            },
            {
                text: "At the end of the day, the principal announced a school trip and she felt",
                answer: "Surprise"
            }
        ]
    },

    {
        title: "Trip to the Park",

        intro: `
            Aman visited a large park with his family on Sunday.
            The day was full of different experiences.
        `,

        questions: [
            {
                text: "When Aman got to ride his favorite swing, he felt",
                answer: "Happy"
            },
            {
                text: "He accidentally dropped his ice cream and felt",
                answer: "Sad"
            },
            {
                text: "A bigger child cut in front of him in line and he felt",
                answer: "Angry"
            },
            {
                text: "A dog suddenly barked loudly near him and he felt",
                answer: "Fear"
            },
            {
                text: "His father unexpectedly bought him a new football and he felt",
                answer: "Surprise"
            }
        ]
    },

    {
        title: "Meena and the Lost Puppy",

        intro: `
            Meena was playing outside when she found a small puppy.
            She decided to help it find its owner.
        `,

        questions: [
            {
                text: "When the puppy started playing with her, Meena felt",
                answer: "Happy"
            },
            {
                text: "The puppy suddenly ran away and she felt",
                answer: "Sad"
            },
            {
                text: "Some children teased the puppy and Meena felt",
                answer: "Angry"
            },
            {
                text: "The puppy disappeared into a busy street and she felt",
                answer: "Fear"
            },
            {
                text: "The owner appeared and thanked her with a gift, making her feel",
                answer: "Surprise"
            }
        ]
    },

    {
        title: "Family Picnic",

        intro: `
            Rahul and his family went on a picnic near a lake.
            The day brought many different emotions.
        `,

        questions: [
            {
                text: "When Rahul saw all his favorite foods, he felt",
                answer: "Happy"
            },
            {
                text: "His sandwich fell into the grass and he felt",
                answer: "Sad"
            },
            {
                text: "His cousin accidentally stepped on his drawing and he felt",
                answer: "Angry"
            },
            {
                text: "A thunderstorm suddenly started and Rahul felt",
                answer: "Fear"
            },
            {
                text: "His family revealed a surprise gift they had hidden for him and he felt",
                answer: "Surprise"
            }
        ]
    }

];

let currentStory = null;
let score = 0;



function getRandomStory() {
    const randomIndex =
        Math.floor(Math.random() * emotionStories.length);

    return emotionStories[randomIndex];
}


function renderStory() {

    currentStory = getRandomStory();

    let html = `
        <div class="story-card">

            <h2>${currentStory.title}</h2>

            <p class="story-intro">
                ${currentStory.intro}
            </p>
    `;

    currentStory.questions.forEach((question, index) => {

        html += `
            <div class="story-question">

                <p>
                    ${index + 1}. ${question.text}
                </p>

                <select id="answer-${index}">
                    <option value="">
                        Select Emotion
                    </option>

                    ${storyEmotions.map(emotion => `
                        <option value="${emotion}">
                            ${emotion}
                        </option>
                    `).join("")}

                </select>

            </div>
        `;
    });

    html += `
            <button
                class="submit-story-btn"
                onclick="checkStoryAnswers()"
            >
                Submit Story
            </button>

        </div>
    `;

    document.getElementById(
        "content"
    ).innerHTML = html;
}


function checkStoryAnswers() {

    score = 0;

    currentStory.questions.forEach((question, index) => {

        const selectedEmotion =
            document.getElementById(
                `answer-${index}`
            ).value;

        if (selectedEmotion === question.answer) {
            score++;
        }
    });

    showResult();
}


function showResult() {

    let resultHTML = `
        <div class="story-result">

            <h2>Story Completed!</h2>

            <h3>
                Score:
                ${score}
                /
                ${currentStory.questions.length}
            </h3>

            <hr>

            <h3>Correct Answers</h3>
    `;

    currentStory.questions.forEach((question, index) => {

        resultHTML += `
            <p>
                <strong>
                    ${question.text}
                </strong>

                <br>

                Correct Answer:
                ${question.answer}
            </p>
        `;
    });

    resultHTML += `
            <button
                class="play-again-btn"
                onclick="renderStory()"
            >
                Play Another Story
            </button>

        </div>
    `;
    
    trackActivity("Emotion Story");

    document.getElementById(
        "content"
    ).innerHTML = resultHTML;
}


