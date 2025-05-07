// js/scrapbook.js
import { pagesData } from '../data/pages.js';

class Scrapbook {
    constructor(bookElement, prevBtn, nextBtn, finalPageId) {
        this.book = bookElement;
        this.prevBtn = prevBtn;
        this.nextBtn = nextBtn;
        this.finalPageElement = document.getElementById(finalPageId);

        this.pages = []; // To store dynamically created page elements
        this.currentPage = 0; // 0 is the cover
        this.totalPages = 0; // Including cover, data pages, final page, back cover

        this.turnInstance = null; // Placeholder for a library instance like Turn.js

        this._init();
    }

    _init() {
        this._createPagesFromData();
        
        // Advanced: Initialize a page-flip library like Turn.js
        // For example:
        // $(this.book).turn({
        //     width: this.book.clientWidth,
        //     height: this.book.clientHeight,
        //     autoCenter: true,
        //     pages: this.totalPages,
        //     elevation: 50,
        //     gradients: true,
        //     when: {
        //         turning: (event, page, view) => this._handlePageTurn(event, page, view),
        //         turned: (event, page, view) => this._handlePageTurned(event, page, view)
        //     }
        // });
        // this.turnInstance = $(this.book).data().turn;

        // Fallback to simpler navigation if no library
        if (!this.turnInstance) {
            this._setupSimpleNavigation();
            this.pages = Array.from(this.book.querySelectorAll('.page:not(.cover-front):not(.cover-back):not(.final-page-container)'));
            this.coverFront = this.book.querySelector('.cover-front');
            this.coverBack = this.book.querySelector('.cover-back');
            this.allVisualPages = [this.coverFront, ...this.pages, this.finalPageElement, this.coverBack];
            this.totalPages = this.allVisualPages.length;
            this._showCurrentSimplePage();
        }

        this.prevBtn.addEventListener('click', () => this.flipPrev());
        this.nextBtn.addEventListener('click', () => this.flipNext());

        this._updateButtonStates();
    }

    _createPagesFromData() {
        const fragment = document.createDocumentFragment();
        pagesData.forEach((data, index) => {
            const pageDiv = document.createElement('div');
            pageDiv.classList.add('page');
            pageDiv.dataset.pageNumber = index + 1; // 1-based for data pages

            let contentHTML = `<div class="page-content">`;
            if (data.image) {
                contentHTML += `<img src="${data.image}" alt="Memory ${index + 1}">`;
            }
            if (data.message) {
                contentHTML += `<p class="caption">${data.message}</p>`;
            }
            if (data.decorations) {
                contentHTML += `<div class="page-decorations">`;
                if (data.decorations.sparkles) {
                    for (let i = 0; i < data.decorations.sparkles; i++) contentHTML += `<span class="sparkle"></span>`;
                }
                // Add hearts logic here if needed
                contentHTML += `</div>`;
            }
            contentHTML += `</div>`;
            pageDiv.innerHTML = contentHTML;
            fragment.appendChild(pageDiv);
        });

        // Insert before the final page
        this.book.insertBefore(fragment, this.finalPageElement);
    }

    _setupSimpleNavigation() {
        this.allVisualPages.forEach((p, i) => {
            if (i !== this.currentPage) p.classList.add('hidden');
            else p.classList.remove('hidden');
        });
    }

    _showCurrentSimplePage() {
        this.allVisualPages.forEach((p, i) => {
            if (i === this.currentPage) {
                p.classList.remove('hidden');
                p.style.opacity = '0';
                p.style.transform = 'scale(0.95)';
                // Simple fade-in animation
                setTimeout(() => {
                    p.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    p.style.opacity = '1';
                    p.style.transform = 'scale(1)';
                }, 50); // Small delay to ensure transition applies
            } else {
                p.classList.add('hidden');
                p.style.opacity = '0';
                p.style.transform = 'scale(1)'; // Reset transform
            }
        });

        if (this.allVisualPages[this.currentPage] === this.finalPageElement) {
            this._triggerFinalSurprise();
        } else {
            this._resetFinalSurprise();
        }
        this._updateButtonStates();
    }
    
