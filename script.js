
// --- Data ---
const STORE_PHONE = '5581998434359';

// 1. SOPAS DO CARDÁPIO ROTATIVO
const rawSoups = [
    {
        id: 'sopa_carne',
        name: 'Sopa de Carne',
        description: 'Tradicional, com pedaços suculentos de carne e legumes da terra.',
        image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=1000&auto=format&fit=crop',
        rating: 5,
        category: 'sopa',
        ingredients: ['Carne de Sol', 'Batata', 'Cenoura', 'Chuchu', 'Temperos Regionais']
    },
    {
        id: 'caldo_macaxeira',
        name: 'Caldo de Macaxeira',
        description: 'Bem grosso, do jeito que o sertanejo gosta. Acompanha charque desfiada.',
        image: 'https://images.unsplash.com/photo-1613844237701-8f3664fc2393?q=80&w=1000&auto=format&fit=crop',
        rating: 5,
        category: 'caldo',
        ingredients: ['Macaxeira', 'Charque', 'Leite de Coco', 'Coentro']
    },
    {
        id: 'canja',
        name: 'Canja de Galinha',
        description: 'A clássica que cura qualquer mal-estar. Frango caipira selecionado.',
        image: 'https://images.unsplash.com/photo-1604152135912-04a022e23696?q=80&w=1000&auto=format&fit=crop',
        rating: 5,
        category: 'sopa',
        ingredients: ['Frango', 'Arroz', 'Legumes', 'Salsinha']
    },
    {
        id: 'feijao_preto',
        name: 'Sopa de Feijão Preto',
        description: 'Forte e saborosa, feita com feijão preto temperado e bacon.',
        image: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?q=80&w=1000&auto=format&fit=crop',
        rating: 4,
        category: 'sopa',
        ingredients: ['Feijão Preto', 'Bacon', 'Alho', 'Cebolinha']
    },
    {
        id: 'alho_poro',
        name: 'Sopa de Alho-Poró',
        description: 'Cremosa e suave, com o toque especial da casa e ervas finas.',
        image: 'https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?q=80&w=1000&auto=format&fit=crop',
        rating: 4,
        category: 'creme',
        ingredients: ['Alho-poró', 'Creme de Leite', 'Batata Doce', 'Parmesão']
    },
    {
        id: 'mocoto',
        name: 'Sopa de Mocotó',
        description: 'energia pura! Caldo rico e gelatinoso para levantar o ânimo.',
        image: 'https://guiadacozinha.com.br/wp-content/uploads/2019/10/caldo-de-mocoto-simples.jpg',
        rating: 5,
        category: 'sopa',
        ingredients: ['Mocotó', 'Feijão Branco', 'Tomate', 'Pimentão']
    },
    {
        id: 'camarao',
        name: 'Sopa de Camarão',
        description: 'O sabor do mar com o tempero do sertão. Cremosa e sofisticada.',
        image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?q=80&w=1000',
        rating: 5,
        category: 'sopa',
        ingredients: ['Camarão', 'Leite de Coco', 'Azeite de Dendê', 'Coentro']
    }
];

// Helper to get soup by ID and add standard price
const getSoup = (id) => {
    const s = rawSoups.find(i => i.id === id);
    if (s) return { ...s, price: 13.00 }; // Todas as sopas custam 13
    return null;
};

// 2. DEFINIÇÃO DO CARDÁPIO SEMANAL
const WEEKLY_MENU = [
    { day: 'Segunda', soups: [getSoup('sopa_carne'), getSoup('caldo_macaxeira')] },
    { day: 'Terça', soups: [getSoup('sopa_carne'), getSoup('canja'), getSoup('caldo_macaxeira')] },
    { day: 'Quarta', soups: [getSoup('sopa_carne'), getSoup('feijao_preto'), getSoup('caldo_macaxeira')] },
    { day: 'Quinta', soups: [getSoup('sopa_carne'), getSoup('alho_poro'), getSoup('caldo_macaxeira')] },
    { day: 'Sexta', soups: [getSoup('sopa_carne'), getSoup('mocoto'), getSoup('caldo_macaxeira')] },
    { day: 'Sábado', soups: [getSoup('sopa_carne'), getSoup('camarao'), getSoup('caldo_macaxeira')] }
].filter(d => d.soups.every(s => s)); // Filter out any nulls if typos

