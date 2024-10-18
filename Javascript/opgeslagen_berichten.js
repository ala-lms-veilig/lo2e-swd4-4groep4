document.addEventListener("DOMContentLoaded", function() {
    const messageList = document.getElementById("messageList");

    // Haal berichten op uit localStorage
    const opgeslagenBerichten = JSON.parse(localStorage.getItem("contactBerichten")) || [];

    if (opgeslagenBerichten.length === 0) {
        messageList.innerHTML = "<p>Er zijn geen opgeslagen berichten.</p>";
    } else {
        opgeslagenBerichten.forEach(function(bericht, index) {
            const berichtElement = document.createElement("div");
            berichtElement.classList.add("message");

            berichtElement.innerHTML = `
                <h3>Bericht ${index + 1}</h3>
                <p><strong>Naam:</strong> ${bericht.naam}</p>
                <p><strong>E-mail:</strong> ${bericht.email}</p>
                <p><strong>Onderwerp:</strong> ${bericht.onderwerp}</p>
                <p><strong>Bericht:</strong> ${bericht.bericht}</p>
                <p><em>Verzonden op: ${bericht.tijd}</em></p>
                <hr>
            `;

            messageList.appendChild(berichtElement);
        });
    }
});
