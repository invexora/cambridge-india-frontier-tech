/**
 * Cambridge–India Frontier Technology Network - Slidable Controller
 */

document.addEventListener('DOMContentLoaded', () => {
    initSlideCarousel();
    initPaperImageCarousel();
    initModalsAndForms();
    initCostBarAnimation();
});

/* --------------------------------------------------------------------------
   Presentation Slide Deck Carousel Engine (6 Slides)
   -------------------------------------------------------------------------- */
let currentSlideIdx = 1;
const totalSlidesCount = 6;

function initSlideCarousel() {
    const prevBtn = document.getElementById('slidePrev');
    const nextBtn = document.getElementById('slideNext');
    const dots = document.querySelectorAll('.dot-btn');

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            const nextIdx = currentSlideIdx > 1 ? currentSlideIdx - 1 : totalSlidesCount;
            goToSlide(nextIdx);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const nextIdx = currentSlideIdx < totalSlidesCount ? currentSlideIdx + 1 : 1;
            goToSlide(nextIdx);
        });
    }

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const target = parseInt(dot.getAttribute('data-slide'), 10);
            goToSlide(target);
        });
    });
}

function goToSlide(index) {
    currentSlideIdx = index;
    const img = document.getElementById('carouselSlideImg');
    const text = document.getElementById('slideCounterText');
    const dots = document.querySelectorAll('.dot-btn');

    if (img) {
        img.style.opacity = '0';
        setTimeout(() => {
            img.src = `slide-${index}.png`;
            img.style.opacity = '1';
        }, 150);
    }

    if (text) {
        text.textContent = `Slide ${index} of ${totalSlidesCount}`;
    }

    dots.forEach(dot => {
        const dIdx = parseInt(dot.getAttribute('data-slide'), 10);
        if (dIdx === index) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

/* --------------------------------------------------------------------------
   Discussion Paper Page Image Carousel Engine (3 Pages)
   -------------------------------------------------------------------------- */
let currentPaperPageIdx = 1;
const totalPaperPages = 3;

function initPaperImageCarousel() {
    const prevBtn = document.getElementById('paperPagePrev');
    const nextBtn = document.getElementById('paperPageNext');
    const dots = document.querySelectorAll('.pdot-btn');

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            const nextIdx = currentPaperPageIdx > 1 ? currentPaperPageIdx - 1 : totalPaperPages;
            goToPaperPage(nextIdx);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const nextIdx = currentPaperPageIdx < totalPaperPages ? currentPaperPageIdx + 1 : 1;
            goToPaperPage(nextIdx);
        });
    }

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const target = parseInt(dot.getAttribute('data-pslide'), 10);
            goToPaperPage(target);
        });
    });
}

function goToPaperPage(index) {
    currentPaperPageIdx = index;
    const img = document.getElementById('carouselPaperImg');
    const text = document.getElementById('paperCounterText');
    const dots = document.querySelectorAll('.pdot-btn');

    if (img) {
        img.style.opacity = '0';
        setTimeout(() => {
            img.src = `paper-page-${index}.png`;
            img.style.opacity = '1';
        }, 150);
    }

    if (text) {
        text.textContent = `Page ${index} of ${totalPaperPages}`;
    }

    dots.forEach(dot => {
        const dIdx = parseInt(dot.getAttribute('data-pslide'), 10);
        if (dIdx === index) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

/* --------------------------------------------------------------------------
   Modals & Forms
   -------------------------------------------------------------------------- */
function initModalsAndForms() {
    const inviteModal = document.getElementById('inviteModal');
    const openInviteBtn = document.getElementById('openInviteBtn');
    const openInviteBtn2 = document.getElementById('openInviteBtn2');
    const openInviteBtn3 = document.getElementById('openInviteBtn3');
    const closeInviteBtn = document.getElementById('closeInviteBtn');
    const inviteForm = document.getElementById('inviteForm');

    const openInvite = (e) => {
        if (e) e.preventDefault();
        inviteModal.classList.add('active');
    };
    const closeInvite = () => inviteModal.classList.remove('active');

    if (openInviteBtn) openInviteBtn.addEventListener('click', openInvite);
    if (openInviteBtn2) openInviteBtn2.addEventListener('click', openInvite);
    if (openInviteBtn3) openInviteBtn3.addEventListener('click', openInvite);
    if (closeInviteBtn) closeInviteBtn.addEventListener('click', closeInvite);

    if (inviteForm) {
        inviteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            closeInvite();
            showToast('Application Submitted! Welcome to the Network.');
            inviteForm.reset();
        });
    }
}

function showToast(message) {
    const toast = document.getElementById('toast');
    const msgElem = document.getElementById('toastMessage');
    if (!toast || !msgElem) return;

    msgElem.textContent = message;
    toast.classList.add('active');
    setTimeout(() => {
        toast.classList.remove('active');
    }, 3500);
}

function initCostBarAnimation() {
    const bars = document.querySelectorAll('.cost__bar');
    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.style.width = e.target.style.getPropertyValue('--w');
                }
            });
        }, { threshold: 0.2 });
        bars.forEach(b => io.observe(b));
    }
}
