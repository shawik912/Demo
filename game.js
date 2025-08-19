window.onload = function() {
    // UI Elements
    const introOverlay = document.getElementById('intro-overlay');
    const introPage = document.getElementById('intro-page');
    const introVideo = document.getElementById('intro-video');
    const skipIntroButton = document.getElementById('skip-intro-button');
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

    // Swipe gesture variables
    let touchstartX = 0;
    let touchendX = 0;

    // --- 3D Star Animation ---
    const starCanvas = document.getElementById('star-canvas');
    let starScene, starCamera, starRenderer;
    const stars = [];

    const initStars = () => {
        // Scene setup
        starScene = new THREE.Scene();
        starCamera = new THREE.PerspectiveCamera(75, starCanvas.clientWidth / starCanvas.clientHeight, 0.1, 1000);
        starRenderer = new THREE.WebGLRenderer({ canvas: starCanvas, alpha: true });
        starRenderer.setSize(starCanvas.clientWidth, starCanvas.clientHeight);
        starCamera.position.z = 2;

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        starScene.add(ambientLight);
        const pointLight = new THREE.PointLight(0xffd700, 1);
        pointLight.position.set(0, 0, 5);
        starScene.add(pointLight);

        // Create 5 stars
        const starShape = new THREE.Shape();
        const outerRadius = 0.5;
        const innerRadius = 0.2;
        starShape.moveTo(outerRadius, 0);
        for (let i = 0; i < 5; i++) {
            const angle = (i * 72 - 90) * Math.PI / 180;
            starShape.lineTo(outerRadius * Math.cos(angle), outerRadius * Math.sin(angle));
            const innerAngle = ((i * 72) + 36 - 90) * Math.PI / 180;
            starShape.lineTo(innerRadius * Math.cos(innerAngle), innerRadius * Math.sin(innerAngle));
        }

        const extrudeSettings = { depth: 0.1, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 0.05, bevelThickness: 0.05 };
        const starGeometry = new THREE.ExtrudeGeometry(starShape, extrudeSettings);
        const starMaterial = new THREE.MeshStandardMaterial({
            color: 0xffd700, // Gold color
            emissive: 0xffd700,
            emissiveIntensity: 0.8,
            metalness: 0.8,
            roughness: 0.2
        });

        for (let i = 0; i < 5; i++) {
            const star = new THREE.Mesh(starGeometry, starMaterial);
            star.position.x = -1.5 + i * 0.7; // Position the stars horizontally
            starScene.add(star);
            stars.push(star);
        }

        // Animation loop for stars
        const starClock = new THREE.Clock();
        const animateStars = () => {
            const elapsedTime = starClock.getElapsedTime();
            stars.forEach(star => {
                star.rotation.x = elapsedTime * 0.5;
                star.rotation.y = elapsedTime * 0.5;
            });
            starRenderer.render(starScene, starCamera);
            requestAnimationFrame(animateStars);
        };
        animateStars();
    };

    // --- UI Logic ---

    // Handle click on the intro overlay to start the video
    introOverlay.addEventListener('click', () => {
        introOverlay.classList.add('hidden');
        introPage.classList.remove('hidden');
        introVideo.play().catch(e => console.error("Video playback failed:", e));
    });

    // Intro video logic
    introVideo.addEventListener('ended', () => {
        introPage.style.opacity = '0';
        setTimeout(() => {
            introPage.classList.add('hidden');
            loginPage.classList.remove('hidden');
        }, 1000); // 1 second for the fade-out transition
    });

    // Skip intro button logic
    skipIntroButton.addEventListener('click', () => {
        introVideo.pause();
        introPage.classList.add('hidden');
        loginPage.classList.remove('hidden');
    });

    // Login button click handler
    loginButton.addEventListener('click', () => {
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        if (email && password) {
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

            movieDetailPage.style.transform = 'translateX(0)';
            initStars(); // Initialize and start the 3D stars animation
        });
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
        if (touchendX > touchstartX && (touchendX - touchstartX > 50)) {
            // Swipe Right to go back
            movieDetailPage.style.transform = 'translateX(100%)';
        }
    }

    // Back button handler for movie details
    detailBackButton.addEventListener('click', () => {
        movieDetailPage.style.transform = 'translateX(100%)';
    });
};
