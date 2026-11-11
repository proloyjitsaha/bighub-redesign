/**
 * BIGHUB BOYS COLLECTION — MOTION & INTERACTIVE 3D ENGINE
 * Light Theme · Wavily Scroll-Reactive Flow · 3D Floating Cards · Lenis Inertial Momentum
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. LENIS ULTRA-SMOOTH INERTIAL MOMENTUM SCROLLING
       ========================================================================== */
    let lenis = null;
    if (typeof Lenis !== 'undefined') {
        lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential ease-out
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 0.95,
            touchMultiplier: 1.4,
            infinite: false
        });

        // Sync with GSAP ScrollTrigger if available
        if (typeof ScrollTrigger !== 'undefined' && typeof gsap !== 'undefined') {
            lenis.on('scroll', ScrollTrigger.update);
            gsap.ticker.add((time) => {
                lenis.raf(time * 1000);
            });
            gsap.ticker.lagSmoothing(0);
        } else {
            function raf(time) {
                lenis.raf(time);
                requestAnimationFrame(raf);
            }
            requestAnimationFrame(raf);
        }

        // Smooth scroll for all internal anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId && targetId !== '#') {
                    const targetEl = document.querySelector(targetId);
                    if (targetEl) {
                        e.preventDefault();
                        lenis.scrollTo(targetEl, {
                            offset: -70,
                            duration: 1.4,
                            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
                        });
                    }
                }
            });
        });
    }

    /* ==========================================================================
       2. WAVILY SCROLL-REACTIVE CANVAS (EXPANDED FLUID TEXTILE WEAVE SINE MESH)
       ========================================================================== */
    const canvas = document.getElementById('waveCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        let time = 0;
        let currentScrollY = window.scrollY;
        let targetScrollY = window.scrollY;
        let scrollVelocity = 0;
        let lastScrollY = window.scrollY;
        let currentAmplitude = 32;

        const updateScroll = (sY) => {
            targetScrollY = sY;
            const delta = Math.abs(targetScrollY - lastScrollY);
            scrollVelocity = Math.min(delta * 2.2, 110);
            lastScrollY = targetScrollY;
        };

        if (lenis) {
            lenis.on('scroll', (e) => updateScroll(e.scroll));
        } else {
            window.addEventListener('scroll', () => updateScroll(window.scrollY), { passive: true });
        }

        const waveLayers = [
            { freq: 0.0022, speed: 0.014, color: 'rgba(224, 8, 133, 0.18)', width: 1.8, offset: 0, ampMult: 1.0 },
            { freq: 0.0032, speed: 0.020, color: 'rgba(61, 43, 155, 0.15)', width: 2.2, offset: 1.8, ampMult: 1.2 },
            { freq: 0.0016, speed: 0.010, color: 'rgba(0, 210, 255, 0.14)', width: 1.4, offset: 3.2, ampMult: 0.8 },
            { freq: 0.0028, speed: 0.016, color: 'rgba(224, 8, 133, 0.11)', width: 1.6, offset: 4.8, ampMult: 1.1 }
        ];

        function renderWaves() {
            ctx.clearRect(0, 0, width, height);

            currentScrollY += (targetScrollY - currentScrollY) * 0.1;
            const targetAmp = 26 + scrollVelocity;
            currentAmplitude += (targetAmp - currentAmplitude) * 0.08;
            scrollVelocity *= 0.93;

            time += 0.015;

            waveLayers.forEach(layer => {
                ctx.beginPath();
                ctx.strokeStyle = layer.color;
                ctx.lineWidth = layer.width;

                const centerY = height * 0.52 + Math.sin(time * 0.6 + layer.offset) * 28;

                for (let x = 0; x <= width; x += 6) {
                    const y = centerY + 
                        Math.sin(x * layer.freq + time * layer.speed * 85 + layer.offset + (currentScrollY * 0.0035)) * (currentAmplitude * layer.ampMult) +
                        Math.cos(x * layer.freq * 1.7 - time * layer.speed * 45) * (currentAmplitude * 0.35);
                    
                    if (x === 0) {
                        ctx.moveTo(x, y);
                    } else {
                        ctx.lineTo(x, y);
                    }
                }

                ctx.stroke();
            });

            requestAnimationFrame(renderWaves);
        }
        renderWaves();
    }

    /* ==========================================================================
       3. 3D ROTATING LOGO MOUSE PARALLAX TILT
       ========================================================================== */
    const logoScene = document.getElementById('logo3dScene');
    if (logoScene) {
        window.addEventListener('mousemove', (e) => {
            const cx = window.innerWidth / 2;
            const cy = window.innerHeight * 0.15;
            const dx = (e.clientX - cx) / cx;
            const dy = (e.clientY - cy) / cy;

            logoScene.style.transform = `perspective(800px) rotateX(${dy * -8}deg) rotateZ(${dx * 3}deg)`;
        });
    }

    /* ==========================================================================
       4. PRELOADER SEQUENCE (LIGHT GRAPHIK INTRO)
       ========================================================================== */
    const preloader = document.getElementById('preloader');
    const preloaderCount = document.getElementById('preloaderCount');
    const preloaderFill = document.getElementById('preloaderFill');
    const preloaderStatus = document.getElementById('preloaderStatus');

    const statuses = [
        "Calibrating garment weave dynamics...",
        "Sampling Howrah combed cotton fibers...",
        "Loading wholesale collection matrices...",
        "Harmonizing B2B factory specs...",
        "Welcome to BigHub Boys Collection."
    ];

    let currentCount = 0;
    const countInterval = setInterval(() => {
        currentCount += Math.floor(Math.random() * 5) + 1;
        if (currentCount > 100) currentCount = 100;

        if (preloaderCount) preloaderCount.textContent = currentCount;
        if (preloaderFill) preloaderFill.style.width = `${currentCount}%`;

        const statusIdx = Math.min(Math.floor((currentCount / 100) * statuses.length), statuses.length - 1);
        if (preloaderStatus) preloaderStatus.textContent = statuses[statusIdx];

        if (currentCount >= 100) {
            clearInterval(countInterval);
            setTimeout(() => {
                if (preloader) preloader.classList.add('is-lifting');
                document.documentElement.classList.remove('home-loading');
                runHeroEntrance();
                initSectionWaveScroll();
                init3DCardPhysics();
            }, 300);
        }
    }, 24);

    /* ==========================================================================
       5. GSAP HERO REVEAL ANIMATION
       ========================================================================== */
    function runHeroEntrance() {
        if (typeof gsap === 'undefined') return;

        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.from('.site-header', {
            y: -25,
            opacity: 0,
            duration: 1
        })
        .from('.hero-top-meta', {
            opacity: 0,
            y: 15,
            duration: 0.7
        }, '-=0.6')
        .from('.title-line--unified', {
            opacity: 0,
            y: 35,
            duration: 1,
            stagger: 0.15
        }, '-=0.5')
        .from('.hero-tagline-container', {
            opacity: 0,
            y: 20,
            duration: 0.8
        }, '-=0.6')
        .from('.hero-actions', {
            opacity: 0,
            y: 20,
            duration: 0.8
        }, '-=0.6')
        .from('.hero-catalog-strip', {
            opacity: 0,
            y: 30,
            duration: 1
        }, '-=0.5')
        .from('.floating-dock', {
            opacity: 0,
            y: 30,
            duration: 0.8
        }, '-=0.5');
    }

    /* ==========================================================================
       6. REPEATABLE WAVILY FLOATING & FADING SECTION REVEALS (BIDIRECTIONAL)
       ========================================================================== */
    let sectionObserver = null;
    let cardObserver = null;

    function initSectionWaveScroll() {
        const sections = document.querySelectorAll('.block-manifesto, .block-catalog, .block-mascot, .block-inquiry, .site-footer');
        
        sections.forEach(section => {
            section.classList.add('section-wave-reveal');
            
            // Collect inner elements for a floating wave stagger
            const elementsToStagger = section.querySelectorAll(
                '.section-tag, .manifesto-heading, .manifesto-text, .pillars-grid, .manifesto-metrics, .manifesto-aside, ' +
                '.catalog-header, .catalog-tabs, .mascot-grid, .inquiry-grid, .footer-top, .footer-bottom'
            );
            
            elementsToStagger.forEach((el, idx) => {
                el.classList.add('float-wave-item');
                // Calculate subtle sinusoidal wave delay
                const delay = (0.06 + (idx * 0.08)).toFixed(3);
                el.style.setProperty('--wave-delay', `${delay}s`);
            });
        });

        // Intersection Observer for silky smooth in-view triggers (bidirectional)
        if (sectionObserver) sectionObserver.disconnect();
        sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const section = entry.target;
                if (entry.isIntersecting) {
                    section.classList.add('is-inview');
                } else {
                    // When scrolling back up, if section exits below the viewport, reset it
                    const rect = entry.boundingClientRect;
                    if (rect.top > 0) {
                        section.classList.remove('is-inview');
                    }
                }
            });
        }, {
            threshold: 0.08,
            rootMargin: '0px 0px -40px 0px'
        });

        sections.forEach(s => sectionObserver.observe(s));
    }

    /* ==========================================================================
       7. INTERACTIVE 3D FLOATING PHYSICS & GLARE ON IMAGE CARDS (REPEATABLE WAVE)
       ========================================================================== */
    function init3DCardPhysics() {
        const allCards = document.querySelectorAll('.product-card, .strip-card');
        const productCards = document.querySelectorAll('.product-card');

        productCards.forEach((card) => {
            card.classList.add('scroll-float-item');
        });

        // Bidirectional Intersection Observer to float cards in with a wave pattern repeatedly
        if (cardObserver) cardObserver.disconnect();
        cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const card = entry.target;
                if (entry.isIntersecting) {
                    if (card.classList.contains('is-revealed')) return;

                    // Stagger based on column index
                    const rect = card.getBoundingClientRect();
                    const colIndex = Math.max(0, Math.min(3, Math.floor((rect.left / window.innerWidth) * 4)));
                    const waveDelay = (colIndex * 0.10) + 0.04;
                    
                    if (card._waveTimer) clearTimeout(card._waveTimer);
                    card._waveTimer = setTimeout(() => {
                        card.classList.add('is-revealed');
                        card._waveTimer = null;
                    }, waveDelay * 1000);
                } else {
                    // If card is below viewport (user scrolled up), reset so it can re-animate on scroll down
                    if (entry.boundingClientRect.top > 0) {
                        if (card._waveTimer) {
                            clearTimeout(card._waveTimer);
                            card._waveTimer = null;
                        }
                        card.classList.remove('is-revealed');
                        if (!card._isHovered) {
                            card.style.transform = '';
                            card.style.boxShadow = '';
                        }
                    }
                }
            });
        }, {
            threshold: 0.08,
            rootMargin: '0px 0px -30px 0px'
        });

        productCards.forEach(card => cardObserver.observe(card));

        // Interactive 3D cursor tilt + specular glare on ALL image cards
        allCards.forEach(card => {
            let glare = card.querySelector('.card-3d-glare');
            if (!glare) {
                glare = document.createElement('div');
                glare.className = 'card-3d-glare';
                card.appendChild(glare);
            }

            let rafId = null;

            card.addEventListener('pointerenter', () => {
                card._isHovered = true;
                card.style.transition = 'transform 0.15s ease-out, box-shadow 0.25s ease-out, border-color 0.3s ease';
            });

            card.addEventListener('pointermove', (e) => {
                if (!card._isHovered) return;

                if (rafId) cancelAnimationFrame(rafId);
                rafId = requestAnimationFrame(() => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;

                    const dx = (x - centerX) / centerX;
                    const dy = (y - centerY) / centerY;

                    const rotateX = -dy * 12;
                    const rotateY = dx * 12;

                    card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(18px) translateY(-10px)`;

                    const shadowX = (-dx * 14).toFixed(1);
                    const shadowY = (22 - dy * 10).toFixed(1);
                    card.style.boxShadow = `${shadowX}px ${shadowY}px 45px rgba(224, 8, 133, 0.22), 0 12px 28px rgba(61, 43, 155, 0.16)`;

                    glare.style.opacity = '1';
                    glare.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.5) 0%, rgba(224, 8, 133, 0.15) 35%, transparent 70%)`;
                });
            });

            card.addEventListener('pointerleave', () => {
                card._isHovered = false;
                if (rafId) cancelAnimationFrame(rafId);

                card.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.6s cubic-bezier(0.23, 1, 0.32, 1), border-color 0.4s ease';
                if (card.classList.contains('is-revealed')) {
                    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0) translateY(0)';
                } else {
                    card.style.transform = '';
                }
                card.style.boxShadow = '';
                glare.style.opacity = '0';
            });
        });
    }

    /* ==========================================================================
       7B. STATE RESET & REPEATABLE SCROLL / THREE.JS CONTROLLER
       ========================================================================== */
    function resetScrollAnimationsToTop() {
        const sections = document.querySelectorAll('.block-manifesto, .block-catalog, .block-mascot, .block-inquiry, .site-footer');
        sections.forEach(s => s.classList.remove('is-inview'));

        const productCards = document.querySelectorAll('.product-card');
        productCards.forEach(card => {
            if (card._waveTimer) {
                clearTimeout(card._waveTimer);
                card._waveTimer = null;
            }
            card.classList.remove('is-revealed');
            if (!card._isHovered) {
                card.style.transform = '';
                card.style.boxShadow = '';
            }
        });

        updateThreeJsScroll(0, 0, -1);

        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.refresh();
        }
    }

    function updateThreeJsScroll(progress, scrollY, direction) {
        const scene = window.scene || window.threeScene;
        const camera = window.camera || window.threeCamera;

        if (camera && camera.position) {
            if (!camera._initialCoords) {
                camera._initialCoords = {
                    x: camera.position.x,
                    y: camera.position.y,
                    z: camera.position.z,
                    rx: camera.rotation ? camera.rotation.x : 0,
                    ry: camera.rotation ? camera.rotation.y : 0
                };
            }
            if (progress <= 0.005) {
                camera.position.x = camera._initialCoords.x;
                camera.position.y = camera._initialCoords.y;
                camera.position.z = camera._initialCoords.z;
                if (camera.rotation) {
                    camera.rotation.x = camera._initialCoords.rx;
                    camera.rotation.y = camera._initialCoords.ry;
                }
            } else if (typeof camera._onScroll === 'function') {
                camera._onScroll(progress, scrollY, direction);
            }
        }

        if (scene && typeof scene._onScroll === 'function') {
            scene._onScroll(progress, scrollY, direction);
        }
        if (typeof window.onThreeScrollUpdate === 'function') {
            window.onThreeScrollUpdate(progress, scrollY, direction);
        }
    }

    let lastKnownScrollY = window.scrollY;
    let isAtTop = window.scrollY <= 25;

    function handleGlobalScroll(scrollY) {
        const direction = scrollY > lastKnownScrollY ? 1 : -1;
        lastKnownScrollY = scrollY;

        const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        const scrollProgress = Math.min(1, Math.max(0, scrollY / maxScroll));

        updateThreeJsScroll(scrollProgress, scrollY, direction);

        if (scrollY <= 25) {
            if (!isAtTop) {
                isAtTop = true;
                resetScrollAnimationsToTop();
            }
        } else {
            isAtTop = false;
        }
    }

    if (lenis) {
        lenis.on('scroll', (e) => handleGlobalScroll(e.scroll));
    } else {
        window.addEventListener('scroll', () => handleGlobalScroll(window.scrollY), { passive: true });
    }

    window.addEventListener('wheel', (e) => {
        if (window.scrollY <= 25 && e.deltaY < 0) {
            resetScrollAnimationsToTop();
        }
    }, { passive: true });

    // Expose reset helper globally for tests or external triggers
    window.__bighubScrollReset = resetScrollAnimationsToTop;

    /* ==========================================================================
       8. HERO CATALOG STRIP PILL INTERACTION
       ========================================================================== */
    const stripPills = document.querySelectorAll('.strip-pill');
    const stripCards = document.querySelectorAll('.strip-card');

    stripPills.forEach((pill, idx) => {
        pill.addEventListener('click', () => {
            stripPills.forEach(p => p.classList.remove('is-active'));
            pill.classList.add('is-active');

            stripCards.forEach((card, cIdx) => {
                if (cIdx === idx) {
                    card.style.borderColor = 'var(--color-pink)';
                    card.style.transform = 'perspective(1000px) translateY(-10px) translateZ(15px)';
                    card.style.boxShadow = '0 25px 50px rgba(224, 8, 133, 0.2)';
                } else {
                    card.style.borderColor = 'var(--border-subtle)';
                    card.style.transform = 'perspective(1000px) translateY(0) translateZ(0)';
                    card.style.boxShadow = 'var(--shadow-card)';
                }
            });
        });
    });

    /* ==========================================================================
       9. CATALOGUE FILTER TABS WITH 3D WAVE FLIP
       ========================================================================== */
    const tabBtns = document.querySelectorAll('.tab-btn');
    const productCards = document.querySelectorAll('.product-card');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('is-active'));
            btn.classList.add('is-active');

            const filter = btn.getAttribute('data-filter');

            productCards.forEach((card, idx) => {
                const category = card.getAttribute('data-category');
                const matches = (filter === 'all' || category === filter);

                if (matches) {
                    card.style.display = 'flex';
                    // 3D wave fade entrance
                    const delay = (idx % 6) * 0.05;
                    card.style.opacity = '0';
                    card.style.transform = 'perspective(1000px) translateY(35px) rotateX(8deg) scale(0.96)';

                    setTimeout(() => {
                        card.style.transition = 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
                        card.style.opacity = '1';
                        card.style.transform = 'perspective(1000px) translateY(0) rotateX(0deg) scale(1)';
                    }, delay * 1000);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    /* ==========================================================================
       10. B2B WHOLESALE INQUIRY FORM (WHATSAPP PREFILL ENGINE)
       ========================================================================== */
    const wholesaleForm = document.getElementById('wholesaleForm');
    if (wholesaleForm) {
        wholesaleForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('b2bName').value.trim();
            const phone = document.getElementById('b2bPhone').value.trim();
            const city = document.getElementById('b2bCity').value.trim();
            const qty = document.getElementById('b2bQty').value;
            const message = document.getElementById('b2bMessage').value.trim();

            if (!name || !phone || !city) {
                alert('Please fill out all required fields.');
                return;
            }

            const waText = 
                `*New B2B Wholesale Inquiry - BigHub Boys Collection*\n\n` +
                `*Name / Business:* ${name}\n` +
                `*Contact / WhatsApp:* ${phone}\n` +
                `*Location:* ${city}\n` +
                `*Estimated Order Qty:* ${qty}\n` +
                `*Notes / Preference:* ${message || 'Please share current ready stock catalogue and wholesale price matrix.'}\n\n` +
                `_Sent via BigHub B2B Web Portal_`;

            const waUrl = `https://wa.me/919831281000?text=${encodeURIComponent(waText)}`;
            window.open(waUrl, '_blank');
        });
    }

    /* ==========================================================================
       11. THEATRICAL FULLSCREEN MENU
       ========================================================================== */
    const dockMenuBtn = document.getElementById('dockMenuBtn');
    const theatricalMenu = document.getElementById('theatricalMenu');

    if (dockMenuBtn && theatricalMenu) {
        dockMenuBtn.addEventListener('click', () => {
            const isOpen = theatricalMenu.classList.contains('is-open');
            if (isOpen) {
                theatricalMenu.classList.remove('is-open');
                dockMenuBtn.classList.remove('is-active');
                if (lenis) lenis.start();
            } else {
                theatricalMenu.classList.add('is-open');
                dockMenuBtn.classList.add('is-active');
                if (lenis) lenis.stop();

                if (typeof gsap !== 'undefined') {
                    gsap.from('.menu-link', {
                        y: 30,
                        opacity: 0,
                        stagger: 0.08,
                        duration: 0.5,
                        ease: 'power3.out'
                    });
                }
            }
        });

        document.querySelectorAll('.menu-link').forEach(link => {
            link.addEventListener('click', () => {
                theatricalMenu.classList.remove('is-open');
                dockMenuBtn.classList.remove('is-active');
                if (lenis) lenis.start();
            });
        });
    }

});
