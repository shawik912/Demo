window.onload = function() {
    // UI Elements
    const introOverlay = document.getElementById('intro-overlay');
    const introPage = document.getElementById('intro-page');
    const introVideo = document.getElementById('intro-video');
    const loginPage = document.getElementById('login-page');
    const mainPage = document.getElementById('main-page');
    const movieDetailPage = document.getElementById('movie-detail-page');
    const loginButton = document.getElementById('login-button');
    const emailInput = document.getElementById('email-input');
    const passwordInput = document.getElementById('password-input');
    const movieCards = document.querySelectorAll('.movie-card');
    const movieBgImage = document.getElementById('movie-bg-image');
    const movieTitle = document.getElementById('movie-title');
    const movieCaption = document.getElementById('movie-caption');
    const detailBackButton = document.getElementById('detail-back-button');
    const launchDialogueModal = document.getElementById('launch-dialogue-modal');
    const okButton = document.getElementById('ok-button');
    const watchButton = document.getElementById('watch-button');
    const toastMessage = document.getElementById('toast-message');

    // Swipe gesture variables
    let touchstartX = 0;
    let touchendX = 0;

    // Handle click on the intro overlay to start the video
    introOverlay.addEventListener('click', () => {
        // Hide the overlay and show the video container
        introOverlay.classList.add('hidden');
        introPage.classList.remove('hidden');

        // Play the video. The promise is handled to prevent errors in some browsers.
        introVideo.play().catch(e => console.error("Video playback failed:", e));
    });

    // Intro video logic
    introVideo.addEventListener('ended', () => {
        // Fade out the video page and reveal the login page
        introPage.style.opacity = '0';
        setTimeout(() => {
            introPage.classList.add('hidden');
            loginPage.classList.remove('hidden');
        }, 1000); // 1 second for the fade-out transition
    });

    // Function to show and hide the toast message
    const showToast = (message) => {
        toastMessage.innerHTML = message;
        toastMessage.classList.add('show');
        setTimeout(() => {
            toastMessage.classList.remove('show');
        }, 3000); // Hide toast after 3 seconds
    };

    // Login button click handler
    loginButton.addEventListener('click', () => {
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        if (email && password) {
            // Show the launch dialogue box after a successful login
            launchDialogueModal.classList.remove('hidden');
        } else {
            alert('Please enter your email and password.');
        }
    });

    // OK button handler on the launch dialogue box
    okButton.addEventListener('click', () => {
        launchDialogueModal.classList.add('hidden');
        loginPage.classList.add('hidden');
        mainPage.classList.remove('hidden');
    });

    // Movie card click handler
    movieCards.forEach(card => {
        card.addEventListener('click', () => {
            const image = card.getAttribute('data-image');
            const title = card.getAttribute('data-title');
            const caption = "The game will not stop. Defy gravity. Stop at nothing to win.";
            
            movieBgImage.style.backgroundImage = `url('${image}')`;
            movieTitle.textContent = title;
            movieCaption.textContent = caption;

            // Slide in the movie detail page
            movieDetailPage.style.transform = 'translateX(0)';
        });
    });

    // Back button handler to return to the main page
    detailBackButton.addEventListener('click', () => {
        // Slide out the movie detail page
        movieDetailPage.style.transform = 'translateX(100%)';
    });

    // Watch button click handler on the movie detail page
    watchButton.addEventListener('click', () => {
        showToast("The website is still under development contact developers for update whatsapp <a href='https://wa.me/+256758426754' target='_blank' class='text-blue-400 hover:underline'>https://wa.me/+256758426754</a>. Message from Shawik");
    });

    // Swipe back gesture for the movie detail page
    movieDetailPage.addEventListener('touchstart', e => {
        touchstartX = e.changedTouches[0].screenX;
    });

    movieDetailPage.addEventListener('touchend', e => {
        touchendX = e.changedTouches[0].screenX;
        handleGesture();
    });

    function handleGesture() {
        // A swipe to the right with a distance of more than 50 pixels
        if (touchendX > touchstartX && (touchendX - touchstartX > 50)) {
            movieDetailPage.style.transform = 'translateX(100%)';
        }
    }
};