    flipNext() {
        if (this.turnInstance) {
            // this.turnInstance.next();
        } else if (this.currentPage < this.totalPages - 1) {
            this.currentPage++;
            this._showCurrentSimplePage();
        }
    }

    flipPrev() {
        if (this.turnInstance) {
            // this.turnInstance.previous();
        } else if (this.currentPage > 0) {
            this.currentPage--;
            this._showCurrentSimplePage();
        }
    }

    // _handlePageTurn(event, page, view) {
    //     // Logic when a page starts turning with Turn.js
    //     console.log(`Turning to page ${page}`);
    //     this.currentPage = page; 
    //     // Disable buttons during turn
    //     this.prevBtn.disabled = true;
    //     this.nextBtn.disabled = true;
    // }

    // _handlePageTurned(event, page, view) {
    //     // Logic after a page has turned with Turn.js
    //     this._updateButtonStates();
    //     if (page === this.totalPages -1) { // Assuming final page is before back cover
    //         this._triggerFinalSurprise();
    //     } else {
    //         this._resetFinalSurprise();
    //     }
    //     // Re-enable buttons
    //     this.prevBtn.disabled = false;
    //     this.nextBtn.disabled = false;
    // }

    _updateButtonStates() {
        if (this.turnInstance) {
            // const currentPage = this.turnInstance.page();
            // this.prevBtn.disabled = currentPage <= 1;
            // this.nextBtn.disabled = currentPage >= this.turnInstance.totalPages();
        } else {
            this.prevBtn.disabled = this.currentPage === 0;
            this.nextBtn.disabled = this.currentPage === this.totalPages - 1;
        }
    }

    _triggerFinalSurprise() {
        const finalAnimationContainer = this.finalPageElement.querySelector('#final-surprise-animation');
        if (finalAnimationContainer) {
            finalAnimationContainer.innerHTML = ''; // Clear previous if any
            
            // Example: Blooming Flower
            const flower = document.createElement('div');
            flower.className = 'flower';
            let petalsHTML = '';
            for (let i = 1; i <= 6; i++) {
                petalsHTML += `<div class="petal petal-${i}" style="--initial-rotate: ${ (i-1) * 60 }deg; --final-rotate: ${ (i-1) * 60 }deg;"></div>`;
            }
            flower.innerHTML = petalsHTML + '<div class="center"></div>';
            finalAnimationContainer.appendChild(flower);
            
            // Trigger reflow for animations
            void flower.offsetWidth; 
            flower.classList.add('bloom'); // Add a class to start coordinated animations if needed beyond CSS @keyframes
        }
        console.log("Final surprise triggered!");
    }

    _resetFinalSurprise() {
        // Logic to reset animation if user navigates away
        const finalAnimationContainer = this.finalPageElement.querySelector('#final-surprise-animation');
        if (finalAnimationContainer) {
            finalAnimationContainer.innerHTML = ''; // Clear the animation
            // Re-add initial structure if needed for re-triggering.
            // For simplicity, we clear. Re-triggering complex CSS animations
            // often requires careful class management or element recreation.
            const flowerStructure = `
                <div class="flower">
                    <div class="petal petal-1"></div> <div class="petal petal-2"></div>
                    <div class="petal petal-3"></div> <div class="petal petal-4"></div>
                    <div class="petal petal-5"></div> <div class="petal petal-6"></div>
                    <div class="center"></div>
                </div>`;
            finalAnimationContainer.innerHTML = flowerStructure;
             // Make sure it's hidden initially if CSS doesn't handle it
            const flowerDiv = finalAnimationContainer.querySelector('.flower');
            if(flowerDiv) {
                flowerDiv.style.transform = 'scale(0)';
                flowerDiv.style.opacity = '0';
            }
        }
    }

    getCurrentPageNumber() {
        return this.turnInstance ? this.turnInstance.page() : this.currentPage;
    }
}

export default Scrapbook;
      
