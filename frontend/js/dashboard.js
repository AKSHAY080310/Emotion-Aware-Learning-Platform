async function loadDashboard() {

    try {

        const response = await fetch(
            "http://localhost:5000/history"
        );

        const data = await response.json();

        document.getElementById("totalPredictions").innerText = data.length;

        let audioCount = 0;
        let faceCount = 0;

        const emotionCounts = {};

        const tbody = document.querySelector(
            "#historyTable tbody"
        );

        tbody.innerHTML = "";

        data.forEach((row) => {

            const id = row[0];
            const fileType = row[2];
            const filename = row[3];

            const emotion =
            row[4].toLowerCase();

            const displayEmotion =
            emotion.charAt(0).toUpperCase() +
            emotion.slice(1);

            const confidence = row[5];

            if (fileType === "audio") {
                audioCount++;
            } else if (fileType === "face") {
                faceCount++;
            }

            const tr =
            document.createElement("tr");

            tr.innerHTML = `
                <td>${id}</td>
                <td>${fileType}</td>
                <td title="${filename}">
                    ${filename}
                </td>
                <td>
                    <span class="emotion-badge">
                        ${displayEmotion}
                    </span>
                </td>
                <td>
                    ${Number(confidence).toFixed(2)}%
                </td>
            `;

            tbody.appendChild(tr);

            emotionCounts[emotion] =
            (emotionCounts[emotion] || 0) + 1;

        });

        document.getElementById(
            "audioCount"
        ).innerText = audioCount;

        document.getElementById(
            "faceCount"
        ).innerText = faceCount;

        let topEmotion = "-";
        let maxCount = 0;

        for (const emotion in emotionCounts) {

            if (emotionCounts[emotion] > maxCount) {

                maxCount =
                emotionCounts[emotion];

                topEmotion =
                emotion.charAt(0).toUpperCase() +
                emotion.slice(1);

            }

        }

        document.getElementById(
            "topEmotion"
        ).innerText = topEmotion;

        const labels =
        Object.keys(emotionCounts)
        .map(emotion =>
            emotion.charAt(0).toUpperCase() +
            emotion.slice(1)
        );

        const values =
        Object.values(emotionCounts);

        const ctx =
        document.getElementById(
            "emotionChart"
        ).getContext("2d");

        new Chart(ctx, {

            type: "pie",

            data: {

                labels: labels,

                datasets: [{
                    data: values
                }]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                plugins: {

                    legend: {
                        position: "bottom"
                    }

                }

            }

        });

    }
    catch (error) {

        console.error(error);

    }

}

loadDashboard();