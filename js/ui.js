// js/ui.js

// Example: Function to handle the greeting personalization
export function personalizeGreeting(girlfriendName) {
    const greetingElement = document.getElementById('greeting');
    if (greetingElement) {
        greetingElement.textContent = `A Journey Just For You, ${girlfriendName}`;
    } else {
        console.warn("Greeting element not found for personalization.");
    }
}

// Example: Function to setup audio controls (can be moved from main.js)
export function setupAudioControls(audioElement, playPauseButton, volumeSliderElement) {
    if (playPauseButton && audioElement) {
        playPauseButton.addEventListener('click', () => {
            if (audioElement.paused) {
                audioElement.play()
                    .then(() => {
                        playPauseButton.innerHTML = '<img src="assets/icons/pause.svg" alt="Pause">';
                    })
                    .catch(error => console.error("Error playing audio:", error));
            } else {
                audioElement.pause();
                playPauseButton.innerHTML = '<img src="assets/icons/play.svg" alt="Play">';
            }
        });
    }

    if (volumeSliderElement && audioElement) {
        volumeSliderElement.addEventListener('input', (e) => {
            audioElement.volume = e.target.value;
        });
        // Set initial volume display if needed
        audioElement.volume = volumeSliderElement.value;
    }
}


// Add other UI related functions here, for example:
// - Theme switching logic
// - Handling modal pop-ups if you add any
// - Special UI element interactions

console.log("ui.js loaded");
