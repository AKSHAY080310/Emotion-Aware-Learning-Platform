const content = document.getElementById("content");

const flashcardsBtn =
document.getElementById("flashcardsBtn");

const quizBtn =
document.getElementById("quizBtn");

const emotions = [

{
name:"Happy",
color:"#FFF3B0",
description:"Feeling joyful and pleased.",
example:"Receiving a birthday gift."
},

{
name:"Sad",
color:"#D6EAF8",
description:"Feeling unhappy or disappointed.",
example:"Losing your favorite toy."
},

{
name:"Angry",
color:"#F5B7B1",
description:"Feeling upset or frustrated.",
example:"Someone breaks your toy."
},

{
name:"Fear",
color:"#D7BDE2",
description:"Feeling scared or worried.",
example:"Hearing thunder at night."
},

{
name:"Surprise",
color:"#FCF3CF",
description:"Feeling amazed or shocked.",
example:"Seeing a surprise party."
},

{
name:"Disgust",
color:"#A9DFBF",
description:"Feeling dislike or revulsion.",
example:"Smelling spoiled food."
},

{
name:"Neutral",
color:"#E5E7E9",
description:"No strong emotion.",
example:"Waiting for a bus."
}

];

function showFlashcards(){

    let html =
    `<div class="flashcard-grid">`;

    emotions.forEach(emotion => {

        html += `
        <div class="card
        ${emotion.name === "Neutral"
        ? "neutral-card"
        : ""}
        "
        style="background:${emotion.color}">

            <h2>${emotion.name}</h2>

            <p>
                ${emotion.description}
            </p>

            <p>
                <strong>Example:</strong><br>
                ${emotion.example}
            </p>

        </div>
        `;
    });

    html += `</div>`;

    content.innerHTML = html;
}

const questions = [

{
question:
"How would you feel if someone gave you a birthday gift?",
options:["Happy","Sad","Angry","Fear"],
answer:"Happy"
},

{
question:
"You lost your favorite toy.",
options:["Happy","Sad","Neutral","Surprise"],
answer:"Sad"
},

{
question:
"Someone broke your toy.",
options:["Happy","Angry","Fear","Neutral"],
answer:"Angry"
},

{
question:
"A loud thunderstorm starts.",
options:["Fear","Happy","Neutral","Disgust"],
answer:"Fear"
},

{
question:
"You see a surprise party.",
options:["Surprise","Angry","Sad","Fear"],
answer:"Surprise"
},

{
question:
"You smell rotten food.",
options:["Happy","Disgust","Surprise","Neutral"],
answer:"Disgust"
},

{
question:
"Waiting quietly for a bus.",
options:["Neutral","Angry","Fear","Happy"],
answer:"Neutral"
},

{
question:
"You won a competition.",
options:["Happy","Sad","Fear","Neutral"],
answer:"Happy"
},

{
question:
"Your pet ran away.",
options:["Sad","Happy","Disgust","Neutral"],
answer:"Sad"
},

{
question:
"A balloon suddenly pops.",
options:["Surprise","Happy","Neutral","Disgust"],
answer:"Surprise"
}

];

function showQuiz(){

    let html =
    `<div class="quiz-container">
    <form id="quizForm">`;

    questions.forEach((q,index)=>{

        html += `
        <div class="question">

            <h3>
            ${index+1}. ${q.question}
            </h3>
        `;

        q.options.forEach(option=>{

            html += `
            <label>
                <input
                type="radio"
                name="q${index}"
                value="${option}">
                ${option}
            </label>
            <br>
            `;
        });

        html += `</div>`;
    });

    html += `
    <button type="submit">
        Submit Quiz
    </button>
    </form>

    <div id="result"></div>

    </div>
    `;

    content.innerHTML = html;

    document
    .getElementById("quizForm")
    .addEventListener(
        "submit",
        submitQuiz
    );
}

function submitQuiz(e){

    e.preventDefault();

    let score = 0;

    questions.forEach((q,index)=>{

        const selected =
        document.querySelector(
        `input[name="q${index}"]:checked`
        );

        if(
            selected &&
            selected.value === q.answer
        ){
            score++;
        }
    });

    let advice = "";

    if(score >= 8){

        advice =
        "Excellent! You understand emotions very well.";

    }
    else if(score >= 5){

        advice =
        "Good job! Review the flashcards to improve further.";

    }
    else{

        advice =
        "Keep practicing. Review the flashcards and try again.";
    }

    document
    .getElementById("result")
    .innerHTML = `
    <div class="result">

        <h2>
        Score: ${score}/10
        </h2>

        <p>${advice}</p>

    </div>
    `;
}

flashcardsBtn.addEventListener(
    "click",
    showFlashcards
);

quizBtn.addEventListener(
    "click",
    showQuiz
);

showFlashcards();