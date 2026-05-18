// Smooth scroll per tutti i link
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Gestione invio form
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('.btn-submit');
    const originalText = btn.textContent;
    btn.textContent = 'Invio in corso...';
    btn.disabled = true;
    
    setTimeout(() => {
        alert('Grazie per la tua richiesta! Ti contatteremo entro 24 ore.');
        this.reset();
        btn.textContent = originalText;
        btn.disabled = false;
    }, 1500);
});

// Gestione cookie banner
function acceptCookies() {
    localStorage.setItem('cookiesAccepted', 'true');
    document.getElementById('cookieBanner').classList.remove('show');
}

function rejectCookies() {
    localStorage.setItem('cookiesAccepted', 'false');
    document.getElementById('cookieBanner').classList.remove('show');
}

// Mostra cookie banner al caricamento
window.addEventListener('load', function() {
    if (!localStorage.getItem('cookiesAccepted')) {
        setTimeout(() => {
            document.getElementById('cookieBanner').classList.add('show');
        }, 2000);
    }
});
// Mobile Menu Toggle
function toggleMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}

// Chiudi menu mobile quando si clicca un link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('navLinks').classList.remove('active');
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});
// 🚀 Smooth Scroll Premium con Easing Custom (Ottimizzato per PC)
function smoothScrollTo(targetPosition, duration = 850) {
    const start = window.pageYOffset || document.documentElement.scrollTop;
    const distance = targetPosition - start;
    let startTime = null;

    // Curva di easing: easeInOutCubic (partenza morbida, accelerazione, atterraggio dolce)
    function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function animate(currentTime) {
        if (startTime === null) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        window.scrollTo(0, start + distance * easeInOutCubic(progress));
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }
    requestAnimationFrame(animate);
}

// Applica a tutti i link #
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#' || !targetId) return;

        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;

        // Offset dinamico: header + 40px di respiro extra
        const header = document.querySelector('header');
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight - 40;

        smoothScrollTo(targetPosition, 850); // 850ms = velocità perfetta per desktop
    });
});