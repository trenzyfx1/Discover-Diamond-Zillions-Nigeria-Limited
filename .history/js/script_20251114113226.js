<script>
        // Mobile menu toggle
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
    </script>