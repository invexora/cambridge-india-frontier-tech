/**
 * Cambridge–India Frontier Technology Network - Compact Slidable Controller
 */

document.addEventListener('DOMContentLoaded', () => {
    initSlideCarousel();
    initPaperCarousel();
    initVideoPlayer();
    initModalsAndForms();
    initCostBarAnimation();
});

/* --------------------------------------------------------------------------
   Presentation Slide Deck Carousel Engine
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
   Paper Highlights Carousel Engine
   -------------------------------------------------------------------------- */
let currentPaperIdx = 1;
const totalPaperSlides = 3;

function initPaperCarousel() {
    const prevBtn = document.getElementById('paperPrev');
    const nextBtn = document.getElementById('paperNext');

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            const nextIdx = currentPaperIdx > 1 ? currentPaperIdx - 1 : totalPaperSlides;
            goToPaperSlide(nextIdx);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const nextIdx = currentPaperIdx < totalPaperSlides ? currentPaperIdx + 1 : 1;
            goToPaperSlide(nextIdx);
        });
    }
}

function goToPaperSlide(index) {
    currentPaperIdx = index;
    const slides = document.querySelectorAll('.paper-slide');
    const text = document.getElementById('paperSlideText');

    slides.forEach(s => {
        const sIdx = parseInt(s.getAttribute('data-pslide'), 10);
        if (sIdx === index) {
            s.classList.add('active');
        } else {
            s.classList.remove('active');
        }
    });

    if (text) {
        text.textContent = `Summary ${index} of ${totalPaperSlides}`;
    }
}

/* --------------------------------------------------------------------------
   Video Broadcast Controls
   -------------------------------------------------------------------------- */
let isPlaying = false;
let currentTimeSec = 0;
const totalDurationSec = 3594;
let videoInterval = null;

function initVideoPlayer() {
    const playBtn = document.getElementById('playVideoBtn');
    const btnPlayPause = document.getElementById('btnPlayPause');
    const btnMute = document.getElementById('btnMute');

    if (playBtn) playBtn.addEventListener('click', startSimulatedVideo);
    if (btnPlayPause) btnPlayPause.addEventListener('click', togglePlayPause);
    if (btnMute) {
        btnMute.addEventListener('click', () => {
            btnMute.textContent = btnMute.textContent === '🔊' ? '🔇' : '🔊';
        });
    }

    const chapterBtns = document.querySelectorAll('.chip-btn');
    chapterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            chapterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const time = parseInt(btn.getAttribute('data-time'), 10);
            seekVideoTo(time);
        });
    });
}

function startSimulatedVideo() {
    const overlay = document.getElementById('videoOverlay');
    if (overlay) overlay.classList.add('hidden');
    isPlaying = true;
    updatePlayPauseButton();
    runVideoTimer();
}

function togglePlayPause() {
    const overlay = document.getElementById('videoOverlay');
    if (overlay) overlay.classList.add('hidden');
    isPlaying = !isPlaying;
    updatePlayPauseButton();
    if (isPlaying) {
        runVideoTimer();
    } else {
        clearInterval(videoInterval);
    }
}

function updatePlayPauseButton() {
    const btnPlayPause = document.getElementById('btnPlayPause');
    if (btnPlayPause) btnPlayPause.textContent = isPlaying ? '⏸' : '▶';
}

function seekVideoTo(seconds) {
    currentTimeSec = seconds;
    const overlay = document.getElementById('videoOverlay');
    if (overlay) overlay.classList.add('hidden');
    isPlaying = true;
    updatePlayPauseButton();
    updateVideoTimeDisplay();
    runVideoTimer();
}

function runVideoTimer() {
    clearInterval(videoInterval);
    videoInterval = setInterval(() => {
        if (!isPlaying) return;
        currentTimeSec += 1;
        if (currentTimeSec >= totalDurationSec) {
            currentTimeSec = totalDurationSec;
            isPlaying = false;
            clearInterval(videoInterval);
            updatePlayPauseButton();
        }
        updateVideoTimeDisplay();
    }, 1000);
}

function updateVideoTimeDisplay() {
    const curElem = document.getElementById('currentTime');
    const fillElem = document.getElementById('progressFill');
    if (curElem) curElem.textContent = formatTime(currentTimeSec);
    if (fillElem) {
        const pct = (currentTimeSec / totalDurationSec) * 100;
        fillElem.style.width = pct + '%';
    }
}

function formatTime(totalSec) {
    const m = Math.floor(totalSec / 60);
    const s = Math.floor(totalSec % 60);
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
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

    const readPaperBtn = document.getElementById('readPaperModalBtn');
    if (readPaperBtn) {
        readPaperBtn.addEventListener('click', () => {
            window.open('./discussion-paper.pdf', '_blank');
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
