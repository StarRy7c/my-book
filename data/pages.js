// data/pages.js
// In a real app, image paths and messages would be yours.
// Music per page can be complex; a single background track is simpler.
export const pagesData = [
    { // Page 1 (after cover)
        image: 'assets/images/photo1.jpg',
        message: "Our first ever picture together! Look how young we were. This day was pure magic. ✨",
        decorations: { sparkles: 2, hearts: 1 } // Example
    },
    { // Page 2
        image: 'assets/images/photo2.jpg',
        message: "Remember that hilarious trip to the beach? I still laugh thinking about it! 🌊😂",
        decorations: {}
    },
    { // Page 3
        // No image, just text
        message: "Every moment with you feels like a beautiful dream. Your smile brightens my entire world. 💖",
        decorations: { hearts: 3 }
    },
    // Add more pages as needed...
    // The final "I Love You" page is hardcoded in HTML but could be triggered after the last data page.
];
