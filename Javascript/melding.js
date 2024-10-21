document.addEventListener("DOMContentLoaded", function() {
    const meldingForm = document.getElementById("meldingForm");
    const meldingenLijst = document.getElementById("meldingenLijst");

    // Laad meldingen uit localStorage
    const opgeslagenMeldingen = JSON.parse(localStorage.getItem("meldingen")) || [];
    opgeslagenMeldingen.forEach(melding => voegMeldingToeAanLijst(melding));

    // meldingen opslaan
    meldingForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const scenario = document.getElementById("scenario").value;
        const toren = document.getElementById("toren").value;
        const verdieping = document.getElementById("verdieping").value;
        const beschrijving = document.getElementById("beschrijving").value;

        // melding maken
        const melding = {
            scenario,
            toren,
            verdieping,
            beschrijving,
            tijd: new Date().toLocaleString()
        };

        // opslaan in de localStorage
        opgeslagenMeldingen.push(melding);
        localStorage.setItem("meldingen", JSON.stringify(opgeslagenMeldingen));

        // Meldingen toevoegen
        voegMeldingToeAanLijst(melding);

        // Resetten
        meldingForm.reset();
    });

    // Meldingen toevoegen aan de lijst
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