function redirectToGoogleCalendar(event) {
    event.preventDefault();  // Prevent the form from submitting

    // Display the thank you message
    document.getElementById('thank-you-message').style.display = 'block';

    // Hide the form
    document.getElementById('appointment-form').style.display = 'none';

    // Redirect to Google Calendar after 3 seconds
    setTimeout(function() {
        window.location.href = 'https://calendar.google.com/calendar/u/0/r';
    }, 3000);
}

// header code 


const navMenu = document.getElementById('nav-menu'),
    toggleMenu = document.getElementById('toggle-menu'),
    closeMenu = document.querySelector('.header__close');

toggleMenu.addEventListener('click', () => {
    navMenu.classList.toggle('show');
});

closeMenu.addEventListener('click', () => {
    navMenu.classList.remove('show');
});


// header code
