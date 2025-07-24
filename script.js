function loadPage(pageId) {
    const pageContent = document.getElementById('pageContent');
    const pageFiles = {
        home: 'home.html',
        landing: 'landing.html',
        webapp: 'webapp.html',
        interactivelink: 'interactivelink.html',
        contact: 'contact.html'
    };

    // Remove active class from all nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });

    // Add active class to the clicked nav link
    document.querySelectorAll(`[data-page="${pageId}"]`).forEach(link => {
        if (link.classList.contains('nav-link')) {
            link.classList.add('active');
        }
    });

    // Fetch and load the page content
    fetch(pageFiles[pageId])
        .then(response => {
            if (!response.ok) throw new Error('Failed to load page');
            return response.text();
        })
        .then(data => {
            pageContent.innerHTML = data;
            pageContent.classList.add('active');

            // Reattach event listeners for dynamically loaded content
            attachDynamicEventListeners(pageId);

            // Close mobile menu
            document.getElementById('mobileMenu').classList.remove('active');
            document.querySelector('.mobile-nav-btn').classList.remove('active');
            window.scrollTo(0, 0);
        })
        .catch(error => {
            console.error('Error loading page:', error);
            pageContent.innerHTML = '<p class="text-center text-red-600">Maaf, halaman gagal dimuat. Sila cuba lagi.</p>';
        });
}

function attachDynamicEventListeners(pageId) {
    // Reattach click event listeners for navigation links in dynamically loaded content
    document.querySelectorAll('[data-page]').forEach(element => {
        element.removeEventListener('click', handlePageClick); // Prevent duplicate listeners
        element.addEventListener('click', handlePageClick);
    });

    // Reattach form submit listener for contact page
    if (pageId === 'contact') {
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.removeEventListener('submit', handleFormSubmit); // Prevent duplicate listeners
            contactForm.addEventListener('submit', handleFormSubmit);
        }
    }
}

function handlePageClick(e) {
    e.preventDefault();
    const pageId = e.currentTarget.getAttribute('data-page');
    loadPage(pageId);
}

function handleFormSubmit(e) {
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
}

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileNavBtn = document.querySelector('.mobile-nav-btn');
    mobileMenu.classList.toggle('active');
    mobileNavBtn.classList.toggle('active');
}

// Initial page load
document.addEventListener('DOMContentLoaded', () => {
    loadPage('home'); // Load home page by default

    // Attach click event listeners for navigation
    document.querySelectorAll('[data-page]').forEach(element => {
        element.addEventListener('click', handlePageClick);
    });

    // Close mobile menu on outside click
    document.addEventListener('click', (e) => {
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileNavBtn = document.querySelector('.mobile-nav-btn');

        if (!mobileMenu.contains(e.target) && !mobileNavBtn.contains(e.target)) {
            mobileMenu.classList.remove('active');
            mobileNavBtn.classList.remove('active');
        }
    });

    // Close mobile menu on window resize to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 640) {
            document.getElementById('mobileMenu').classList.remove('active');
            document.querySelector('.mobile-nav-btn').classList.remove('active');
        }
    });
});