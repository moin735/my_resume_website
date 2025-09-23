// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const id = a.getAttribute('href');
        if (id.length > 1) {
            e.preventDefault();
            document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Typing effect for name text
(function typeEffect() {
    const el = document.getElementById('typeTarget');
    if (!el) return; // Prevent error if element is missing
    const words = ['MD. MOINUR REZA', 'a Software Developer', 'a Web Developer', 'here to serve you.'];
    let i = 0,
        j = 0,
        deleting = false;

    function tick() {
        const word = words[i];
        j += deleting ? -1 : 1;
        el.textContent = word.slice(0, j);
        if (!deleting && j === word.length) {
            deleting = true;
            setTimeout(tick, 1300);
            return;
        }
        if (deleting && j === 0) {
            deleting = false;
            i = (i + 1) % words.length;
        }
        setTimeout(tick, deleting ? 50 : 90);
    }
    tick();
})();

// Reveal on scroll
const io = new IntersectionObserver(entries => {
    entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('revealed'));
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Theme toggle with localStorage
const toggle = document.getElementById('themeToggle');
if (toggle) {
    const applyTheme = (t) => {
        document.documentElement.classList.toggle('light', t === 'light');
        toggle.textContent = t === 'light' ? '☀️' : '🌙';
    };
    const saved = localStorage.getItem('theme') || 'dark';
    applyTheme(saved);
    toggle.addEventListener('click', () => {
        const next = document.documentElement.classList.contains('light') ? 'dark' : 'light';
        applyTheme(next);
        localStorage.setItem('theme', next);
    });
}

// Contact form (Formspree integration)
const form = document.getElementById('contactForm');
if (form) {
    form.addEventListener('submit', async(e) => {
        e.preventDefault();
        const status = document.getElementById('formStatus');
        status.textContent = 'Sending...';
        const data = new FormData(form);
        try {
            const res = await fetch('https://formspree.io/f/xeolajap', {
                method: 'POST',
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });
            if (res.ok) {
                status.textContent = 'Thanks! Your message has been sent.';
                form.reset();
            } else {
                const result = await res.json();
                status.textContent = result.errors ? result.errors.map(e => e.message).join(', ') : 'Oops! Something went wrong.';
            }
        } catch (err) {
            status.textContent = 'Network error. Please try again.';
        }
    });
}

// Highlight contact section and show phone number when navigated to
window.addEventListener('hashchange', () => {
    if (location.hash === '#contact') {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.classList.add('highlight-contact');
            setTimeout(() => contactSection.classList.remove('highlight-contact'), 1200);
        }
        const phone = document.getElementById('phoneNumber');
        if (phone) {
            phone.style.display = 'block';
            phone.classList.add('show-phone');
            setTimeout(() => {
                phone.style.display = 'none';
                phone.classList.remove('show-phone');
            }, 4000);
        }
    }
});

// Also show phone number when 'Contact me' button is clicked directly
const contactBtn = document.querySelector('.btn-ghost[href="#contact"]');
if (contactBtn) {
    contactBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // Remove any conflicting hashchange listeners for this button
        window.removeEventListener('hashchange', () => {});
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
            contactSection.classList.add('highlight-contact');
            setTimeout(() => contactSection.classList.remove('highlight-contact'), 1200);
        }
        setTimeout(() => {
            const phone = document.getElementById('phoneNumber');
            if (phone) {
                phone.style.display = 'block';
                phone.classList.add('show-phone');
                setTimeout(() => {
                    phone.style.display = 'none';
                    phone.classList.remove('show-phone');
                }, 12000);
            }
        }, 600); // Wait for scroll animation
    });
}

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}

// CSS for .btn-ghost class
const style = document.createElement('style');
style.textContent = `
.btn-ghost {
  pointer-events: auto;
  cursor: pointer;
}
`;
document.head.append(style);

// Ensure all social links are clickable
const socialLinks = document.querySelectorAll('.social a');
socialLinks.forEach(link => {
    link.style.pointerEvents = 'auto';
    link.style.cursor = 'pointer';
});