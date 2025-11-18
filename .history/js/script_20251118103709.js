
const hamb = document.querySelector('.hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamb.addEventListener('click', () => {
    const expanded = hamb.getAttribute('aria-expanded') === 'true' || false;
    hamb.setAttribute('aria-expanded', !expanded);
    if (mobileMenu.hasAttribute('hidden')) {
        mobileMenu.removeAttribute('hidden');
    } else {
        mobileMenu.setAttribute('hidden', '');
    }
});

const modal = document.getElementById('videoModal');
const modalContent = modal.querySelector('.video-modal-content');

document.addEventListener('DOMContentLoaded', () => {
    const videoCards = document.querySelectorAll('.video-card');
    videoCards.forEach(card => {
        // Attach click listener to the entire card
        card.addEventListener('click', (e) => {
            // Prevent navigation if the 'Watch Now' link is clicked directly
            if (e.target.closest('.view-link')) {
                e.preventDefault();
                return;
            }

            const videoUrl = card.getAttribute('data-video-url');
            openModal(videoUrl);
        });
    });
});

/**
 * Opens the video modal and loads the YouTube iframe.
 * @param {string} url The YouTube embed URL.
 */
function openModal(url) {
    // Construct the iframe. Autoplay and controls are enabled in the data-video-url attributes.
    const iframeHtml = `
            <iframe 
                width="100%" 
                height="100%" 
                src="${url}" 
                frameborder="0" 
                allow="autoplay; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen
            ></iframe>
        `;

    modalContent.innerHTML = iframeHtml;
    modal.style.display = 'flex'; // Show the modal
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

/**
 * Closes the video modal and stops video playback.
 */
function closeModal() {
    modal.style.display = 'none'; // Hide the modal
    modalContent.innerHTML = ''; // Remove the iframe to stop playback
    document.body.style.overflow = ''; // Restore scrolling
}

// Close modal when clicking outside the video content
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Close modal using the ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
        closeModal();
    }
});