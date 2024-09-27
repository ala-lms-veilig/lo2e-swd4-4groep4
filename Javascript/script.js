class ContactPage {
    constructor(jsonUrl) {
        this.jsonUrl = jsonUrl;
        this.contactInfo = {};
        this.init();
    }

    async fetchContactInfo() {
        try {
            const response = await fetch(this.jsonUrl);
            this.contactInfo = await response.json();
            this.displayContactInfo();
        } catch (error) {
            console.error('Fout bij het ophalen van de contactinformatie:', error);
        }
    }

    displayContactInfo() {
        const footer = document.querySelector('footer');
        footer.innerHTML = `
            <p>Contactinformatie: ${this.contactInfo.contactInfo.email} | Telefoon: ${this.contactInfo.contactInfo.phone}</p>
            <p>Volg ons op sociale media: 
                <a href="${this.contactInfo.contactInfo.socials.facebook}">Facebook</a>, 
                <a href="${this.contactInfo.contactInfo.socials.twitter}">Twitter</a>, 
                <a href="${this.contactInfo.contactInfo.socials.linkedin}">LinkedIn</a>
            </p>
        `;
    }

    handleSubmit(event) {
        event.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

  
        const formData = {
            name: name,
            email: email,
            message: message
        };

        
        localStorage.setItem('contactFormData', JSON.stringify(formData));

        this.showPopupMessage();
    }

    showPopupMessage() {
        const popupMessage = document.getElementById('popup-message');
        popupMessage.textContent = 'Je bericht is succesvol doorgestuurd en opgeslagen!';
        popupMessage.classList.add('show');

        
        setTimeout(() => {
            popupMessage.classList.remove('show');
            window.location.reload();  
        }, 3000);
    }

    init() {
        this.fetchContactInfo();

        const form = document.getElementById('contact-form');
        form.addEventListener('submit', (event) => this.handleSubmit(event));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const contactPage = new ContactPage('contact.json');
});