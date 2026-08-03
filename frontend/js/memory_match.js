const memorySets = [

    [
        {
            id: "happy",
            emoji: "😊",
            image: "../assets/images/happy.png"
        },
        {
            id: "sad",
            emoji: "😢",
            image: "../assets/images/sad.png"
        },
        {
            id: "angry",
            emoji: "😠",
            image: "../assets/images/angry.png"
        },
        {
            id: "fear",
            emoji: "😨",
            image: "../assets/images/fear.png"
        }
    ],

    [
        {
            id: "surprise",
            emoji: "😲",
            image: "../assets/images/surprise.png"
        },
        {
            id: "disgust",
            emoji: "🤢",
            image: "../assets/images/disgust.png"
        },
        {
            id: "neutral",
            emoji: "😐",
            image: "../assets/images/neutral.png"
        }
    ]
];

let memoryCards = [];
let flippedCards = [];
let matchedPairs = 0;
let attempts = 0;

function shuffle(array) {

    for (let i = array.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] =
        [array[j], array[i]];
    }

    return array;
}


function generateMemoryCards() {

    const selectedSet =
        memorySets[
            Math.floor(
                Math.random() * memorySets.length
            )
        ];

    memoryCards = [];

    selectedSet.forEach(emotion => {

        memoryCards.push({
            pairId: emotion.id,
            type: "emoji",
            value: emotion.emoji,
            matched: false
        });

        memoryCards.push({
            pairId: emotion.id,
            type: "image",
            value: emotion.image,
            matched: false
        });

    });

    shuffle(memoryCards);

    matchedPairs = 0;
    attempts = 0;
    flippedCards = [];
}


function renderMemoryGame() {

    generateMemoryCards();

    let html = `

        <div class="memory-header">

            <h2>Emotion Memory Match</h2>

            <p>
                Match the emoji with the correct emotion face.
            </p>

        </div>

        <div class="memory-grid">
    `;

    memoryCards.forEach((card,index)=>{

        html += `

            <div
                class="memory-card"
                id="card-${index}"
                onclick="flipCard(${index})"
            >

                ?

            </div>

        `;
    });

    html += `
        </div>

        <div id="memoryStats">

            Attempts: 0

        </div>
    `;

    document.getElementById("content").innerHTML =
        html;
}


function flipCard(index) {

    const card = memoryCards[index];

    if(card.matched) return;

    if(flippedCards.length === 2) return;

    if(
        flippedCards.some(
            item => item.index === index
        )
    ){
        return;
    }

    const cardElement =
        document.getElementById(
            `card-${index}`
        );

    if(card.type === "emoji"){

        cardElement.innerHTML = `

            <span class="memory-emoji">
                ${card.value}
            </span>

        `;

    }else{

        cardElement.innerHTML = `

            <img
                src="${card.value}"
                class="memory-image"
                alt="emotion"
            >

        `;
    }

    flippedCards.push({
        index,
        card
    });

    if(flippedCards.length === 2){

        attempts++;

        document.getElementById(
            "memoryStats"
        ).innerHTML =

        `Attempts: ${attempts}`;

        setTimeout(
            checkMatch,
            700
        );
    }
}


function checkMatch() {

    const first =
        flippedCards[0];

    const second =
        flippedCards[1];

    if(
        first.card.pairId ===
        second.card.pairId
    ){

        memoryCards[
            first.index
        ].matched = true;

        memoryCards[
            second.index
        ].matched = true;

        matchedPairs++;

        document
            .getElementById(
                `card-${first.index}`
            )
            .classList
            .add("matched");

        document
            .getElementById(
                `card-${second.index}`
            )
            .classList
            .add("matched");

    }else{

        document.getElementById(
            `card-${first.index}`
        ).innerHTML = "?";

        document.getElementById(
            `card-${second.index}`
        ).innerHTML = "?";
    }

    flippedCards = [];

    checkGameComplete();
}


function checkGameComplete() {

    const totalPairs =
        memoryCards.length / 2;

    if(matchedPairs === totalPairs){
        trackActivity("Memory Match");

        document
            .getElementById("content")
            .innerHTML = `

            <div class="memory-result">

                <h2>
                    🎉 Memory Game Completed!
                </h2>

                <p>
                    Attempts:
                    ${attempts}
                </p>

                <button
                    onclick="renderMemoryGame()"
                >
                    Play Again
                </button>

            </div>

        `;
    }
}