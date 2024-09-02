function updateDateTime() {
    const now = new Date();
    document.getElementById('current-time').textContent = `Time: ${now.toLocaleTimeString()}`;
    document.getElementById('current-date').textContent = `Date: ${now.toLocaleDateString()}`;
}

function initializePage() {
    setInterval(updateDateTime, 1000);
    updateDateTime();

    document.getElementById('reservation-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const guests = document.getElementById('guests').value;

        alert(`Reservation submitted for ${name}!\n
               Email: ${email}\n
               Date: ${date}\n
               Time: ${time}\n
               Guests: ${guests}\n
               We will contact you shortly to confirm.`);

        // Reset form
        event.target.reset();
    });
}

document.addEventListener('DOMContentLoaded', initializePage);