/* ============================================================
   THE WEDDING OF NANDA & FAJAR - SCRIPTS
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    // ---- CONFIG ----
    // Akad Nikah: 29 November 2026, 10:00 WIB (UTC+7)
    const WEDDING_DATE = new Date('2026-11-29T10:00:00+07:00');

    // ---- DOM ELEMENTS ----
    const cover = document.getElementById('cover');
    const openBtn = document.getElementById('openBtn');
    const mainContent = document.getElementById('mainContent');
    const bottomNav = document.getElementById('bottomNav');
    const guestNameEl = document.getElementById('guestName');
    const openingVideo = document.getElementById('openingVideo');
    const musicToggle = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    const rsvpForm = document.getElementById('rsvpForm');
    const messagesList = document.getElementById('messagesList');
    const toast = document.getElementById('toast');
    const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbwFrtUpyY63lKAkfwHrYLXRg2X5kjOUKK50tg_9sC1xsjCjAOgbDITUe4XAMaUTNWNBDw/exec";

    // ---- INITIAL MUSIC TOGGLE STATE: GUARANTEED HIDDEN ON COVER ----
    if (musicToggle) {
        musicToggle.classList.remove('show-music-toggle');
    }

    // ---- DYNAMIC GUEST NAME FROM URL (?to=Nama+Tamu) ----
    const urlParams = new URLSearchParams(window.location.search);
    const guestParam = urlParams.get('to');
    if (guestParam && guestNameEl) {
        guestNameEl.textContent = decodeURIComponent(guestParam);
    }

    // ---- FLOATING PETALS EFFECT ON COVER ----
    createFallingPetals();

    function createFallingPetals() {
        const container = document.getElementById('floatingPetals');
        if (!container) return;

        const totalPetals = 16;
        for (let i = 0; i < totalPetals; i++) {
            const petal = document.createElement('div');
            petal.className = 'petal';
            petal.style.left = `${Math.random() * 100}%`;
            petal.style.animationDuration = `${7 + Math.random() * 8}s`;
            petal.style.animationDelay = `${Math.random() * 6}s`;
            
            const size = 8 + Math.random() * 9;
            petal.style.width = `${size}px`;
            petal.style.height = `${size}px`;

            // Random petal shapes & soft burgundy/rose shades
            const shapes = ['50% 0 50% 0', '0 50% 0 50%', '50% 30% 50% 30%'];
            petal.style.borderRadius = shapes[Math.floor(Math.random() * shapes.length)];
            
            const colors = [
                'rgba(201, 138, 151, 0.75)',
                'rgba(163, 62, 88, 0.65)',
                'rgba(212, 175, 55, 0.4)',
                'rgba(140, 48, 72, 0.6)'
            ];
            const color = colors[Math.floor(Math.random() * colors.length)];
            petal.style.background = `radial-gradient(ellipse at center, ${color} 0%, transparent 100%)`;

            container.appendChild(petal);
        }
    }

    // ---- OPEN INVITATION (TRANSITION & MUSIC VISIBILITY LOGIC) ----
    openBtn.addEventListener('click', () => {
        cover.classList.add('open');
        document.body.classList.add('cover-open');

        // CRITICAL SPEC: Tampilkan ikon pemutar musik HANYA SETELAH tombol ditekan
        if (musicToggle) {
            musicToggle.classList.add('show-music-toggle');
        }

        // Putar musik latar segera setelah interaksi pengguna
        playMusic();

        setTimeout(() => {
            mainContent.classList.add('visible');
            bottomNav.classList.add('visible');
            cover.style.display = 'none';

            // Autoplay silent opening video
            if (openingVideo) {
                openingVideo.muted = true;
                openingVideo.play().catch(() => {
                    // Browser autoplay policy fallback
                });
            }

            // Trigger scroll animation check for first section
            triggerScrollAnimations();
        }, 800);
    });

    // ---- BACKGROUND MUSIC LOGIC ----
    let isMusicPlaying = false;

    function playMusic() {
        if (!bgMusic) return;
        bgMusic.volume = 0.5;
        bgMusic.play().then(() => {
            isMusicPlaying = true;
            musicToggle.classList.remove('paused');
            musicToggle.setAttribute('title', 'Jeda Musik');
        }).catch(() => {
            isMusicPlaying = false;
            musicToggle.classList.add('paused');
            musicToggle.setAttribute('title', 'Putar Musik');
        });
    }

    function pauseMusic() {
        if (!bgMusic) return;
        bgMusic.pause();
        isMusicPlaying = false;
        musicToggle.classList.add('paused');
        musicToggle.setAttribute('title', 'Putar Musik');
    }

    // Music toggle click handler
    if (musicToggle) {
        musicToggle.addEventListener('click', () => {
            if (isMusicPlaying) {
                pauseMusic();
                showToast('Musik dijeda');
            } else {
                playMusic();
                showToast('Musik diputar ♪');
            }
        });
    }

    // Always keep video muted so video audio never conflicts with digital invitation music
    if (openingVideo) {
        openingVideo.muted = true;
        openingVideo.addEventListener('volumechange', () => {
            if (!openingVideo.muted) {
                openingVideo.muted = true;
            }
        });
    }

    // ---- COUNTDOWN TIMER (29 Nov 2026 10:00 WIB) ----
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    function updateCountdown() {
        const now = new Date();
        const diff = WEDDING_DATE - now;

        if (diff <= 0) {
            if (daysEl) daysEl.textContent = '00';
            if (hoursEl) hoursEl.textContent = '00';
            if (minutesEl) minutesEl.textContent = '00';
            if (secondsEl) secondsEl.textContent = '00';
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const mins = Math.floor((diff / (1000 * 60)) % 60);
        const secs = Math.floor((diff / 1000) % 60);

        if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minutesEl) minutesEl.textContent = String(mins).padStart(2, '0');
        if (secondsEl) secondsEl.textContent = String(secs).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

    // ---- COPY REKENING NUMBER ----
    document.querySelectorAll('.btn-copy').forEach(btn => {
        btn.addEventListener('click', async () => {
            const accNumber = btn.getAttribute('data-copy');
            if (!accNumber) return;

            try {
                await navigator.clipboard.writeText(accNumber);
                btn.classList.add('copied');
                btn.innerHTML = '<i class="fas fa-check"></i> <span>Tersalin!</span>';
                showToast(`Nomor rekening ${accNumber} berhasil disalin!`);
                setTimeout(() => {
                    btn.classList.remove('copied');
                    btn.innerHTML = '<i class="far fa-copy"></i> <span>Salin No. Rekening</span>';
                }, 2200);
            } catch (err) {
                // Clipboard fallback for older browsers
                const tempInput = document.createElement('textarea');
                tempInput.value = accNumber;
                tempInput.style.position = 'fixed';
                tempInput.style.left = '-9999px';
                document.body.appendChild(tempInput);
                tempInput.select();
                document.execCommand('copy');
                document.body.removeChild(tempInput);

                btn.classList.add('copied');
                btn.innerHTML = '<i class="fas fa-check"></i> <span>Tersalin!</span>';
                showToast(`Nomor rekening ${accNumber} berhasil disalin!`);
                setTimeout(() => {
                    btn.classList.remove('copied');
                    btn.innerHTML = '<i class="far fa-copy"></i> <span>Salin No. Rekening</span>';
                }, 2200);
            }
        });
    });

    // ---- RSVP FORM SUBMISSION ----
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const name = document.getElementById('rsvpName').value.trim();
            const attendance = document.getElementById('rsvpAttendance').value;
            const message = document.getElementById('rsvpMessage').value.trim();

            if (!name || !attendance || !message) {
                showToast('Mohon lengkapi seluruh isian form.');
                return;
            }

            const submitBtn = rsvpForm.querySelector('.btn-submit');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Mengirim...</span>';

            const payload = { name, attendance, message, timestamp: new Date().toISOString() };

            try {
                // Mengirim data langsung ke Google Sheets (Apps Script)
                const response = await fetch(WEB_APP_URL, {
                    method: 'POST',
                    body: JSON.stringify(payload)
                });

                if (response.ok) {
                    showToast('Terima kasih! Ucapan & doa berhasil dikirim ✨');
                    rsvpForm.reset();
                    loadMessages();
                } else {
                    saveMessageLocally(payload);
                    showToast('Terima kasih! Ucapan & doa berhasil disimpan ✨');
                    rsvpForm.reset();
                    loadMessages();
                }
            } catch (err) {
                saveMessageLocally(payload);
                showToast('Terima kasih! Ucapan & doa berhasil disimpan ✨');
                rsvpForm.reset();
                loadMessages();
            }

            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> <span>Kirim Ucapan</span>';
        });
    }

    // LocalStorage Fallback for RSVP
    function saveMessageLocally(data) {
        const stored = JSON.parse(localStorage.getItem('nanda_fajar_wishes') || '[]');
        stored.unshift({
            id: Date.now(),
            ...data
        });
        localStorage.setItem('nanda_fajar_wishes', JSON.stringify(stored));
    }

    function getLocalMessages() {
        return JSON.parse(localStorage.getItem('nanda_fajar_wishes') || '[]');
    }

    // Load Messages from API or Fallback
    async function loadMessages() {
        if (!messagesList) return;

        try {
            const res = await fetch(WEB_APP_URL);
            if (res.ok) {
                const messages = await res.json();
                renderMessages(messages);
                return;
            }
        } catch (e) {
            // fallback ke localstorage jika offline
        }

        renderMessages(getLocalMessages());
    }

    function renderMessages(messages) {
        if (!messages || messages.length === 0) {
            messagesList.innerHTML = `
                <div style="text-align: center; padding: 25px 15px; color: var(--text-muted); font-style: italic;">
                    <i class="fas fa-feather-pointed" style="font-size: 22px; color: var(--gold); margin-bottom: 8px; display: block;"></i>
                    Belum ada ucapan doa. Jadilah yang pertama memberikan doa restu! 💐
                </div>
            `;
            return;
        }

        messagesList.innerHTML = messages.map(item => {
            const isHadir = item.attendance === 'hadir';
            const badgeClass = isHadir ? 'hadir' : 'tidak-hadir';
            const badgeText = isHadir ? '✓ Hadir' : '✗ Tidak Hadir';
            const timeStr = item.timestamp ? formatTime(item.timestamp) : '';

            return `
                <div class="message-item">
                    <div class="message-header">
                        <span class="message-name">${escapeHtml(item.name)}</span>
                        <span class="message-badge ${badgeClass}">${badgeText}</span>
                    </div>
                    <p class="message-text">"${escapeHtml(item.message)}"</p>
                    ${timeStr ? `<p class="message-time">${timeStr}</p>` : ''}
                </div>
            `;
        }).join('');
    }

    function formatTime(isoStr) {
        try {
            const date = new Date(isoStr);
            return date.toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (e) {
            return '';
        }
    }

    function escapeHtml(str) {
        if (!str) return '';
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    // Initial load of messages
    loadMessages();

    // ---- STICKY BOTTOM NAV ----
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('[data-section]');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.getAttribute('data-target');
            const targetSection = document.querySelector(`[data-section="${targetId}"]`);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
            navItems.forEach(n => n.classList.remove('active'));
            item.classList.add('active');
        });
    });

    // Scrollspy for active nav item
    const scrollspyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentSection = entry.target.getAttribute('data-section');
                navItems.forEach(nav => {
                    nav.classList.toggle('active', nav.getAttribute('data-target') === currentSection);
                });
            }
        });
    }, { rootMargin: '-25% 0px -55% 0px', threshold: 0 });

    sections.forEach(sec => scrollspyObserver.observe(sec));

    // ---- SCROLL ANIMATIONS (INTERSECTION OBSERVER) ----
    const animObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    function triggerScrollAnimations() {
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            animObserver.observe(el);
        });
    }

    triggerScrollAnimations();

    // ---- TOAST NOTIFICATION UTILITY ----
    let toastTimeout;
    function showToast(msg) {
        if (!toast) return;
        toast.textContent = msg;
        toast.classList.add('show');
        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
});