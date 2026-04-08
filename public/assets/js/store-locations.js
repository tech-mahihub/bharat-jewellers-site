// Reusable Store Locations component – heading varies by context (category vs homepage)
(function() {
    'use strict';
    const container = document.getElementById('store-locations-inject');
    if (!container) return;
    const defaultHeading = 'Bharat Jewellers Store Locations – Surrey, Calgary & Edmonton';
    const heading = (container.getAttribute('data-heading') || defaultHeading).replace(/&/g, '&amp;');
    container.innerHTML = [
        '<div class="content-wrap">',
        '    <div class="section-title">',
        '        <h2>' + heading + '</h2>',
        '    </div>',
        '    <div class="location-grid">',
        '        <article class="location-card">',
        '            <a href="surrey.html" class="location-image">',
        '                <img src="assets/images/Locations/Bharat-Jewellers-Surrey-Store1.webp" alt="Bharat Jewellers Surrey">',
        '            </a>',
        '            <h3>Surrey</h3>',
        '            <p>155-8120 128 Street, Surrey, British Columbia V3W 1R1, Canada<br><br><a href="tel:+16045931111">+1 (604) 593-1111</a><br><a href="mailto:surrey@bharatjewellers.ca">surrey@bharatjewellers.ca</a></p>',
        '            <a class="location-link" href="surrey.html">View Store</a>',
        '        </article>',
        '        <article class="location-card">',
        '            <a href="calgary.html" class="location-image">',
        '                <img src="assets/images/Locations/Bharat-Jewellers-Calgary.webp" alt="Bharat Jewellers Calgary">',
        '            </a>',
        '            <h3>Calgary</h3>',
        '            <p>Cityscape Landing Plaza, 4310 104 Ave NE #1130, Calgary, AB T3N 1W1, Canada<br><br><a href="tel:+14035580455">+1 403-558-0455</a><br><a href="mailto:calgary@bharatjewellers.ca">calgary@bharatjewellers.ca</a></p>',
        '            <a class="location-link" href="calgary.html">View Store</a>',
        '        </article>',
        '        <article class="location-card">',
        '            <a href="edmonton.html" class="location-image">',
        '                <img src="assets/images/Locations/Jewelry-Stores-Edmonton-1.webp" alt="Bharat Jewellers Edmonton">',
        '            </a>',
        '            <h3>Edmonton</h3>',
        '            <p>9358 34 Ave NW, Edmonton, AB T6E 5X8, Canada<br><br><a href="tel:+17802626111">+1 780-262-6111</a><br><a href="mailto:edmonton@bharatjewellers.ca">edmonton@bharatjewellers.ca</a></p>',
        '            <a class="location-link" href="edmonton.html">View Store</a>',
        '        </article>',
        '    </div>',
        '</div>'
    ].join('');
})();
