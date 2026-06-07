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

    // --- 2. SESSION MOCK (Dynamic Content) ---
    // Just display a random session ID for visual testing, no actual auth required
    let sessionToken = localStorage.getItem('mock_session_id');
    if (!sessionToken) {
        sessionToken = 'sess_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('mock_session_id', sessionToken);
    }
    const sessionBadges = document.querySelectorAll('.session-badge');
    if (sessionToken) {
        sessionBadges.forEach(badge => badge.textContent = `Session: ${sessionToken}`);
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
