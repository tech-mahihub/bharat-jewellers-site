// Bharat Jewellers - Main JavaScript
// Lightweight vanilla JS for interactive features

(function() {
    'use strict';

    /* ================= HEADER JAVASCRIPT ================= */

    const initMobileMenu = () => {
        const mobileMenu = document.querySelector('.mobile-menu');
        if (!mobileMenu) return;

        const closeMobileMenu = () => {
            mobileMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
            mobileMenu.setAttribute('aria-hidden', 'true');
            if (menuToggle) {
                menuToggle.classList.remove('is-open');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        };

        const openMobileMenu = () => {
            mobileMenu.classList.add('active');
            document.body.classList.add('menu-open');
            mobileMenu.setAttribute('aria-hidden', 'false');
            if (menuToggle) {
                menuToggle.classList.add('is-open');
                menuToggle.setAttribute('aria-expanded', 'true');
            }
        };

        const menuToggle = document.querySelector('.menu-toggle');
        const mobileLinks = document.querySelectorAll('.mobile-menu a');

        if (menuToggle) {
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.addEventListener('click', () => {
                if (mobileMenu.classList.contains('active')) {
                    closeMobileMenu();
                } else {
                    openMobileMenu();
                }
            });
        }

        if (mobileLinks.length) {
            mobileLinks.forEach((link) => {
                link.addEventListener('click', closeMobileMenu);
            });
        }

        mobileMenu.addEventListener('click', (event) => {
            if (event.target === mobileMenu) {
                closeMobileMenu();
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                closeMobileMenu();
            }
        });
    };

    // Smooth Scroll for Anchor Links
    const initSmoothScroll = () => {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        
        anchorLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href !== '#' && href.length > 1) {
                    const target = document.querySelector(href);
                    if (target) {
                        e.preventDefault();
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
    };

    // Testimonials slider
    const initTestimonialsSlider = () => {
        const slider = document.querySelector('.testimonial-slider');
        const track = document.querySelector('.testimonial-track');
        const prevBtn = document.querySelector('.testimonial-prev');
        const nextBtn = document.querySelector('.testimonial-next');

        if (!slider || !track || !prevBtn || !nextBtn) return;

        const cards = Array.from(track.children);
        let index = 0;

        const getVisibleCount = () => {
            if (window.innerWidth <= 768) return 1;
            if (window.innerWidth <= 1024) return 2;
            return 3;
        };

        const getStep = () => {
            const card = cards[0];
            if (!card) return 0;
            const cardWidth = card.getBoundingClientRect().width;
            const gap = parseFloat(getComputedStyle(track).gap || '0');
            return cardWidth + gap;
        };

        const update = () => {
            const visible = getVisibleCount();
            const maxIndex = Math.max(cards.length - visible, 0);
            index = Math.min(Math.max(index, 0), maxIndex);
            const step = getStep();
            track.style.transform = `translateX(${-index * step}px)`;
            prevBtn.disabled = index === 0;
            nextBtn.disabled = index >= maxIndex;
        };

        prevBtn.addEventListener('click', () => {
            index -= 1;
            update();
        });

        nextBtn.addEventListener('click', () => {
            index += 1;
            update();
        });

        window.addEventListener('resize', () => {
            update();
        });

        update();
    };

    // Back to top visibility
    const initBackToTop = () => {
        const btn = document.querySelector('.floating-top');
        if (!btn) return;

        const toggle = () => {
            if (window.scrollY > 1200) {
                btn.classList.remove('is-hidden');
            } else {
                btn.classList.add('is-hidden');
            }
        };

        toggle();
        window.addEventListener('scroll', toggle);
    };

    // FAQ accordion
    const initFaqs = () => {
        const faqItems = Array.from(document.querySelectorAll('.faq-item'));
        if (!faqItems.length) return;

        const closeItem = (item) => {
            const button = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            if (!button || !answer) return;
            item.classList.remove('is-open');
            button.setAttribute('aria-expanded', 'false');
            answer.style.maxHeight = '0px';
        };

        const openItem = (item) => {
            const button = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            if (!button || !answer) return;
            item.classList.add('is-open');
            button.setAttribute('aria-expanded', 'true');
            answer.style.maxHeight = `${answer.scrollHeight}px`;
        };

        faqItems.forEach((item) => {
            const button = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            if (!button || !answer) return;

            button.setAttribute('aria-expanded', 'false');
            answer.style.maxHeight = '0px';

            button.addEventListener('click', () => {
                const isOpen = item.classList.contains('is-open');
                faqItems.forEach(closeItem);
                if (!isOpen) {
                    openItem(item);
                }
            });
        });
    };

    /* Header nav: active states + mega menu + mobile collections accordion (SSR pages without layout.js injection) */
    const initSiteNavEnhancements = () => {
        const setActiveNav = () => {
            const currentPath = window.location.pathname.replace(/\/+$/, '') || '/';
            const links = document.querySelectorAll('.main-nav a, .mobile-nav a, .mobile-nav-accordion-list a');

            links.forEach((link) => {
                const href = link.getAttribute('href');
                if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
                const normalizedLinkPath = href.replace(/\/+$/, '') || '/';
                if (normalizedLinkPath === currentPath) link.classList.add('active');
            });
            if (currentPath === '/blog' || currentPath.startsWith('/blog/')) {
                document.querySelectorAll('a[href="/blog/"]').forEach((el) => el.classList.add('active'));
            }
            const collectionsTrigger = document.querySelector('.nav-link-mega-trigger');
            if (collectionsTrigger && (
                currentPath === '/collections/' ||
                currentPath === '/category/' ||
                currentPath === '/gold-jewellery/' ||
                currentPath === '/diamond-jewellery/' ||
                currentPath === '/bridal-sets/' ||
                currentPath === '/custom-jewellery/'
            )) {
                collectionsTrigger.classList.add('active');
            }
        };

        setActiveNav();

        (function initMegaMenu() {
            const header = document.querySelector('.site-header');
            const navItem = document.querySelector('.nav-item-has-mega');
            const megaMenu = document.querySelector('.mega-menu');
            if (!header || !navItem || !megaMenu) return;
            var closeTimer = null;
            function open() {
                if (closeTimer) clearTimeout(closeTimer);
                closeTimer = null;
                header.classList.add('mega-menu-open');
            }
            function close() {
                closeTimer = setTimeout(function() {
                    header.classList.remove('mega-menu-open');
                }, 80);
            }
            navItem.addEventListener('mouseenter', open);
            navItem.addEventListener('mouseleave', close);
            megaMenu.addEventListener('mouseenter', open);
            megaMenu.addEventListener('mouseleave', close);
        })();

        (function initMobileAccordion() {
            document.querySelectorAll('.mobile-nav-accordion-trigger').forEach(function(btn) {
                btn.addEventListener('click', function() {
                    const list = document.getElementById(btn.getAttribute('aria-controls'));
                    if (!list) return;
                    const expanded = btn.getAttribute('aria-expanded') === 'true';
                    btn.setAttribute('aria-expanded', String(!expanded));
                    list.hidden = expanded;
                });
            });
            const list = document.getElementById('mobile-collections-list');
            if (list) list.hidden = true;
        })();
    };

    // Legal pages: auto-set "Last updated" date
    const initLegalLastUpdated = () => {
        const targets = document.querySelectorAll('.js-last-updated');
        if (!targets.length) return;

        const today = new Date();
        const formatted = today.toLocaleDateString('en-CA', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        targets.forEach((el) => {
            el.textContent = formatted;
        });
    };

    // Initialize all features when DOM is ready
    const init = () => {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                initSiteNavEnhancements();
                initMobileMenu();
                initSmoothScroll();
                initTestimonialsSlider();
                initFaqs();
                initBackToTop();
                initLegalLastUpdated();
            });
        } else {
            initSiteNavEnhancements();
            initMobileMenu();
            initSmoothScroll();
            initTestimonialsSlider();
            initFaqs();
            initBackToTop();
            initLegalLastUpdated();
        }
    };

    // Start initialization
    init();

})();