// 3. COMIDAS DA CASA (DIÁRIAS)
const DAILY_SPECIALS = [
    {
        id: 'cuscuz_peitinho',
        name: 'Cuscuz Peitinho',
        description: 'Fofinho, servido quentinho com manteiga da terra.',
        price: 12.00,
        image: 'https://p2.trrsf.com/image/fget/cf/940/0/images.terra.com/2022/03/17/cuscuz-nordestino-original-768x512.jpg',
        category: 'comida'
    },
    {
        id: 'tapioca',
        name: 'Tapioca',
        description: 'Goma fresquinha, recheada com queijo coalho e coco.',
        price: 10.00,
        image: 'https://static.itdg.com.br/images/1200-630/b0559648943715dfa3b42674e2593b48/tapioca.jpg',
        category: 'comida'
    },
    {
        id: 'macaxeira_carne_sol',
        name: 'Macaxeira com Carne de Sol',
        description: 'Aipim macio derretendo com carne de sol acebolada.',
        price: 16.00,
        image: 'https://media-cdn.tripadvisor.com/media/photo-s/0f/54/78/c6/macaxeira-frita-com-carne.jpg',
        category: 'comida'
    }
];

// 4. BEBIDAS
const DRINKS = [
    { id: 'cafe', name: 'Café', price: 3.00, image: '☕' },
    { id: 'cafe_leite', name: 'Café com Leite', price: 3.50, image: '🥛' },
    { id: 'cha', name: 'Chá', price: 1.50, image: '🍵' },
    { id: 'choc_quente', name: 'Chocolate Quente', price: 5.00, image: '🍫' },
    { id: 'agua', name: 'Água Mineral', price: 3.00, image: '💧' },
    { id: 'agua_gas', name: 'Água com Gás', price: 4.00, image: '🫧' },
    { id: 'refri_lata', name: 'Refrigerante Lata', price: 7.00, image: '🥤' },
    { id: 'refri_litro', name: 'Refrigerante 1L', price: 10.00, image: '🍾' },
    { id: 'h2o', name: 'H2O', price: 8.00, image: '🍋' },
    { id: 'suco', name: 'Suco', price: 7.00, image: '🍊' },
];

// 5. SOBREMESAS
const DESSERTS = [
    { id: 'mousse', name: 'Mousse', price: 8.00, image: '🍧' },
    { id: 'queijo_mel', name: 'Queijo com Mel do Engenho', price: 12.00, image: '🧀' },
    { id: 'bolo', name: 'Fatia de Bolo', price: 7.00, image: '🍰' },
    { id: 'manjar', name: 'Manjar dos Deuses', price: 9.00, image: '🍮' },
    { id: 'pudim', name: 'Pudim', price: 8.00, image: '🍮' },
];

const DAYS = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
const CATEGORIES = ['todos', 'sopa', 'caldo', 'creme'];

// --- State ---
let state = {
    selectedDay: DAYS[new Date().getDay()],
    activeCategory: 'todos',
    cart: [],
    selectedItem: null, // Unified item selection
    userRatings: {}
};

// --- DOM Elements ---
const weekSelector = document.getElementById('week-selector');
const categorySelector = document.getElementById('category-selector');
const menuGrid = document.getElementById('menu-grid');
const dailyGrid = document.getElementById('daily-grid');
const drinksGrid = document.getElementById('drinks-grid');
const dessertsGrid = document.getElementById('desserts-grid');

const detailsModal = document.getElementById('details-modal');
const modalContent = document.getElementById('modal-content');
const checkoutModal = document.getElementById('checkout-modal');
const cartSidebar = document.getElementById('cart-sidebar');
const cartItemsContainer = document.getElementById('cart-items');
const cartFloatBtn = document.getElementById('cart-float-btn');
const cartCountBadge = document.getElementById('cart-count-badge');
const cartFooter = document.getElementById('cart-footer');
const cartTotalEl = document.getElementById('cart-total');
const checkoutForm = document.getElementById('checkout-form');

