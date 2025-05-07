// js/animations.js

// Example: Function to trigger an animation when an element is in view
export function animateOnScroll(elementSelector, animationClass) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add(animationClass);
                // Optional: unobserve after animation to save resources
                // observer.unobserve(entry.target);
            } else {
                // Optional: remove class if you want animation to repeat
                // entry.target.classList.remove(animationClass);
            }
        });
    }, { threshold: 0.5 }); // Trigger when 50% of the element is visible

    const elements = document.querySelectorAll(elementSelector);
    elements.forEach(el => observer.observe(el));
}

// Example: Placeholder for the final surprise fireworks (if JS driven)
export function triggerFireworks() {
    const finalSurpriseContainer = document.getElementById('final-surprise-animation');
    if (finalSurpriseContainer) {
        console.log("Triggering JS fireworks animation (implementation pending)...");
        // Here you would add code to create and animate particle elements
        // For example, adding a class that starts a CSS animation or using Canvas.
        finalSurpriseContainer.classList.add('fireworks-active'); // Assuming you have CSS for this
    }
}

// Function to add dynamic sparkles or hearts to a page (can be expanded)
export function addPageDecorations(pageElement, decorations) {
    if (!pageElement || !decorations) return;

    const pageContent = pageElement.querySelector('.page-content');
    if (!pageContent) return;

    if (decorations.sparkles) {
        for (let i = 0; i < decorations.sparkles; i++) {
            const sparkle = document.createElement('div');
            sparkle.classList.add('sparkle');
            // Random positioning (ensure parent is position:relative or absolute)
            sparkle.style.top = `${Math.random() * 80 + 10}%`;
            sparkle.style.left = `${Math.random() * 80 + 10}%`;
            sparkle.style.animationDelay = `${Math.random() * 1.5}s`; // Randomize start
            pageContent.appendChild(sparkle);
        }
    }
    if (decorations.hearts) {
         for (let i = 0; i < decorations.hearts; i++) {
            const heart = document.createElement('div');
            heart.classList.add('decorative-heart'); // Use the class from previous CSS
            heart.style.top = `${Math.random() * 80 + 10}%`;
            heart.style.left = `${Math.random() * 80 + 10}%`;
            // Add animation if you have one for .decorative-heart
            pageContent.appendChild(heart);
        }
    }
}


console.log("animations.js loaded");
