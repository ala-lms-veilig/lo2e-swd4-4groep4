document.getElementById('notificationForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const titel = document.getElementById('meldingTitel').value.trim();
    const beschrijving = document.getElementById('meldingBeschrijving').value.trim();

    if (titel && beschrijving) {
        document.getElementById('meldingTitel').value = '';
        document.getElementById('meldingBeschrijving').value = '';

        const popupMessage = document.getElementById('popup-message');
        popupMessage.classList.add('show');

        setTimeout(() => {
            popupMessage.classList.remove('show');
        }, 3000);
    }
});
