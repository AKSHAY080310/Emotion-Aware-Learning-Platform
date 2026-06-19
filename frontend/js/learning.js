const flashcards = [

{
    emotion: "Happy",
    emoji: "😊",
    description: "Feeling joyful and pleased.",
    example: "Getting a gift from a friend."
},

{
    emotion: "Sad",
    emoji: "😢",
    description: "Feeling unhappy or disappointed.",
    example: "Losing your favorite toy."
},

{
    emotion: "Angry",
    emoji: "😠",
    description: "Feeling upset or frustrated.",
    example: "Someone breaks your toy."
},

{
    emotion: "Fear",
    emoji: "😨",
    description: "Feeling scared or worried.",
    example: "Hearing a loud noise at night."
},

{
    emotion: "Surprise",
    emoji: "😲",
    description: "Feeling shocked or amazed.",
    example: "Seeing an unexpected birthday cake."
},

{
    emotion: "Disgust",
    emoji: "🤢",
    description: "Feeling dislike or revulsion.",
    example: "Smelling spoiled food."
},

{
    emotion: "Neutral",
    emoji: "😐",
    description: "No strong emotion.",
    example: "Waiting for a bus."
}

];

const container =
document.getElementById("flashcardsContainer");

flashcards.forEach(card => {

    const flashcard =
    document.createElement("div");

    flashcard.classList.add("flashcard");

    flashcard.innerHTML = `
        <div class="flashcard-inner">

            <div class="flashcard-front">
                <div class="emoji">${card.emoji}</div>
                <h2>${card.emotion}</h2>
            </div>

            <div class="flashcard-back">
                <h3>${card.emotion}</h3>
                <p>${card.description}</p>

                <div class="example">
                    <strong>Example:</strong>
                    <p>${card.example}</p>
                </div>
            </div>

        </div>
    `;

    flashcard.addEventListener("click", () => {
        flashcard.classList.toggle("flip");
    });

    container.appendChild(flashcard);

});