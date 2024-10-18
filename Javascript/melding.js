document.addEventListener("DOMContentLoaded", function() {
    const meldingForm = document.getElementById("meldingForm");
    const meldingenLijst = document.getElementById("meldingenLijst");

    // Laad meldingen uit localStorage
    const opgeslagenMeldingen = JSON.parse(localStorage.getItem("meldingen")) || [];
    opgeslagenMeldingen.forEach(melding => voegMeldingToeAanLijst(melding));

    // Functie om een melding op te slaan
    meldingForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const scenario = document.getElementById("scenario").value;
        const toren = document.getElementById("toren").value;
        const verdieping = document.getElementById("verdieping").value;
        const beschrijving = document.getElementById("beschrijving").value;

        // Maak melding object
        const melding = {
            scenario,
            toren,
            verdieping,
            beschrijving,
            tijd: new Date().toLocaleString()
        };

        // Sla de melding op in localStorage
        opgeslagenMeldingen.push(melding);
        localStorage.setItem("meldingen", JSON.stringify(opgeslagenMeldingen));

        // Voeg melding toe aan de lijst
        voegMeldingToeAanLijst(melding);

        // Formulier resetten
        meldingForm.reset();
    });

    // Functie om een melding toe te voegen aan de lijst
    function voegMeldingToeAanLijst(melding) {
        const meldingDiv = document.createElement("div");
        meldingDiv.classList.add("melding");
        meldingDiv.innerHTML = `
            <strong>${melding.scenario}</strong> in <strong>${melding.toren}</strong>, <strong>${melding.verdieping}</strong><br>
            <em>${melding.tijd}</em><br>
            <p>${melding.beschrijving}</p>
            <hr>
        `;
        meldingenLijst.appendChild(meldingDiv);
    }
});