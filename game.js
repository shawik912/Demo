document.addEventListener('DOMContentLoaded', () => {
    // UI Elements
    const followerCountEl = document.getElementById('follower-count');
    const progressBarFill = document.getElementById('progress-fill');
    const tiktokUsernameInput = document.getElementById('tiktok-username');
    const registerButton = document.getElementById('register-button');
    const messageContainer = document.getElementById('message-container');
    const finalAlertModal = document.getElementById('final-alert-modal');

    // Constants
    const GOAL_COUNT = 10000;
    const INCREMENT_AMOUNT = 45;
    const INCREMENT_INTERVAL_MS = 60000; // 1 minute
    const LOCAL_STORAGE_KEY_USERNAME = 'afkd_username';

    // State
    let currentFollowers = 8919;
    let registeredUsernames = JSON.parse(localStorage.getItem('registeredUsernames')) || [];
    let isRegisteredOnThisDevice = localStorage.getItem(LOCAL_STORAGE_KEY_USERNAME) !== null;

    // --- Core Functions ---

    // Function to update the follower count and progress bar
    const updateFollowerCount = () => {
        followerCountEl.textContent = currentFollowers.toLocaleString();
        const progress = (currentFollowers / GOAL_COUNT) * 100;
        progressBarFill.style.width = `${Math.min(progress, 100)}%`;

        if (currentFollowers >= GOAL_COUNT) {
            clearInterval(followerInterval);
            showFinalAlert();
        }
    };

    // Function to display messages to the user
    const showMessage = (text, type) => {
        messageContainer.textContent = text;
        messageContainer.className = `mt-4 text-center text-sm ${type}`;
    };

    // Function to handle registration logic
    const handleRegistration = () => {
        const username = tiktokUsernameInput.value.trim();

        if (username === '') {
            showMessage('Please enter your TikTok username.', 'error');
            return;
        }

        if (registeredUsernames.includes(username)) {
            showMessage('This username has already been registered on another device.', 'error');
            return;
        }
        
        // This simulates registration. In a real app, this would be a database call.
        registeredUsernames.push(username);
        localStorage.setItem('registeredUsernames', JSON.stringify(registeredUsernames));
        localStorage.setItem(LOCAL_STORAGE_KEY_USERNAME, username);
        isRegisteredOnThisDevice = true;

        showMessage('Registered successfully!', 'success');
        tiktokUsernameInput.disabled = true;
        registerButton.disabled = true;
        registerButton.textContent = 'Registered';

        // Add 1 to the count for the new registration
        currentFollowers += 1;
        updateFollowerCount();
    };
    
    // Function to show the final 10k alert
    const showFinalAlert = () => {
        if (isRegisteredOnThisDevice) {
            finalAlertModal.classList.remove('hidden');
        }
    };
    
    // --- Initial Setup and Event Listeners ---

    // Check if the device has already registered
    if (isRegisteredOnThisDevice) {
        showMessage(`You are already registered as "${localStorage.getItem(LOCAL_STORAGE_KEY_USERNAME)}".`, 'success');
        tiktokUsernameInput.value = localStorage.getItem(LOCAL_STORAGE_KEY_USERNAME);
        tiktokUsernameInput.disabled = true;
        registerButton.disabled = true;
        registerButton.textContent = 'Registered';
    }

    // Set initial follower count
    updateFollowerCount();

    // Start the follower counter increment
    const followerInterval = setInterval(() => {
        currentFollowers += INCREMENT_AMOUNT;
        updateFollowerCount();
    }, INCREMENT_INTERVAL_MS);

    // Register button event listener
    registerButton.addEventListener('click', handleRegistration);
});