// --- Initialization ---
function init() {
    renderWeekSelector();
    renderCategorySelector();
    renderMenu();
    renderDailySpecials();
    renderDrinks();
    renderDesserts();
    updateCartUI();

    // Global Event Listeners
    document.getElementById('close-cart').addEventListener('click', () => toggleCart(false));
    cartFloatBtn.addEventListener('click', () => toggleCart(true));
    document.getElementById('finalize-order-btn').addEventListener('click', openCheckout);
    document.getElementById('close-checkout').addEventListener('click', closeCheckout);
    checkoutForm.addEventListener('submit', handleCheckoutSubmit);

    // Close modal on outside click
    detailsModal.addEventListener('click', (e) => {
        if (e.target === detailsModal) closeDetailsModal();
    });
}

// --- Render Functions ---

function renderWeekSelector() {
    weekSelector.innerHTML = WEEKLY_MENU.map(m => {
        const isSelected = state.selectedDay === m.day;
        const classes = isSelected
            ? 'bg-[#d2691e] text-white border-[#d2691e] shadow-lg shadow-orange-200'
            : 'bg-stone-50 text-stone-400 border-transparent hover:border-stone-300';

        return `
            <button 
                onclick="setDay('${m.day}')"
                class="px-4 py-2 md:px-6 md:py-3 rounded-full text-[10px] md:text-sm font-bold transition-all flex-shrink-0 snap-center border ${classes}"
            >
                ${m.day}
            </button>
        `;
    }).join('');
}

function renderCategorySelector() {
    categorySelector.innerHTML = CATEGORIES.map(cat => {
        const isSelected = state.activeCategory === cat;
        const classes = isSelected
            ? 'bg-[#6b3e26] text-white border-[#6b3e26]'
            : 'bg-stone-50 text-stone-400 border-transparent hover:bg-stone-100';

        return `
            <button 
                onclick="setCategory('${cat}')"
                class="px-4 py-1.5 md:px-5 md:py-2 rounded-lg md:rounded-xl text-[9px] md:text-xs font-bold uppercase tracking-widest transition-all border ${classes}"
            >
                ${cat}
            </button>
        `;
    }).join('');
}

function renderCard(item, type = 'soup') {
    // Generate star HTML if it's a rated item
    let stars = '';
    if (item.rating) {
        const rating = state.userRatings[item.id] || item.rating;
        stars = renderStars(rating);
    }

    return `
        <div 
            class="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden flex flex-row md:flex-col transition-all active:scale-[0.98] md:hover:shadow-xl md:hover:shadow-stone-200/50 md:hover:-translate-y-2 cursor-pointer group h-full"
            onclick="openDetails('${item.id}', '${type}')"
        >
            <!-- Image -->
            <div class="relative w-24 h-full sm:w-32 sm:h-32 md:w-full md:h-56 flex-shrink-0 order-2 md:order-1 overflow-hidden">
                <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                ${item.category ? `<div class="absolute top-2 right-2 bg-white/95 backdrop-blur px-1.5 py-0.5 rounded-md text-[7px] md:text-[10px] font-black text-orange-700 shadow-sm border border-orange-50">${item.category.toUpperCase()}</div>` : ''}
            </div>

            <!-- Info -->
            <div class="p-3 md:p-6 flex-grow flex flex-col justify-between order-1 md:order-2 min-w-0">
                <div>
                    <div class="flex justify-between items-start mb-0.5 md:mb-1">
                        <h3 class="text-sm md:text-xl font-bold text-[#6b3e26] leading-tight truncate pr-2">${item.name}</h3>
                        ${stars ? `<div class="flex text-yellow-400 text-[8px] md:text-sm flex-shrink-0">${stars}</div>` : ''}
                    </div>
                    ${item.description ? `
                    <p class="text-stone-600 font-medium text-[10px] md:text-sm line-clamp-2 leading-tight md:leading-relaxed mb-2 md:mb-6">
                        ${item.description}
                    </p>` : ''}
                </div>
                
                <div class="flex items-center justify-between mt-auto gap-2">
                    <div class="flex flex-col flex-shrink-0">
                        <span class="text-[10px] text-stone-400 uppercase font-bold tracking-tighter hidden md:block">Preço</span>
                        <span class="text-xs md:text-2xl font-black text-green-700">R$ ${item.price.toFixed(2).replace('.', ',')}</span>
                    </div>
                    
                    <button 
                        onclick="event.stopPropagation(); addToCart('${item.id}', '${type}')"
                        class="bg-[#fdf6e3] text-[#d2691e] border border-[#d2691e] px-3 py-1.5 md:px-6 md:py-3 rounded-lg md:rounded-xl font-bold text-[10px] md:text-sm hover:bg-[#d2691e] hover:text-white transition-all transform active:scale-95 shadow-sm"
                    >
                        Adicionar
                    </button>
                </div>
            </div>
        </div>
    `;
}

