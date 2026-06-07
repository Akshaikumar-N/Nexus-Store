// Global App Logic for E-commerce Testbed

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. CLOCK / TIMESTAMPS (Dynamic Content) ---
    // This constantly updates the DOM every second, challenging visual regressions
    const clockElements = document.querySelectorAll('.dynamic-clock');
    if (clockElements.length > 0) {
        setInterval(() => {
            const now = new Date();
            const timeString = now.toISOString(); // e.g. 2026-06-07T12:00:00.000Z
            clockElements.forEach(el => el.textContent = timeString);
        }, 1000);
    }

    // --- 2. AUTH & SESSION MANAGEMENT ---
    const sessionToken = localStorage.getItem('mock_session_id');
    const isLoginPage = window.location.pathname.includes('login.html');

    // Display session ID if logged in
    const sessionBadges = document.querySelectorAll('.session-badge');
    if (sessionToken) {
        sessionBadges.forEach(badge => badge.textContent = `Session: ${sessionToken}`);
    }

    if (!sessionToken && !isLoginPage) {
        // Redirect to login if not authenticated
        window.location.href = 'login.html';
        return;
    }

    if (sessionToken && isLoginPage) {
        // Redirect away from login if already authenticated
        window.location.href = 'index.html';
        return;
    }

    // Toggle Login/Signup
    const showSignup = document.getElementById('show-signup');
    const showLogin = document.getElementById('show-login');
    const loginContainer = document.getElementById('login-container');
    const signupContainer = document.getElementById('signup-container');

    if (showSignup && showLogin) {
        showSignup.addEventListener('click', (e) => {
            e.preventDefault();
            loginContainer.style.display = 'none';
            signupContainer.style.display = 'block';
        });
        showLogin.addEventListener('click', (e) => {
            e.preventDefault();
            signupContainer.style.display = 'none';
            loginContainer.style.display = 'block';
        });
    }

    // Handle Sign Up
    const signupForm = document.getElementById('mock-signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('signup-email').value.trim().toLowerCase();
            const password = document.getElementById('signup-password').value.trim();
            
            const errorEl = document.getElementById('signup-error');
            errorEl.style.display = 'none';

            let users = JSON.parse(localStorage.getItem('mock_users') || '{}');
            if (users[email]) {
                errorEl.style.display = 'block';
                return;
            }

            // Register user (using btoa to avoid storing plaintext passwords)
            const hashedPassword = btoa(password);
            users[email] = { password: hashedPassword };
            localStorage.setItem('mock_users', JSON.stringify(users));

            // Log them in immediately
            const randomSessionId = 'sess_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('mock_session_id', randomSessionId);
            
            const btn = signupForm.querySelector('button');
            btn.textContent = 'Creating account...';
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 800);
        });
    }

    // Handle Login Form Submission
    const loginForm = document.getElementById('mock-login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value.trim().toLowerCase();
            const password = document.getElementById('password').value.trim();

            const errorEl = document.getElementById('login-error');
            errorEl.style.display = 'none';

            let users = JSON.parse(localStorage.getItem('mock_users') || '{}');
            const hashedPassword = btoa(password);

            if (!users[email] || users[email].password !== hashedPassword) {
                errorEl.style.display = 'block';
                return;
            }

            // Generate a random dynamic session ID
            const randomSessionId = 'sess_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('mock_session_id', randomSessionId);
            // Simulate network delay
            const btn = loginForm.querySelector('button');
            btn.textContent = 'Authenticating...';
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 800);
        });
    }

    // Handle Logout
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('mock_session_id');
            window.location.href = 'login.html';
        });
    }

    // --- 3. LOADING STATES (Dynamic Content) ---
    // Simulates an API fetch delay on page load
    const loadingState = document.getElementById('loading-state');
    if (loadingState) {
        // Random loading time between 500ms and 1500ms
        const delay = Math.floor(Math.random() * 1000) + 500;
        setTimeout(() => {
            loadingState.style.display = 'none';
        }, delay);
    }

    // --- 4. RANDOMIZED PAGE ELEMENTS (Dynamic Content) ---
    // Product Page: Random Viewers
    const viewersCount = document.getElementById('dynamic-viewers');
    if (viewersCount) {
        // Changes on every refresh
        const randomViewers = Math.floor(Math.random() * 50) + 5;
        viewersCount.textContent = `🔥 ${randomViewers} people are currently looking at this item`;
    }

    // Cart Page: Dynamic Delivery Date
    const deliveryEstimate = document.getElementById('dynamic-delivery');
    if (deliveryEstimate) {
        const today = new Date();
        // Randomize delivery days between 2 and 7 days from now
        const daysToAdd = Math.floor(Math.random() * 5) + 2;
        today.setDate(today.getDate() + daysToAdd);
        deliveryEstimate.textContent = `Estimated Delivery: ${today.toDateString()}`;
    }

    // Index Page: Rotating Banner
    const rotatingBanner = document.getElementById('rotating-banner');
    if (rotatingBanner) {
        const banners = [
            "⚡ FLASH SALE: 20% OFF ALL ELECTRONICS",
            "🎉 FREE SHIPPING ON ORDERS OVER $50",
            "🎁 BUY ONE GET ONE FREE - LIMITED TIME"
        ];
        let currentIdx = 0;
        setInterval(() => {
            currentIdx = (currentIdx + 1) % banners.length;
            rotatingBanner.textContent = banners[currentIdx];
        }, 3000); // Changes every 3 seconds
    }
});
