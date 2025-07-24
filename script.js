function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    document.getElementById(pageId).classList.add('active');

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });

    document.querySelectorAll(`[data-page="${pageId}"]`).forEach(link => {
        if (link.classList.contains('nav-link')) {
            link.classList.add('active');
        }
    });

    document.getElementById('mobileMenu').classList.remove('active');
    document.querySelector('.mobile-nav-btn').classList.remove('active');
    window.scrollTo(0, 0);
}

document.querySelectorAll('[data-page]').forEach(element => {
    element.addEventListener('click', (e) => {
        e.preventDefault();
        const pageId = element.getAttribute('data-page');
        showPage(pageId);
    });
});

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileNavBtn = document.querySelector('.mobile-nav-btn');
    mobileMenu.classList.toggle('active');
    mobileNavBtn.classList.toggle('active');
}

document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const button = e.target.querySelector('button[type="submit"]');
    const originalText = button.textContent;

    button.textContent = 'Menghantar...';
    button.disabled = true;

    setTimeout(() => {
        button.textContent = 'Mesej Dihantar!';
        button.style.background = '#10b981';

        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '#f97316';
            button.disabled = false;
            e.target.reset();
        }, 2000);
    }, 1500);
});

document.addEventListener('click', (e) => {
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileNavBtn = document.querySelector('.mobile-nav-btn');

    if (!mobileMenu.contains(e.target) && !mobileNavBtn.contains(e.target)) {
        mobileMenu.classList.remove('active');
        mobileNavBtn.classList.remove('active');
    }
});