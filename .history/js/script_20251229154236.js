
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

// --- JavaScript for Modal and Video Playback ---
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
            // Only open the modal if a video path is set
            if (videoUrl) {
                openModal(videoUrl);
            } else {
                console.error("Video URL not set for card:", card.querySelector('.video-title').textContent);
            }
        });
    });
});

/**
 * Opens the video modal and loads the native HTML5 video element.
 * @param {string} url The relative path to the MP4 file (e.g., 'videos/video1.mp4').
 */
function openModal(url) {
    // Construct the video tag with autoplay and controls
    // The 'controls' attribute provides the pause, play, and seek functionality
    const videoHtml = `
            <video 
                width="100%" 
                height="100%" 
                src="${url}" 
                autoplay 
                controls
                playsinline
                class="w-full h-full"
            >
                Your browser does not support the video tag.
            </video>
        `;

    modalContent.innerHTML = videoHtml;
    modal.style.display = 'flex'; // Show the modal
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

/**
 * Closes the video modal and stops video playback.
 */
function closeModal() {
    // Find the video element currently playing
    const videoElement = modalContent.querySelector('video');
    if (videoElement) {
        videoElement.pause(); //    }

    modal.style.display = 'none';
    modalContent.innerHTML = '';
    document.body.style.overflow = '';
}

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
        closeModal();
    }
});