function renderSimpleCard(item, type) {
    return `
        <div class="bg-white p-3 rounded-xl border border-stone-100 shadow-sm hover:shadow-md transition-all flex items-center justify-between group active:scale-[0.98] cursor-pointer" onclick="addToCart('${item.id}', '${type}')">
            <div class="flex items-center gap-3">
                <span class="text-2xl md:text-3xl bg-stone-50 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-lg border border-stone-100">${item.image || '🍽️'}</span>
                <div>
                    <h4 class="font-bold text-[#6b3e26] text-xs md:text-sm">${item.name}</h4>
                    <span class="text-green-700 font-bold text-xs md:text-sm">R$ ${item.price.toFixed(2).replace('.', ',')}</span>
                </div>
            </div>
            <button class="w-8 h-8 rounded-full bg-orange-50 text-[#d2691e] hover:bg-[#d2691e] hover:text-white flex items-center justify-center transition-colors font-bold text-lg">+</button>
        </div>
    `;
}

function renderMenu() {
    const dayMenu = WEEKLY_MENU.find(m => m.day === state.selectedDay);
    const soups = dayMenu ? dayMenu.soups : [];

    const filteredSoups = state.activeCategory === 'todos'
        ? soups
        : soups.filter(s => s.category === state.activeCategory);

    menuGrid.innerHTML = filteredSoups.map(s => renderCard(s, 'soup')).join('');
}

function renderDailySpecials() {
    dailyGrid.innerHTML = DAILY_SPECIALS.map(s => renderCard(s, 'daily')).join('');
}

function renderDrinks() {
    drinksGrid.innerHTML = DRINKS.map(d => renderSimpleCard(d, 'drink')).join('');
}

function renderDesserts() {
    dessertsGrid.innerHTML = DESSERTS.map(d => renderSimpleCard(d, 'dessert')).join('');
}

function renderStars(rating, interactive = false, soupId = null) {
    let html = '';
    for (let i = 1; i <= 5; i++) {
        if (interactive) {
            const colorClass = i <= rating ? 'text-yellow-400' : 'text-stone-300';
            html += `<button onclick="rateSoup('${soupId}', ${i})" class="transition-transform active:scale-125 ${colorClass}">★</button>`;
        } else {
            html += `<span>${i <= rating ? '★' : '☆'}</span>`;
        }
    }
    return html;
}

// --- Actions ---

window.setDay = (day) => {
    state.selectedDay = day;
    state.activeCategory = 'todos';
    renderWeekSelector();
    renderCategorySelector();
    renderMenu();
};

window.setCategory = (cat) => {
    state.activeCategory = cat;
    renderCategorySelector();
    renderMenu();
};

// Item finder helper
const findItem = (id, type) => {
    if (type === 'soup') {
        // Need to search in all standard soups, not just today's, to be safe, or rebuild logic. 
        // Logic: Search in rawSoups and add price.
        return getSoup(id);
    }
    if (type === 'daily') return DAILY_SPECIALS.find(i => i.id === id);
    if (type === 'drink') return DRINKS.find(i => i.id === id);
    if (type === 'dessert') return DESSERTS.find(i => i.id === id);
    return null;
};

