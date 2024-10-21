//Wachten tot de hele pagina geladen is
document.addEventListener("DOMContentLoaded", function() {
    
    //formulier selecteren 
    const contactForm = document.getElementById("contactForm");
    
    //versturen van het formulier
    contactForm.addEventListener("submit", function(e) {
        
        //Voorkomen dat de pagina opnieuw laadt
        e.preventDefault();

        //Gegevens ophalen uit het formulier
        const naam = document.getElementById("naam").value;
        const email = document.getElementById("email").value;
        const onderwerp = document.getElementById("onderwerp").value;
        const bericht = document.getElementById("bericht").value;
        
        //Een object maken om het bericht op te slaan
        const contactBericht = {
            naam,
            email,
            onderwerp,
            bericht,
            tijd: new Date().toLocaleString()
        };
        
        //Ophalen van reeds opgeslagen berichten uit de browser
        const opgeslagenBerichten = JSON.parse(localStorage.getItem("contactBerichten")) || [];

        //Het nieuwe bericht aan de lijst toevoegen en opslaan
        opgeslagenBerichten.push(contactBericht);
        localStorage.setItem("contactBerichten", JSON.stringify(opgeslagenBerichten));

        //Het formulier resetten en de gebruiker informeren
        contactForm.reset();
        alert("Je bericht is verzonden en opgeslagen.");
    });
}); 