// js/main.js
import Scrapbook from './scrapbook.js';

document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const appContainer = document.getElementById('app-container');
    const girlfriendName = "My Love"; // Personalize this!
    document.getElementById('greeting').textContent = `A Journey Just For You, ${girlfriendName}`;

    // Simulate loading time
    setTimeout(() => {
        loadingScreen.style.display = 'none';
        appContainer.style.display = 'block';
    }, 1500); // Adjust as needed

    const homepage = document.getElementById('homepage');
    const scrapbookContainer = document.getElementById('scrapbook-container');
    const startJourneyBtn = document.getElementById('start-journey-btn');

    const bookElement = document.getElementById('scrapbook');
    const prevBtn = document.getElementById('prev-page-btn');
    const nextBtn = document.getElementById('next-page-btn');
    
    let scrapbookInstance = null;

    startJourneyBtn.addEventListener('click', () => {
        homepage.classList.add('hidden');
        scrapbookContainer.classList.remove('hidden');
        if (!scrapbookInstance) {
            scrapbookInstance = new Scrapbook(bookElement, prevBtn, nextBtn, 'final-page');
        }
        // Start background music (if not autoplaying)
        const audio = document.getElementById('background-audio');
        if (audio.paused) {
             audio.play().catch(e => console.warn("Autoplay prevented:", e));
        }
    });

    // Audio Controls
    const audio = document.getElementById('background-audio');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const volumeSlider = document.getElementById('volume-slider');
    const playIcon = 'assets/icons/play.svg'; // Path to your play icon
    const pauseIcon = 'assets/icons/pause.svg'; // Path to your pause icon

    playPauseBtn.addEventListener('click', () => {
        const iconImg = playPauseBtn.querySelector('img');
        if (audio.paused) {
            audio.play();
            iconImg.src = pauseIcon;
            iconImg.alt = "Pause";
            playPauseBtn.setAttribute('aria-label', 'Pause Music');
        } else {
            audio.pause();
            iconImg.src = playIcon;
            iconImg.alt = "Play";
            playPauseBtn.setAttribute('aria-label', 'Play Music');
        }
    });

    audio.addEventListener('play', () => {
        const iconImg = playPauseBtn.querySelector('img');
        iconImg.src = pauseIcon;
        iconImg.alt = "Pause";
        playPauseBtn.setAttribute('aria-label', 'Pause Music');
    });
    audio.addEventListener('pause', () => {
        const iconImg = playPauseBtn.querySelector('img');
        iconImg.src = playIcon;
        iconImg.alt = "Play";
        playPauseBtn.setAttribute('aria-label', 'Play Music');
    });

    volumeSlider.addEventListener('input', (e) => {
        audio.volume = e.target.value;
    });

    // Theme switcher (example)
    // You could add buttons to switch themes
    // const themeSwitchBtn = document.getElementById('theme-switch-btn');
    // themeSwitchBtn.addEventListener('click', () => {
    //    document.body.classList.toggle('theme-starry-night');
    //    document.body.classList.toggle('theme-pastel-dream');
    // });
});

// Advanced Tip: Use a library like imagesLoaded to wait for all images before hiding loading screen.
// For true page-flip, you would download Turn.js or StPageFlip, include their JS/CSS,
// and then initialize it in scrapbook.js.
// Example with Turn.js (you'd need jQuery and Turn.js included in your HTML):
// $(document).ready(function() {
//      $('#scrapbook').turn({display: 'double', acceleration: true, gradients: true, elevation:50, when: {turned: function(e, page) {console.log('Current view: ', $(this).turn('view'));}}});
// });
// $('#prev-page-btn').click(function(){ $('#scrapbook').turn('previous'); });
// $('#next-page-btn').click(function(){ $('#scrapbook').turn('next'); });
