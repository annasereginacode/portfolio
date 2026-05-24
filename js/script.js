document.addEventListener('DOMContentLoaded', () => {
    // Mark active nav link based on the current page.
    const navLinks = document.querySelectorAll('.site-nav__links a');
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    navLinks.forEach((link) => {
        const linkPath = link.getAttribute('href').split('/').pop();
        if (linkPath === currentPath) {
            link.classList.add('is-active');
            link.setAttribute('aria-current', 'page');
        }
    });

    // Mobile nav toggle with focus/keyboard management.
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.querySelector('.site-nav__links');
    const nav = document.querySelector('.site-nav');

    if (toggle && menu) {
        const closeMenu = ({ returnFocus = false } = {}) => {
            if (!menu.classList.contains('is-open')) return;
            menu.classList.remove('is-open');
            toggle.setAttribute('aria-expanded', 'false');
            if (returnFocus) toggle.focus();
        };

        toggle.addEventListener('click', () => {
            const open = menu.classList.toggle('is-open');
            toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        });

        menu.addEventListener('click', (event) => {
            if (event.target.tagName === 'A') closeMenu();
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') closeMenu({ returnFocus: true });
        });

        document.addEventListener('click', (event) => {
            if (!nav.contains(event.target) && menu.classList.contains('is-open')) {
                closeMenu();
            }
        });
    }

    // Hero role line: rotate through phrases with a blinking caret.
    const roleEl = document.querySelector('[data-role-rotate]');
    if (roleEl && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const phrases = JSON.parse(roleEl.dataset.roleRotate || '[]');
        if (phrases.length > 1) {
            const textNode = roleEl.querySelector('.role-text');
            let phraseIdx = 0;
            let charIdx = phrases[0].length;
            let deleting = false;

            const tick = () => {
                const current = phrases[phraseIdx];
                if (!deleting) {
                    charIdx++;
                    textNode.textContent = current.slice(0, charIdx);
                    if (charIdx === current.length) {
                        deleting = true;
                        setTimeout(tick, 1800);
                        return;
                    }
                    setTimeout(tick, 55);
                } else {
                    charIdx--;
                    textNode.textContent = current.slice(0, charIdx);
                    if (charIdx === 0) {
                        deleting = false;
                        phraseIdx = (phraseIdx + 1) % phrases.length;
                        setTimeout(tick, 350);
                        return;
                    }
                    setTimeout(tick, 28);
                }
            };

            setTimeout(tick, 2200);
        }
    }
});