window.openDetails = (id, type) => {
    // Only open details for rich cards (soups and daily specials)
    const item = findItem(id, type);
    if (!item) return;

    state.selectedItem = item;
    const rating = item.rating ? (state.userRatings[item.id] || item.rating) : null;

    // Ingredients section (if exists)
    const ingredientsHtml = item.ingredients ? `
        <div>
            <h4 class="font-bold text-[#6b3e26] mb-2 md:mb-3 text-[10px] md:text-xs uppercase tracking-[0.2em] border-l-4 border-[#d2691e] pl-2 md:pl-3">Ingredientes:</h4>
            <div class="flex flex-wrap gap-1.5 md:gap-2">
                ${item.ingredients.map(ing => `<span class="bg-stone-50 px-2.5 py-1 md:px-3 md:py-1.5 rounded-lg text-[10px] md:text-xs text-stone-600 border border-stone-100">${ing}</span>`).join('')}
            </div>
        </div>
    ` : '';

    // Rating section (if exists)
    const ratingHtml = rating ? `
        <div class="bg-stone-50 p-3 md:p-4 rounded-xl md:rounded-2xl border border-stone-100">
            <h4 class="font-bold text-[#6b3e26] mb-2 text-[10px] md:text-xs uppercase tracking-[0.2em] text-center">O que achou?</h4>
            <div id="modal-rating-stars" class="flex justify-center gap-2 text-2xl md:text-3xl">
                ${renderStars(rating, true, item.id)}
            </div>
        </div>
    ` : '';

    modalContent.innerHTML = `
        <div class="relative h-48 md:h-80">
            <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover">
            <button onclick="closeDetailsModal()" class="absolute top-4 right-4 bg-black/40 text-white w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold hover:bg-black/60 transition-colors">✕</button>
        </div>
        <div class="p-5 md:p-8">
            <div class="flex justify-between items-start mb-3 md:mb-4">
                <div class="min-w-0">
                    <h2 class="text-xl md:text-3xl font-bold text-[#6b3e26] truncate">${item.name}</h2>
                    <div class="flex items-center gap-2 mt-1 md:mt-2">
                        ${item.category ? `<span class="inline-block bg-orange-50 text-[#d2691e] text-[8px] md:text-[10px] px-2 py-0.5 rounded-full font-bold uppercase border border-orange-100">${item.category}</span>` : ''}
                        ${rating ? `<div class="flex text-yellow-400 text-xs md:text-sm">${renderStars(rating)}</div>` : ''}
                    </div>
                </div>
                <p class="text-xl md:text-3xl font-black text-green-700 whitespace-nowrap ml-2">R$ ${item.price.toFixed(2)}</p>
            </div>
            
            <p class="text-stone-700 font-medium text-sm md:text-lg mb-4 md:mb-6 leading-relaxed">${item.description}</p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8">
                ${ingredientsHtml}
                ${ratingHtml}
            </div>
            
            <button onclick="addToCart('${item.id}', '${type}'); closeDetailsModal()" class="w-full bg-[#d2691e] hover:bg-[#a0522d] text-white font-bold py-4 md:py-5 rounded-xl md:rounded-2xl transition-all shadow-xl shadow-orange-100 flex items-center justify-center gap-3 text-base md:text-lg transform active:scale-[0.98]">
                🥣 Adicionar ao Pedido
            </button>
        </div>
    `;

    detailsModal.classList.remove('hidden');
};

window.closeDetailsModal = () => {
    detailsModal.classList.add('hidden');
    state.selectedItem = null;
};

window.rateSoup = (id, rating) => {
    state.userRatings[id] = rating;
    // Re-render modal stars if open
    if (state.selectedItem && state.selectedItem.id === id) {
        document.getElementById('modal-rating-stars').innerHTML = renderStars(rating, true, id);
    }
    renderMenu(); // Update main grid stars
    renderDailySpecials(); // Update daily grid stars
};

// --- Cart Logic ---

window.addToCart = (id, type) => {
    const item = findItem(id, type);
    if (!item) return;

    const existing = state.cart.find(i => i.id === id);
    if (existing) {
        existing.quantity++;
    } else {
        // Ensure image fallback for cart
        const cartImage = item.image.startsWith('http') ? item.image : 'https://cdn-icons-png.flaticon.com/512/2722/2722527.png';
        state.cart.push({ ...item, image: cartImage, quantity: 1 });
    }

    updateCartUI();

    // Animate button
    cartFloatBtn.classList.add('animate-bounce', 'scale-110', 'bg-green-500');
    setTimeout(() => cartFloatBtn.classList.remove('animate-bounce', 'scale-110', 'bg-green-500'), 800);
};

