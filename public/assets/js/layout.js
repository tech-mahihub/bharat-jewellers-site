// Shared header/footer injection for all pages
// Note: This is a physical jewellery store. Customers visit directly - no appointments required.
(function() {
    'use strict';

    function initLayout() {
        const headerTarget = document.getElementById('site-header');
        const footerTarget = document.getElementById('site-footer');

        if (headerTarget) {
            headerTarget.innerHTML = `
    <header class="site-header">
        <div class="header-inner">
            <div class="logo">
                <a href="/">
                    <img src="/assets/images/Logo/bharat-jewellers-logo.webp" alt="Bharat Jewellers">
                </a>
            </div>
            <nav class="main-nav" aria-label="Main navigation">
                <ul class="main-nav-list">
                    <li><a href="/">Home</a></li>
                    <li><a href="/about/">About</a></li>
                    <li class="nav-item-has-mega">
                        <a href="/collections/" class="nav-link-mega-trigger">Collections</a>
                    </li>
                    <li><a href="/blog/">Blogs</a></li>
                    <li><a href="/live-gold-rates/">Live Gold Rates</a></li>
                </ul>
            </nav>
            <a href="/contact/" class="btn-outline header-cta">Contact Us</a>
            <button class="menu-toggle" aria-label="Open menu" type="button">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
        <section class="mega-menu" aria-label="Collections submenu">
            <div class="mega-menu-inner">
                <div class="mega-menu-grid">
                    <a class="mega-menu-card" href="/gold-jewellery/">
                        <div class="mega-menu-card-image">
                            <img src="/assets/images/Homepage/Gold-Jewellery-Collections.webp" alt="Gold Jewellery">
                        </div>
                        <h3 class="mega-menu-card-title">Gold Jewellery</h3>
                        <p class="mega-menu-card-desc">Elegant 22K gold pieces crafted by master artisans.</p>
                        <span class="mega-menu-card-link">View collection</span>
                    </a>
                    <a class="mega-menu-card" href="/diamond-jewellery/">
                        <div class="mega-menu-card-image">
                            <img src="/assets/images/Homepage/Diamond-Jewellery-Collections.webp" alt="Diamond Jewellery">
                        </div>
                        <h3 class="mega-menu-card-title">Diamond Jewellery</h3>
                        <p class="mega-menu-card-desc">Refined brilliance for modern luxury.</p>
                        <span class="mega-menu-card-link">View collection</span>
                    </a>
                    <a class="mega-menu-card" href="/bridal-sets/">
                        <div class="mega-menu-card-image">
                            <img src="/assets/images/Homepage/Gold-Bridal-Sets.webp" alt="Bridal Collection">
                        </div>
                        <h3 class="mega-menu-card-title">Bridal Collection</h3>
                        <p class="mega-menu-card-desc">Complete sets for your special day.</p>
                        <span class="mega-menu-card-link">View collection</span>
                    </a>
                    <a class="mega-menu-card" href="/custom-jewellery/">
                        <div class="mega-menu-card-image">
                            <img src="/assets/images/Homepage/Custom-Jewellery-Surrey-BC.webp" alt="Custom Jewellery">
                        </div>
                        <h3 class="mega-menu-card-title">Custom Jewellery</h3>
                        <p class="mega-menu-card-desc">Bring your unique vision to life.</p>
                        <span class="mega-menu-card-link">View collection</span>
                    </a>
                </div>
            </div>
        </section>
    </header>
    <div class="mobile-menu" aria-hidden="true">
        <div class="mobile-menu-inner">
            <nav class="mobile-nav" aria-label="Mobile navigation">
                <a href="/">Home</a>
                <a href="/about/">About</a>
                <div class="mobile-nav-accordion">
                    <button type="button" class="mobile-nav-accordion-trigger" aria-expanded="false" aria-controls="mobile-collections-list" data-nav-trigger>Collections</button>
                    <ul class="mobile-nav-accordion-list" id="mobile-collections-list" role="region" aria-label="Collections">
                        <li><a href="/gold-jewellery/">Gold Jewellery</a></li>
                        <li><a href="/diamond-jewellery/">Diamond Jewellery</a></li>
                        <li><a href="/bridal-sets/">Bridal Collection</a></li>
                        <li><a href="/custom-jewellery/">Custom Jewellery</a></li>
                    </ul>
                </div>
                <a href="/blog/">Blogs</a>
                <a href="/live-gold-rates/">Live Gold Rates</a>
            </nav>
            <a href="/contact/" class="btn-outline">Contact Us</a>
        </div>
    </div>
            `.trim();
        }

        if (footerTarget) {
            footerTarget.innerHTML = `
    <footer class="site-footer">
      <div class="footer-inner">
        <div class="footer-top">
          <div class="footer-col brand">
            <img src="/assets/images/Logo/bharat-jewellers-logo.webp" alt="Bharat Jewellers">
            <span class="footer-locations">Surrey • Calgary • Edmonton • Dubai</span>
            <p>
              Timeless elegance, trusted for generations. Discover exquisite
              collections of gold, diamond, and bridal jewellery.
            </p>
          </div>

          <div class="footer-col">
            <h4>Quick Links</h4>
            <a href="/blog/">Blog</a>
            <a href="/faqs/">FAQs</a>
            <a href="/disclaimer/">Disclaimer</a>
            <a href="/privacy-policy/">Privacy Policy</a>
            <a href="/terms-of-service/">Terms of Service</a>
          </div>

          <div class="footer-col">
            <h4>Store Hours</h4>
            <p><strong>Mon – Sun:</strong> 11:00 AM – 7:00 PM</p>
            <p><strong>Tuesday:</strong> Closed</p>
            <p>All Locations</p>
          </div>

          <div class="footer-col">
            <h4>Stay Updated</h4>
            <p>Stay updated with new collections and special offers.</p>

            <div class="footer-social">
              <a href="https://www.instagram.com/bharatjewellerscalgary/" target="_blank" aria-label="Instagram">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 7.3a4.7 4.7 0 100 9.4 4.7 4.7 0 000-9.4zm0 7.7a3 3 0 110-6 3 3 0 010 6z" fill="#ffffff"/>
                  <path d="M16.9 2H7.1A5.1 5.1 0 002 7.1v9.8A5.1 5.1 0 007.1 22h9.8A5.1 5.1 0 0022 16.9V7.1A5.1 5.1 0 0016.9 2zm3.3 14.9a3.3 3.3 0 01-3.3 3.3H7.1a3.3 3.3 0 01-3.3-3.3V7.1A3.3 3.3 0 017.1 3.8h9.8a3.3 3.3 0 013.3 3.3z" fill="#ffffff"/>
                  <circle cx="17.8" cy="6.2" r="1.1" fill="#ffffff"/>
                </svg>
              </a>

              <a href="https://www.facebook.com/BharatJeweller/" target="_blank" aria-label="Facebook">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M13.9 8.9V7.3c0-.7.5-.9 1-.9h1.9V4h-2.6c-2.6 0-4 1.6-4 3.8v1.1H8.5v2.7h2.1V20h3.3v-8.4h2.6l.4-2.7z" fill="#ffffff"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="footer-divider"></div>
      <div class="footer-bottom">
        © 1998–2026 Bharat Jewellers. All Rights Reserved.
      </div>
    </footer>
            `.trim();
        }

        // Nav active states, mega menu, mobile accordion: see main.js (initSiteNavEnhancements)
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLayout);
    } else {
        initLayout();
    }
})();
