// Category detail template rendering
(function() {
    'use strict';

    const categories = {
        'gold-jewellery': {
            name: 'Gold Jewellery',
            title: 'Gold Jewellery',
            intro: 'Discover luminous 22K gold jewellery shaped by master artisans. Each design balances heritage craft with refined modern elegance.',
            store_location: 'Surrey, BC',
            category_keyword: '22K Gold Jewellery in Surrey',
            brand_name: 'Bharat Jewellers',
            category_description: 'Explore 22K gold jewellery in Surrey, BC, from rings and necklaces to bangles and bracelets crafted by master artisans.',
            aboutParagraphs: [
                'At Bharat Jewellers, our premium gold jewellery collection in Surrey showcases handcrafted 22K pieces where traditional craftsmanship meets modern design. Each item is certified and hallmarked for purity, offering you a trusted jewellery store experience in Surrey.',
                'From everyday wear to wedding and festival occasions, our 22K gold jewellery blends timeless elegance with contemporary silhouettes. Visit our Surrey showroom to explore necklaces, bangles, rings, and chains in a luxury jewellery setting.',
                'We combine expert artistry with certified jewellery and transparent service. Whether you seek a single statement piece or a full set, our gold collection delivers premium jewellery you can wear with confidence.'
            ],
            seoAboutImage: 'assets/images/Homepage/Gold-Jewellery-Collections.webp',
            seoWhyChooseImage: 'assets/images/Necklaces/Necklace_1.webp',
            whyChooseBullets: [
                'Expert craftsmanship and premium 22K gold materials',
                'Certified and hallmarked jewellery for guaranteed purity',
                'Trusted jewellery store in Surrey, BC',
                'Personalized customer experience and aftercare support',
                'Wide collection for weddings, festivals, and special occasions'
            ],
            heroImage: 'assets/images/Necklaces/Necklace_1.webp',
            highlight: {
                title: 'Discover Your Dream Gold Jewellery',
                text: 'Immerse yourself in refined designs crafted with luminous metals, intricate detailing, and enduring brilliance.',
                buttonText: 'Contact Us',
                buttonLink: '/contact',
                image: 'assets/images/Chains/Chain_2.webp',
                mediaImage: 'assets/images/Chains/Chain_2.webp'
            },
            details: {
                title: 'Crafted with Purpose and Precision',
                text: 'From metal selection to final polish, every detail reflects our commitment to lasting beauty and elevated design.',
                blurbs: [
                    { title: 'Traditional Workmanship' },
                    { title: 'Handcrafted Detailing' },
                    { title: 'Hallmark Certified' },
                    { title: 'Unmatched Purity' }
                ]
            },
            filters: ['Rings', 'Necklaces', 'Chains', 'Bangles', 'Bracelets'],
            items: {
                Rings: [
                    { name: 'Heritage Gold Ring', desc: 'Hand-finished 22K gold detailing.', image: 'assets/images/Rings/Ring_1.webp' },
                    { name: 'Radiant Band', desc: 'Polished for timeless brilliance.', image: 'assets/images/Rings/Ring_2.webp' },
                    { name: 'Signature Ring', desc: 'Elegant contours with classic appeal.', image: 'assets/images/Rings/Ring_4.webp' },
                    { name: 'Gold Ring Style 1', desc: 'Classic 22K gold craftsmanship.', image: 'assets/images/Rings/Buy Rings Near Me (1).webp' },
                    { name: 'Gold Ring Style 2', desc: 'Refined design for every occasion.', image: 'assets/images/Rings/Buy Rings Near Me (2).webp' },
                    { name: 'Gold Ring Style 3', desc: 'Timeless elegance in gold.', image: 'assets/images/Rings/Buy Rings Near Me (3).webp' },
                    { name: 'Gold Ring Style 4', desc: 'Handcrafted with precision.', image: 'assets/images/Rings/Buy Rings Near Me (4).webp' },
                    { name: 'Gold Ring Style 5', desc: 'Luminous finish and lasting beauty.', image: 'assets/images/Rings/Buy Rings Near Me (5).webp' },
                    { name: 'Gold Ring Style 6', desc: 'Traditional artistry, modern appeal.', image: 'assets/images/Rings/Buy Rings Near Me (6).webp' },
                    { name: 'Gold Ring Style 7', desc: 'Elegant contours and warm glow.', image: 'assets/images/Rings/Buy Rings Near Me (7).webp' },
                    { name: 'Gold Ring Style 8', desc: 'Crafted for daily wear.', image: 'assets/images/Rings/Buy Rings Near Me (8).webp' },
                    { name: 'Gold Ring Style 9', desc: 'Statement piece in 22K gold.', image: 'assets/images/Rings/Buy Rings Near Me (9).webp' },
                    { name: 'Gold Ring Style 10', desc: 'Refined detailing and shine.', image: 'assets/images/Rings/Buy Rings Near Me (10).webp' },
                    { name: 'Gold Ring Style 11', desc: 'Heritage-inspired design.', image: 'assets/images/Rings/Buy Rings Near Me (11).webp' },
                    { name: 'Gold Ring Style 12', desc: 'Polished brilliance for you.', image: 'assets/images/Rings/Buy Rings Near Me (12).webp' },
                    { name: 'Gold Ring Style 13', desc: 'Premium gold, enduring style.', image: 'assets/images/Rings/Buy Rings Near Me (13).webp' }
                ],
                Necklaces: [
                    { name: 'Royal Necklace', desc: 'Graceful drape with a warm glow.', image: 'assets/images/Necklaces/Necklace_1.webp' },
                    { name: 'Crescent Drop', desc: 'Refined silhouette for evening wear.', image: 'assets/images/Necklaces/Necklace_3.webp' },
                    { name: 'Everyday Luxe', desc: 'Lightweight elegance for daily wear.', image: 'assets/images/Necklaces/Necklace_4.webp' },
                    { name: 'Gold Necklace Style 1', desc: 'Elegant 22K gold drape.', image: 'assets/images/Necklaces/buy necklaces near me (1).webp' },
                    { name: 'Gold Necklace Style 2', desc: 'Graceful design for special moments.', image: 'assets/images/Necklaces/buy necklaces near me (2).webp' },
                    { name: 'Gold Necklace Style 3', desc: 'Traditional craftsmanship in gold.', image: 'assets/images/Necklaces/buy necklaces near me (3).webp' },
                    { name: 'Gold Necklace Style 4', desc: 'Refined silhouette and warm glow.', image: 'assets/images/Necklaces/buy necklaces near me (4).webp' },
                    { name: 'Gold Necklace Style 5', desc: 'Handcrafted with intricate detail.', image: 'assets/images/Necklaces/buy necklaces near me (5).webp' },
                    { name: 'Gold Necklace Style 6', desc: 'Statement piece for celebrations.', image: 'assets/images/Necklaces/buy necklaces near me (6).webp' },
                    { name: 'Gold Necklace Style 7', desc: 'Luminous 22K gold elegance.', image: 'assets/images/Necklaces/buy necklaces near me (7).webp' },
                    { name: 'Gold Necklace Style 8', desc: 'Classic design, lasting beauty.', image: 'assets/images/Necklaces/buy necklaces near me (8).webp' },
                    { name: 'Gold Necklace Style 9', desc: 'Refined for everyday or occasion.', image: 'assets/images/Necklaces/buy necklaces near me (9).webp' },
                    { name: 'Gold Necklace Style 10', desc: 'Heritage-inspired elegance.', image: 'assets/images/Necklaces/buy necklaces near me (10).webp' },
                    { name: 'Gold Necklace Style 11', desc: 'Sculpted curves and soft shine.', image: 'assets/images/Necklaces/buy necklaces near me (11).webp' },
                    { name: 'Gold Necklace Style 12', desc: 'Premium gold, timeless style.', image: 'assets/images/Necklaces/buy necklaces near me (12).webp' },
                    { name: 'Gold Necklace Style 13', desc: 'Artisan-crafted for you.', image: 'assets/images/Necklaces/buy necklaces near me (13).webp' },
                    { name: 'Gold Necklace Style 14', desc: 'Elegant drape and detailing.', image: 'assets/images/Necklaces/buy necklaces near me (14).webp' },
                    { name: 'Gold Necklace Style 15', desc: 'Bridal and festival ready.', image: 'assets/images/Necklaces/buy necklaces near me (15).webp' },
                    { name: 'Gold Necklace Style 16', desc: 'Refined brilliance in gold.', image: 'assets/images/Necklaces/buy necklaces near me (16).webp' },
                    { name: 'Gold Necklace Style 17', desc: 'Classic silhouette, modern finish.', image: 'assets/images/Necklaces/buy necklaces near me (17).webp' },
                    { name: 'Gold Necklace Style 18', desc: 'Hand-finished with care.', image: 'assets/images/Necklaces/buy necklaces near me (18).webp' },
                    { name: 'Gold Necklace Style 19', desc: 'Luxury jewellery for every moment.', image: 'assets/images/Necklaces/buy necklaces near me (19).webp' }
                ],
                Chains: [
                    { name: 'Classic Gold Chain', desc: 'Smooth links with a rich finish.', image: 'assets/images/Chains/Chain_1.webp' },
                    { name: 'Heritage Link', desc: 'Traditional craftsmanship, modern feel.', image: 'assets/images/Chains/Chain_2.webp' },
                    { name: 'Signature Rope', desc: 'Subtle shine with layered styling.', image: 'assets/images/Chains/Chain_3.webp' },
                    { name: 'Gold Link Chain', desc: 'Refined links with lasting lustre.', image: 'assets/images/Chains/Chain_4.webp' },
                    { name: 'Elegant Rope Chain', desc: 'Smooth finish for daily wear.', image: 'assets/images/Chains/Chain_5.webp' },
                    { name: 'Classic Cable Chain', desc: 'Timeless design in 22K gold.', image: 'assets/images/Chains/Chain_6.webp' },
                    { name: 'Premium Gold Chains', desc: 'Curated selection of fine chains.', image: 'assets/images/Chains/Buy gold chains.webp' }
                ],
                Bangles: [
                    { name: 'Royal Bangles', desc: 'Ornate 22K gold artistry.', image: 'assets/images/Bangles/Bangles_1.webp' },
                    { name: 'Golden Embrace', desc: 'Sculpted shine with gentle curves.', image: 'assets/images/Bangles/Bangles_2.webp' },
                    { name: 'Festive Stack', desc: 'Layered brilliance for celebrations.', image: 'assets/images/Bangles/Bangles_3.webp' },
                    { name: 'Heritage Bangles', desc: 'Traditional design with refined finish.', image: 'assets/images/Bangles/Bangles_4.webp' },
                    { name: 'Elegant Stack', desc: 'Curved gold for layered style.', image: 'assets/images/Bangles/Bangles_5.webp' },
                    { name: 'Classic Gold Bangles', desc: 'Handcrafted 22K gold bangles.', image: 'assets/images/Bangles/Bangles_6.webp' },
                    { name: 'Gold Bangles Style 1', desc: 'Ornate 22K gold craftsmanship.', image: 'assets/images/Bangles/Buy Bangles Near Me (1).webp' },
                    { name: 'Gold Bangles Style 2', desc: 'Sculpted curves and warm glow.', image: 'assets/images/Bangles/Buy Bangles Near Me (2).webp' },
                    { name: 'Gold Bangles Style 3', desc: 'Festive stack for celebrations.', image: 'assets/images/Bangles/Buy Bangles Near Me (3).webp' },
                    { name: 'Gold Bangles Style 4', desc: 'Traditional artistry in gold.', image: 'assets/images/Bangles/Buy Bangles Near Me (4).webp' },
                    { name: 'Gold Bangles Style 5', desc: 'Refined detailing and shine.', image: 'assets/images/Bangles/Buy Bangles Near Me (5).webp' },
                    { name: 'Gold Bangles Style 6', desc: 'Elegant pair for every occasion.', image: 'assets/images/Bangles/Buy Bangles Near Me (6).webp' },
                    { name: 'Gold Bangles Style 7', desc: 'Hand-finished with precision.', image: 'assets/images/Bangles/Buy Bangles Near Me (7).webp' },
                    { name: 'Gold Bangles Style 8', desc: 'Layered brilliance in 22K gold.', image: 'assets/images/Bangles/Buy Bangles Near Me (8).webp' },
                    { name: 'Gold Bangles Style 9', desc: 'Classic design, lasting beauty.', image: 'assets/images/Bangles/Buy Bangles Near Me (9).webp' },
                    { name: 'Gold Bangles Style 10', desc: 'Bridal and festival ready.', image: 'assets/images/Bangles/Buy Bangles Near Me (10).webp' },
                    { name: 'Gold Bangles Style 11', desc: 'Premium gold bangle pair.', image: 'assets/images/Bangles/Buy Bangles Near Me (11).webp' },
                    { name: 'Gold Bangles Style 12', desc: 'Graceful curves and soft glow.', image: 'assets/images/Bangles/Buy Bangles Near Me (12).webp' },
                    { name: 'Gold Bangles Style 13', desc: 'Artisan-crafted elegance.', image: 'assets/images/Bangles/Buy Bangles Near Me (13).webp' },
                    { name: 'Gold Bangles Style 14', desc: 'Refined stack for daily wear.', image: 'assets/images/Bangles/Buy Bangles Near Me (14).webp' },
                    { name: 'Gold Bangles Style 15', desc: 'Heritage-inspired design.', image: 'assets/images/Bangles/Buy Bangles Near Me (15).webp' },
                    { name: 'Gold Bangles Style 16', desc: 'Statement bangles in gold.', image: 'assets/images/Bangles/Buy Bangles Near Me (16).webp' },
                    { name: 'Gold Bangles Style 17', desc: 'Luminous finish and detail.', image: 'assets/images/Bangles/Buy Bangles Near Me (17).webp' },
                    { name: 'Gold Bangles Style 18', desc: 'Timeless 22K gold artistry.', image: 'assets/images/Bangles/Buy Bangles Near Me (18).webp' }
                ],
                Bracelets: [
                    { name: 'Gold Link Bracelet', desc: 'Refined detailing with a soft glow.', image: 'assets/images/Bracelets/Bracelet1.webp' },
                    { name: 'Elegant Cuff', desc: 'Statement craftsmanship in 22K gold.', image: 'assets/images/Bracelets/Bracelet2.webp' },
                    { name: 'Delicate Chain', desc: 'Minimal sophistication for all-day wear.', image: 'assets/images/Bracelets/Bracelet3.webp' },
                    { name: 'Gold Bracelet Style 1', desc: 'Handcrafted 22K gold bracelet.', image: 'assets/images/Bracelets/Buy gold bracelet (1).webp' },
                    { name: 'Gold Bracelet Style 2', desc: 'Elegant links with rich finish.', image: 'assets/images/Bracelets/Buy gold bracelet (2).webp' },
                    { name: 'Gold Bracelet Style 3', desc: 'Refined design for every occasion.', image: 'assets/images/Bracelets/Buy gold bracelet (3).webp' },
                    { name: 'Gold Bracelet Style 4', desc: 'Classic craftsmanship in gold.', image: 'assets/images/Bracelets/Buy gold bracelet (4).webp' }
                ]
            }
        },
        'diamond-jewellery': {
            name: 'Diamond Jewellery',
            title: 'Diamond Jewellery',
            intro: 'Experience refined brilliance with diamonds selected for clarity and fire, set in designs that elevate every occasion.',
            store_location: 'Surrey, BC',
            category_keyword: 'Diamond Jewellery in Surrey',
            brand_name: 'Bharat Jewellers',
            category_description: 'Discover diamond jewellery in Surrey, BC, selected for clarity and fire, from rings and earrings to pendants, bracelets, and coordinated sets.',
            aboutParagraphs: [
                'Bharat Jewellers brings you premium diamond jewellery in Surrey, featuring handcrafted pieces set with certified stones. Our collection balances luxury jewellery design with everyday wearability, from engagement rings to earrings and pendants.',
                'Each diamond is chosen for clarity and cut, then set by skilled artisans. As a trusted jeweller in Surrey, we offer certified jewellery with transparent pricing and a personalized in-store experience.',
                'Visit our Surrey store to explore diamond rings, bracelets, and sets. Whether for an engagement, anniversary, or a special occasion, our diamond jewellery collection delivers refined brilliance you can rely on.'
            ],
            seoAboutImage: 'assets/images/Homepage/Diamond-Jewellery-Collections.webp',
            seoWhyChooseImage: 'assets/images/Earrings/Earrings_1.webp',
            whyChooseBullets: [
                'Expert craftsmanship and premium diamond selection',
                'Certified and hallmarked jewellery with authenticated stones',
                'Trusted jewellery store in Surrey, BC',
                'Personalized guidance for engagement and special occasions',
                'Wide collection of premium diamond jewellery for every moment'
            ],
            heroImage: 'assets/images/Earrings/Earrings_1.webp',
            highlight: {
                title: 'Discover Your Signature Diamond Jewellery',
                text: 'Illuminate every moment with diamonds selected for clarity, brilliance, and refined elegance.',
                buttonText: 'Visit Our Store',
                buttonLink: 'contact.html',
                image: 'assets/images/Earrings/Earrings_2.webp',
                mediaImage: 'assets/images/Earrings/Earrings_2.webp'
            },
            details: {
                title: 'Brilliance in Every Detail',
                text: 'Our diamond collections pair exceptional stones with meticulous craftsmanship for an elevated finish.',
                blurbs: [
                    { title: 'Traditional Workmanship' },
                    { title: 'Handcrafted Detailing' },
                    { title: 'Hallmark Certified' },
                    { title: 'Unmatched Purity' }
                ]
            },
            filters: ['Rings', 'Earrings', 'Pendants', 'Bracelets', 'Sets'],
            items: {
                Rings: [
                    { name: 'Eternal Spark Ring', desc: 'Radiant cut with precise setting.', image: 'assets/images/Rings/Ring_5.webp' },
                    { name: 'Halo Solitaire', desc: 'Elegant brilliance from every angle.', image: 'assets/images/Rings/Ring_6.webp' },
                    { name: 'Classic Diamond Band', desc: 'Subtle sparkle for daily elegance.', image: 'assets/images/Rings/Ring_7.webp' }
                ],
                Earrings: [
                    { name: 'Luminous Drops', desc: 'Graceful shine with refined detailing.', image: 'assets/images/Earrings/Earrings_3.webp' },
                    { name: 'Stud Radiance', desc: 'Minimal brilliance, maximum glow.', image: 'assets/images/Earrings/Earrings_4.webp' },
                    { name: 'Evening Spark', desc: 'Bold elegance for special nights.', image: 'assets/images/Earrings/Earrings_5.webp' },
                    { name: 'Diamond Drop Earrings', desc: 'Elegant sparkle for every occasion.', image: 'assets/images/Earrings/Earrings_6.webp' },
                    { name: 'Diamond Earrings Style 1', desc: 'Refined brilliance and clarity.', image: 'assets/images/Earrings/Buy Earrings near me (1).webp' },
                    { name: 'Diamond Earrings Style 2', desc: 'Graceful shine with certified stones.', image: 'assets/images/Earrings/Buy Earrings near me (2).webp' },
                    { name: 'Diamond Earrings Style 3', desc: 'Handcrafted sparkle for you.', image: 'assets/images/Earrings/Buy Earrings near me (3).webp' },
                    { name: 'Diamond Earrings Style 4', desc: 'Elegant design with lasting fire.', image: 'assets/images/Earrings/Buy Earrings near me (4).webp' },
                    { name: 'Diamond Earrings Style 5', desc: 'Premium diamonds, refined setting.', image: 'assets/images/Earrings/Buy Earrings near me (5).webp' },
                    { name: 'Diamond Earrings Style 6', desc: 'Statement earrings for special moments.', image: 'assets/images/Earrings/Buy Earrings near me (6).webp' },
                    { name: 'Diamond Earrings Style 7', desc: 'Timeless elegance in diamond.', image: 'assets/images/Earrings/Buy Earrings near me (7).webp' }
                ],
                Pendants: [
                    { name: 'Brilliant Pendant', desc: 'Refined shimmer with clean lines.', image: 'assets/images/Necklaces/Necklace_5.webp' },
                    { name: 'Celestial Drop', desc: 'Soft sparkle with timeless appeal.', image: 'assets/images/Necklaces/Necklace_6.webp' },
                    { name: 'Diamond Halo', desc: 'Elevated centerpiece for every look.', image: 'assets/images/Necklaces/Necklace_7.webp' }
                ],
                Bracelets: [
                    { name: 'Diamond Tennis Bracelet', desc: 'Continuous brilliance in motion.', image: 'assets/images/Bracelets/Bracelet4.webp' },
                    { name: 'Radiant Cuff', desc: 'Sculpted light with a sleek profile.', image: 'assets/images/Bracelets/Bracelet5.webp' },
                    { name: 'Classic Line', desc: 'Polished sparkle for evenings out.', image: 'assets/images/Bracelets/Bracelet6.webp' }
                ],
                Sets: [
                    { name: 'Diamond Set', desc: 'Coordinated brilliance for celebrations.', image: 'assets/images/Necklaces/Necklace_3.webp' },
                    { name: 'Evening Ensemble', desc: 'Graceful pairings with lasting glow.', image: 'assets/images/Necklaces/Necklace_4.webp' },
                    { name: 'Signature Set', desc: 'Curated sparkle with refined details.', image: 'assets/images/Necklaces/Necklace_5.webp' }
                ]
            }
        },
        'bridal-sets': {
            name: 'Bridal Sets',
            title: 'Bridal Sets',
            intro: 'Celebrate your most cherished moments with bridal sets crafted in gold and diamonds, designed for timeless elegance.',
            store_location: 'Surrey, BC',
            category_keyword: 'Bridal Jewellery Collection in Surrey',
            brand_name: 'Bharat Jewellers',
            category_description: 'Bridal sets in Surrey, BC crafted in gold and diamonds, from necklace and polki sets to reception and ceremony jewellery, with custom options available.',
            aboutParagraphs: [
                'Bharat Jewellers offers a premium bridal jewellery collection in Surrey, blending handcrafted gold and diamond sets with traditional and contemporary design. Each piece is certified jewellery, crafted for weddings and special occasions.',
                'From necklace sets and polki to reception and ceremony wear, our bridal collection delivers luxury jewellery tailored to your style. Visit our jewellery store in Surrey to try on sets and receive a personalized experience.',
                'As a trusted jeweller in Surrey, we combine expert craftsmanship with certified materials. Whether you need a complete bridal set or custom touches, our team helps you find the perfect premium jewellery for your day.'
            ],
            seoAboutImage: 'assets/images/Homepage/Gold-Bridal-Sets.webp',
            seoWhyChooseImage: 'assets/images/Collections/bridal-gold-diamond-jewellery-sets-bharat-jewellers.webp',
            whyChooseBullets: [
                'Expert craftsmanship and premium materials for bridal sets',
                'Certified and hallmarked gold and diamond jewellery',
                'Trusted jewellery store in Surrey, BC for wedding jewellery',
                'Personalized bridal consultation and fitting experience',
                'Wide collection for weddings, receptions, and special occasions'
            ],
            heroImage: 'assets/images/Homepage/Gold-Bridal-Sets.webp',
            highlight: {
                title: 'Discover Your Dream Bridal Set',
                text: 'Celebrate your most cherished moments with radiant sets crafted for timeless elegance.',
                buttonText: 'Contact Us',
                buttonLink: '/contact',
                image: 'assets/images/Collections/bridal-gold-diamond-jewellery-sets-bharat-jewellers.webp',
                mediaImage: 'assets/images/Collections/bridal-gold-diamond-jewellery-sets-bharat-jewellers.webp'
            },
            details: {
                title: 'Bridal Craftsmanship, Elevated',
                text: 'Our bridal sets blend heritage artistry with refined modern accents for unforgettable moments.',
                blurbs: [
                    { title: 'Traditional Workmanship' },
                    { title: 'Handcrafted Detailing' },
                    { title: 'Hallmark Certified' },
                    { title: 'Unmatched Purity' }
                ]
            },
            filters: ['Necklace Sets', 'Polki Sets', 'Reception', 'Ceremony', 'Custom'],
            items: {
                'Necklace Sets': [
                    { name: 'Regal Bridal Set', desc: 'Statement pieces with heirloom appeal.', image: 'assets/images/Collections/bridal-gold-diamond-jewellery-sets-bharat-jewellers.webp' },
                    { name: 'Golden Heritage', desc: 'Traditional craftsmanship with depth.', image: 'assets/images/Homepage/bharat-jewellers-bridal-gold-necklace-set.webp' },
                    { name: 'Radiant Ensemble', desc: 'Balanced elegance for bridal moments.', image: 'assets/images/Collections/gold-necklaces-fine-craftsmanship-bharat-jewellers.webp' }
                ],
                'Polki Sets': [
                    { name: 'Royal Polki Set', desc: 'Vintage-inspired brilliance.', image: 'assets/images/Collections/bridal-gold-diamond-jewellery-sets-bharat-jewellers.webp' },
                    { name: 'Heritage Polki', desc: 'Classic details with refined shine.', image: 'assets/images/Collections/gold-pendants-elegant-design-bharat-jewellers.webp' },
                    { name: 'Majestic Polki', desc: 'Hand-finished artistry for the bride.', image: 'assets/images/Homepage/bharat-jewellers-bridal-gold-necklace-set.webp' }
                ],
                Reception: [
                    { name: 'Evening Radiance', desc: 'Bold sparkle for grand entrances.', image: 'assets/images/Homepage/bharat-jewellers-diamond-jewellery-gifting.webp' },
                    { name: 'Luxe Reception Set', desc: 'Modern silhouettes with heritage charm.', image: 'assets/images/Collections/bridal-gold-diamond-jewellery-sets-bharat-jewellers.webp' },
                    { name: 'Golden Glow', desc: 'Warm finishes for evening celebrations.', image: 'assets/images/Collections/gold-necklaces-fine-craftsmanship-bharat-jewellers.webp' }
                ],
                Ceremony: [
                    { name: 'Ceremony Classic', desc: 'Graceful gold for sacred moments.', image: 'assets/images/Homepage/bharat-jewellers-bridal-gold-necklace-set.webp' },
                    { name: 'Vows in Gold', desc: 'Timeless elegance with intricate detail.', image: 'assets/images/Collections/bridal-gold-diamond-jewellery-sets-bharat-jewellers.webp' },
                    { name: 'Heritage Ceremony', desc: 'Crafted to honor tradition.', image: 'assets/images/Collections/gold-pendants-elegant-design-bharat-jewellers.webp' }
                ],
                Custom: [
                    { name: 'Bespoke Bridal', desc: 'Designed with you, for you.', image: 'assets/images/Collections/custom-made-gold-diamond-jewellery-bharat-jewellers.webp' },
                    { name: 'Artisan Custom Set', desc: 'Handcrafted with personal touches.', image: 'assets/images/Homepage/bharat-jewellers-custom-gold-jewellery-design.webp' },
                    { name: 'Signature Bridal', desc: 'Custom fit, heirloom worthy.', image: 'assets/images/Collections/bridal-gold-diamond-jewellery-sets-bharat-jewellers.webp' }
                ]
            }
        },
        'custom-jewellery': {
            name: 'Custom Jewellery',
            title: 'Custom Jewellery',
            intro: 'Bring your vision to life with bespoke jewellery designed with our artisans, from concept to finishing.',
            store_location: 'Surrey, BC',
            category_keyword: 'Custom Jewellery Design in Surrey',
            brand_name: 'Bharat Jewellers',
            category_description: 'Design bespoke jewellery in Surrey, BC with our artisans, from concept and sketch to crafting, finishing, and final presentation.',
            aboutParagraphs: [
                'Bharat Jewellers offers custom jewellery design in Surrey, where handcrafted pieces are created from your vision. Our premium jewellery process combines expert craftsmanship with certified materials and a personalized experience at our jewellery store in Surrey.',
                'From initial sketch to final polish, our artisans work with you to create one-of-a-kind rings, necklaces, and sets. We use certified jewellery standards and luxury materials, making us a trusted jeweller in Surrey for bespoke design.',
                'Visit our Surrey showroom to start your custom jewellery journey. Whether repurposing heirlooms or creating something new, we deliver handcrafted jewellery tailored to your story and occasion.'
            ],
            seoAboutImage: 'assets/images/Homepage/Custom-Jewellery-Surrey-BC.webp',
            seoWhyChooseImage: 'assets/images/Collections/custom-made-gold-diamond-jewellery-bharat-jewellers.webp',
            whyChooseBullets: [
                'Expert craftsmanship and bespoke design from concept to finish',
                'Certified gold, diamonds, and gemstones for your custom piece',
                'Trusted jewellery store in Surrey, BC for custom design',
                'Personalized consultation and one-on-one design experience',
                'Handcrafted jewellery for engagements, weddings, and special occasions'
            ],
            heroImage: 'assets/images/Homepage/Custom-Jewellery-Surrey-BC.webp',
            highlight: {
                title: 'Create Your Bespoke Jewellery',
                text: 'Transform personal stories into handcrafted jewellery designed exclusively for you.',
                buttonText: 'Start Your Design',
                buttonLink: 'contact.html',
                image: 'assets/images/Collections/custom-made-gold-diamond-jewellery-bharat-jewellers.webp',
                mediaImage: 'assets/images/Collections/custom-made-gold-diamond-jewellery-bharat-jewellers.webp'
            },
            details: {
                title: 'Bespoke from Concept to Finish',
                text: 'Collaborate with our artisans to craft a piece that reflects your vision and celebrates your story.',
                blurbs: [
                    { title: 'Traditional Workmanship' },
                    { title: 'Handcrafted Detailing' },
                    { title: 'Hallmark Certified' },
                    { title: 'Unmatched Purity' }
                ]
            },
            filters: ['Design Guidance', 'Design', 'Crafting', 'Finishing', 'Delivery'],
            items: {
                'Design Guidance': [
                    { name: 'Design Guidance', desc: 'One-on-one guidance from experts.', image: 'assets/images/Homepage/bharat-jewellers-custom-gold-jewellery-design.webp' },
                    { name: 'Gem Selection', desc: 'Choose stones and materials with care.', image: 'assets/images/Collections/gold-diamond-rings-bharat-jewellers.webp' },
                    { name: 'Concept Planning', desc: 'Bring ideas to a refined design brief.', image: 'assets/images/Collections/gold-necklaces-fine-craftsmanship-bharat-jewellers.webp' }
                ],
                Design: [
                    { name: 'Sketch &amp; Render', desc: 'Visualize your design in detail.', image: 'assets/images/Homepage/bharat-jewellers-custom-gold-jewellery-design.webp' },
                    { name: 'Bespoke Blueprint', desc: 'Precision planning for your piece.', image: 'assets/images/Collections/custom-made-gold-diamond-jewellery-bharat-jewellers.webp' },
                    { name: 'Personalized Details', desc: 'Every detail made to order.', image: 'assets/images/Collections/bridal-gold-diamond-jewellery-sets-bharat-jewellers.webp' }
                ],
                Crafting: [
                    { name: 'Artisan Craft', desc: 'Traditional skills with modern tools.', image: 'assets/images/Collections/custom-made-gold-diamond-jewellery-bharat-jewellers.webp' },
                    { name: 'Goldsmith Work', desc: 'Shaping precious metals with care.', image: 'assets/images/Collections/elegant-gold-chains-bharat-jewellers.webp' },
                    { name: 'Stone Setting', desc: 'Precision placement and balance.', image: 'assets/images/Collections/gold-diamond-bracelets-bharat-jewellers.webp' }
                ],
                Finishing: [
                    { name: 'Final Polish', desc: 'Luminous finish with refined detail.', image: 'assets/images/Collections/gold-pendants-elegant-design-bharat-jewellers.webp' },
                    { name: 'Quality Review', desc: 'Every piece inspected to perfection.', image: 'assets/images/Homepage/bharat-jewellers-diamond-jewellery-gifting.webp' },
                    { name: 'Signature Touch', desc: 'Crafted for a lasting impression.', image: 'assets/images/Collections/bridal-gold-diamond-jewellery-sets-bharat-jewellers.webp' }
                ],
                Delivery: [
                    { name: 'Presentation Box', desc: 'Luxury presentation for your piece.', image: 'assets/images/Collections/luxury-gold-diamond-earrings-bharat-jewellers.webp' },
                    { name: 'Personal Handover', desc: 'A special moment, beautifully delivered.', image: 'assets/images/Homepage/bharat-jewellers-everyday-gold-necklace-women.webp' },
                    { name: 'Aftercare Guidance', desc: 'Support to keep it radiant.', image: 'assets/images/Collections/gold-diamond-bracelets-bharat-jewellers.webp' }
                ]
            }
        }
    };

    const params = new URLSearchParams(window.location.search);
    const explicitKey = (typeof window !== 'undefined' && window.__BJ_CATEGORY__) || null;
    let categoryKey = explicitKey || params.get('category') || 'gold-jewellery';

    const category = categories[categoryKey] || categories['gold-jewellery'];

    if (typeof document !== 'undefined') {
        document.title = `${category.title} Collection - Bharat Jewellers`;
    }

    const hero = document.getElementById('category-hero');
    const badge = document.getElementById('category-badge');
    const title = document.getElementById('category-title');
    const intro = document.getElementById('category-intro');
    const filtersWrap = document.getElementById('category-filters');
    const grid = document.getElementById('jewellery-grid');
    const highlight = document.getElementById('category-highlight');
    const highlightTitle = document.getElementById('category-highlight-title');
    const highlightText = document.getElementById('category-highlight-text');
    const highlightButton = document.getElementById('category-highlight-button');
    const detailsTitle = document.getElementById('category-details-title');
    const detailsText = document.getElementById('category-details-text');
    const blurbGrid = document.getElementById('category-blurb-grid');

    if (!hero || !badge || !title || !intro || !filtersWrap || !grid) return;

    hero.style.backgroundImage = `url("${category.heroImage}")`;
    badge.textContent = category.name;
    title.textContent = category.title;
    intro.textContent = category.intro;

    if (highlight && category.highlight) {
        highlight.style.backgroundImage = `url("${category.highlight.image}")`;
    }
    if (highlightTitle) {
        highlightTitle.textContent = category.highlight.title;
    }
    if (highlightText) {
        highlightText.textContent = category.highlight.text;
    }
    if (highlightButton) {
        highlightButton.textContent = category.highlight.buttonText;
        highlightButton.setAttribute('href', category.highlight.buttonLink);
    }
    if (detailsTitle) {
        detailsTitle.textContent = category.details.title;
    }
    if (detailsText) {
        detailsText.textContent = category.details.text;
    }
    if (blurbGrid) {
        blurbGrid.innerHTML = category.details.blurbs.map((blurb) => {
            return `
            <div class="category-blurb">
                <div class="category-blurb-icon">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l7 3v6c0 4.2-3 7.8-7 9-4-1.2-7-4.8-7-9V6l7-3z"/><path d="M9.5 12.5l2 2 4-4"/></svg>
                </div>
                <div>
                    <h3>${blurb.title}</h3>
                </div>
            </div>
            `;
        }).join('');
    }

    // SEO sections: About (two-column), Why Choose (two-column reverse), Store locations (injected component)
    const seoCategoryName = document.getElementById('seo-category-name');
    const seoAboutP1 = document.getElementById('seo-about-p1');
    const seoAboutP2 = document.getElementById('seo-about-p2');
    const seoAboutP3 = document.getElementById('seo-about-p3');
    const seoAboutImage = document.getElementById('seo-about-image');
    const seoWhyHeading = document.getElementById('seo-why-heading');
    const seoBrandName = document.getElementById('seo-brand-name');
    const seoWhyCategoryName = document.getElementById('seo-why-category-name');
    const seoWhyList = document.getElementById('seo-why-list');
    const seoWhyImage = document.getElementById('seo-why-image');

    if (seoCategoryName) seoCategoryName.textContent = category.name;
    if (seoBrandName) seoBrandName.textContent = category.brand_name || 'Bharat Jewellers';
    if (seoWhyCategoryName) seoWhyCategoryName.textContent = category.name;

    if (category.aboutParagraphs && category.aboutParagraphs.length) {
        if (seoAboutP1) { seoAboutP1.textContent = category.aboutParagraphs[0]; seoAboutP1.style.display = ''; }
        if (seoAboutP2 && category.aboutParagraphs[1]) { seoAboutP2.textContent = category.aboutParagraphs[1]; seoAboutP2.style.display = ''; }
        if (seoAboutP3 && category.aboutParagraphs[2]) { seoAboutP3.textContent = category.aboutParagraphs[2]; seoAboutP3.style.display = ''; }
        else if (seoAboutP3) seoAboutP3.style.display = 'none';
    }

    if (seoAboutImage && category.seoAboutImage) {
        seoAboutImage.src = category.seoAboutImage;
        seoAboutImage.alt = category.name + ' – Bharat Jewellers';
    }

    if (seoWhyList && category.whyChooseBullets && category.whyChooseBullets.length) {
        seoWhyList.innerHTML = category.whyChooseBullets.map(function(bullet) {
            return '<li>' + bullet + '</li>';
        }).join('');
    }

    if (seoWhyImage && category.seoWhyChooseImage) {
        seoWhyImage.src = category.seoWhyChooseImage;
        seoWhyImage.alt = 'Why choose Bharat Jewellers for ' + category.name;
    }

    let activeFilter = 'All';

    const renderFilters = () => {
        filtersWrap.innerHTML = '';
        ['All', ...category.filters].forEach((filter) => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = `filter-button${filter === activeFilter ? ' is-active' : ''}`;
            button.textContent = filter;
            button.addEventListener('click', () => {
                activeFilter = filter;
                renderFilters();
                renderGrid();
            });
            filtersWrap.appendChild(button);
        });
    };

    const renderGrid = () => {
        const items = activeFilter === 'All'
            ? category.filters.flatMap((filter) => category.items[filter] || [])
            : (category.items[activeFilter] || []);
        grid.innerHTML = items.map((item) => {
            return `
            <article class="jewellery-card">
                <div class="jewellery-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
            </article>
            `;
        }).join('');
    };

    renderFilters();
    renderGrid();
})();