window.updateQuantity = (id, delta) => {
    const item = state.cart.find(i => i.id === id);
    if (!item) return;

    if (delta < 0 && item.quantity === 1) return; // Don't remove on minus, needs explicit remove

    item.quantity = Math.max(1, item.quantity + delta);
    updateCartUI();
};

window.removeFromCart = (id) => {
    state.cart = state.cart.filter(i => i.id !== id);
    updateCartUI();
};

function toggleCart(show) {
    if (show) {
        cartSidebar.classList.remove('translate-x-full');
    } else {
        cartSidebar.classList.add('translate-x-full');
    }
}

function updateCartUI() {
    const totalQty = state.cart.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = state.cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    cartCountBadge.innerText = totalQty;
    cartTotalEl.innerText = `R$ ${totalPrice.toFixed(2).replace('.', ',')}`;

    // Show/Hide float button
    if (totalQty > 0) {
        cartFloatBtn.classList.remove('hidden');
        cartFooter.classList.remove('hidden');
    } else {
        cartFloatBtn.classList.add('hidden');
        cartFooter.classList.add('hidden');
    }

    if (state.cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="flex flex-col items-center justify-center h-full text-stone-300">
                <span class="text-6xl md:text-8xl mb-4">🍲</span>
                <p class="text-lg md:text-xl font-bold text-center px-8">Ainda não escolheu seu caldo, coração?</p>
            </div>
        `;
    } else {
        cartItemsContainer.innerHTML = state.cart.map(item => `
            <div class="bg-white p-3 md:p-4 rounded-xl md:rounded-2xl shadow-sm border border-stone-100 flex gap-3 md:gap-5">
                <img src="${item.image}" class="w-16 h-16 md:w-20 md:h-20 rounded-lg md:rounded-xl object-cover">
                <div class="flex-grow min-w-0">
                    <h4 class="font-bold text-xs md:text-sm text-[#6b3e26] mb-0.5 truncate">${item.name}</h4>
                    <span class="text-green-700 font-bold text-xs">R$ ${item.price.toFixed(2)}</span>
                    <div class="flex justify-between items-center mt-2 md:mt-3">
                        <div class="flex items-center gap-3 md:gap-4 bg-stone-100 rounded-full px-3 py-1 md:px-4 md:py-1.5">
                            <button onclick="updateQuantity('${item.id}', -1)" class="text-[#d2691e] font-black text-sm md:text-lg">-</button>
                            <span class="text-xs md:text-sm font-black">${item.quantity}</span>
                            <button onclick="updateQuantity('${item.id}', 1)" class="text-[#d2691e] font-black text-sm md:text-lg">+</button>
                        </div>
                        <button onclick="removeFromCart('${item.id}')" class="text-[10px] text-red-400 font-bold">Remover</button>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// --- Checkout Logic ---

function openCheckout() {
    toggleCart(false);
    checkoutModal.classList.remove('hidden');
}

function closeCheckout() {
    checkoutModal.classList.add('hidden');
}

function handleCheckoutSubmit(e) {
    e.preventDefault();

    const name = document.getElementById('cust-name').value;
    const payment = document.getElementById('cust-payment').value;
    const time = document.getElementById('cust-time').value;
    const address = document.getElementById('cust-address').value;
    const neighborhood = document.getElementById('cust-neighborhood').value;
    const reference = document.getElementById('cust-reference').value;

    const itemsList = state.cart.map(item => `- ${item.quantity}x ${item.name} (R$ ${(item.price * item.quantity).toFixed(2)})`).join('\n');
    const total = state.cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    const message = `*🌵 PEDIDO - SOPA DE MAINHA 🌵*
----------------------------
*Cliente:* ${name}
*Endereço:* ${address}
*Bairro:* ${neighborhood}
*Referência:* ${reference || 'Não informada'}
*Pagamento:* ${payment}
*Entrega:* ${time}

*Itens do Pedido:*
${itemsList}

*Total:* R$ ${total.toFixed(2).replace('.', ',')}
----------------------------
_Pedido feito pelo aplicativo Sopa de Mainha_`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${STORE_PHONE}?text=${encodedMessage}`, '_blank');

    // Reset
    state.cart = [];
    updateCartUI();
    closeCheckout();
}

// Start
init();
