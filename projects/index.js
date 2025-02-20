
// Shop data with detailed information
const shops = [
    {
        name: "ZARA Fashion House",
        description: "Contemporary fashion with European influence. Offering trendy clothing, accessories, and footwear for men and women.",
        details: "Open 10AM-9PM | Worldwide Shipping Available",
        image: "img/vogue.jpg",
        url: "https://zara.com"
    },
    {
        name: "Vintage Vogue",
        description: "Curated vintage and retro fashion pieces. Specializing in unique finds from the 50s to the 90s.",
        details: "Open 11AM-7PM | Personal Styling Available",
        image: "img/vogue1.jpeg",
        url: "https://vintagevogue.com"
    },
    {
        name: "Urban Threads",
        description: "Street style and urban fashion. Featuring local designers and exclusive collaborations.",
        details: "Open 10AM-8PM | Student Discounts Available",
        image: "/api/placeholder/400/250",
        url: "https://urbanthreads.com"
    },
    {
        name: "Luxe & Co",
        description: "Luxury fashion boutique featuring high-end designer collections and accessories.",
        details: "Open 10AM-7PM | VIP Shopping Experience",
        image: "/api/placeholder/400/250",
        url: "https://luxeandco.com"
    },
    {
        name: "Eco Fashion",
        description: "Sustainable and eco-friendly fashion. Ethically sourced materials and fair trade practices.",
        details: "Open 9AM-6PM | Carbon Neutral Shipping",
        image: "/api/placeholder/400/250",
        url: "https://ecofashion.com"
    },
    {
        name: "Style Hub",
        description: "Trendy fashion at affordable prices. New arrivals weekly and seasonal collections.",
        details: "Open 10AM-9PM | Loyalty Program Available",
        image: "/api/placeholder/400/250",
        url: "https://stylehub.com"
    },
    {
        name: "Designer's Den",
        description: "Exclusive designer boutique featuring upcoming and established fashion designers.",
        details: "Open 11AM-8PM | Private Shopping Sessions",
        image: "/api/placeholder/400/250",
        url: "https://designersden.com"
    },
    {
        name: "Fashion Forward",
        description: "Contemporary fashion with a focus on emerging trends and innovative designs.",
        details: "Open 10AM-7PM | Fashion Advisory Services",
        image: "/api/placeholder/400/250",
        url: "https://fashionforward.com"
    },
    {
        name: "Minimalist Mode",
        description: "Clean, minimalist fashion focusing on quality basics and timeless pieces.",
        details: "Open 10AM-6PM | Capsule Wardrobe Services",
        image: "/api/placeholder/400/250",
        url: "https://minimalistmode.com"
    },
    {
        name: "Accessory Avenue",
        description: "Specialized in fashion accessories, jewelry, and statement pieces.",
        details: "Open 9AM-7PM | Custom Orders Available",
        image: "/api/placeholder/400/250",
        url: "https://accessoryavenue.com"
    }
];

// Initialize variables and elements
let currentIndex = 0;
let filteredShops = [...shops];
const cardWrapper = document.getElementById('cardWrapper');
const searchInput = document.getElementById('searchInput');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Create and render shop cards
function createShopCards() {
    cardWrapper.innerHTML = '';
    filteredShops.forEach((shop, index) => {
        const card = document.createElement('div');
        card.className = `shop-card ${index === currentIndex ? 'active' : ''}`;
        card.innerHTML = `
            <img src="${shop.image}" alt="${shop.name}">
            <div class="shop-name">${shop.name}</div>
            <div class="shop-description">${shop.description}</div>
            <div class="shop-details">${shop.details}</div>
        `;
        card.addEventListener('click', () => window.location.href = shop.url);
        cardWrapper.appendChild(card);
    });
}

// Navigation functions
function showCard(index) {
    document.querySelectorAll('.shop-card').forEach((card, i) => {
        card.className = `shop-card ${i === index ? 'active' : ''}`;
    });
}

function nextCard() {
    currentIndex = (currentIndex + 1) % filteredShops.length;
    showCard(currentIndex);
}

function prevCard() {
    currentIndex = (currentIndex - 1 + filteredShops.length) % filteredShops.length;
    showCard(currentIndex);
}

// Search functionality
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    filteredShops = shops.filter(shop => 
        shop.name.toLowerCase().includes(searchTerm) || 
        shop.description.toLowerCase().includes(searchTerm)
    );
    currentIndex = 0;
    createShopCards();
});

// Touch swipe functionality
let touchStartX = 0;
let touchEndX = 0;

cardWrapper.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

cardWrapper.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const swipeLength = touchEndX - touchStartX;
    
    if (Math.abs(swipeLength) > swipeThreshold) {
        if (swipeLength > 0) {
            prevCard();
        } else {
            nextCard();
        }
    }
}

// Button navigation
prevBtn.addEventListener('click', prevCard);
nextBtn.addEventListener('click', nextCard);

// Initialize the cards
createShopCards();
